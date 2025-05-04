import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { format } from "date-fns";
import {
  MessageSquare,
  Send,
  UserPlus,
  Check,
  X,
  Search,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  Smile,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  UserCheck,
  Clock,
  Bell
} from "lucide-react";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
}

interface ChatUser {
  uid: string;
  displayName: string;
  photoURL: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  online?: boolean;
  typing?: boolean;
}

interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  timestamp: Date;
}

const Inbox = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"chats" | "requests">("chats");
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Fetch friend requests
    const fetchFriendRequests = async () => {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      const userData = userDoc.data();
      const requests = userData?.friendRequests || [];
      
      const requestsData: FriendRequest[] = [];
      for (const senderId of requests) {
        const senderDoc = await getDoc(doc(db, "users", senderId));
        const senderData = senderDoc.data();
        if (senderData) {
          requestsData.push({
            id: senderId,
            senderId,
            senderName: senderData.displayName || "Anonymous User",
            senderPhoto: senderData.photoURL || "",
            timestamp: senderData.requestTimestamp?.toDate() || new Date()
          });
        }
      }
      setFriendRequests(requestsData);
    };

    // Fetch chat users with last messages
    const fetchChatUsers = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.data();
        const friends = userData?.friends || [];

        const users: ChatUser[] = [];
        for (const friendId of friends) {
          const friendDoc = await getDoc(doc(db, "users", friendId));
          const friendData = friendDoc.data();
          // Get last message (if any)
          let lastMessage = "";
          let lastMessageTime = undefined;
          let unreadCount = 0;
          if (friendData) {
            const messagesRef = collection(db, "messages");
            const q = query(
              messagesRef,
              where("participants", "array-contains", friendId),
              orderBy("timestamp", "desc"),
              limit(1)
            );
            const messageSnap = await getDocs(q);
            messageSnap.forEach((doc) => {
              const messageData = doc.data();
              // Only consider messages between currentUser and friend
              if (
                (messageData.senderId === currentUser.uid && messageData.receiverId === friendId) ||
                (messageData.senderId === friendId && messageData.receiverId === currentUser.uid)
              ) {
                lastMessage = messageData.content;
                lastMessageTime = messageData.timestamp.toDate();
                if (!messageData.read && messageData.senderId === friendId) {
                  unreadCount++;
                }
              }
            });
            users.push({
              uid: friendId,
              displayName: friendData.displayName || "Anonymous User",
              photoURL: friendData.photoURL || "",
              lastMessage,
              lastMessageTime,
              unreadCount,
              online: friendData.online || false,
              typing: false
            });
          }
        }
        // Sort by last message time, but show all friends
        users.sort((a, b) => {
          if (!a.lastMessageTime && !b.lastMessageTime) return 0;
          if (!a.lastMessageTime) return 1;
          if (!b.lastMessageTime) return -1;
          return (b.lastMessageTime?.getTime() || 0) - (a.lastMessageTime?.getTime() || 0);
        });
        setChatUsers(users);
        if (userId) {
          const userDoc = await getDoc(doc(db, "users", userId));
          const userData = userDoc.data();
          if (userData) {
            setSelectedUser({
              uid: userId,
              displayName: userData.displayName || "Anonymous User",
              photoURL: userData.photoURL || "",
              online: userData.online || false
            });
          }
        }
      } catch (error) {
        console.error("Error fetching chat users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
    fetchChatUsers();
  }, [currentUser, navigate, userId]);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    // Subscribe to messages
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("participants", "array-contains", currentUser.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (
          (data.senderId === currentUser.uid && data.receiverId === selectedUser.uid) ||
          (data.senderId === selectedUser.uid && data.receiverId === currentUser.uid)
        ) {
          newMessages.push({
            id: doc.id,
            senderId: data.senderId,
            receiverId: data.receiverId,
            content: data.content,
            timestamp: data.timestamp.toDate(),
            read: data.read,
            type: data.type || 'text',
            fileUrl: data.fileUrl
          });
        }
      });
      setMessages(newMessages);
      scrollToBottom();

      // Mark messages as read
      newMessages.forEach(async (message) => {
        if (!message.read && message.senderId === selectedUser.uid) {
          await updateDoc(doc(messagesRef, message.id), { read: true });
        }
      });
    });

    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!currentUser || !selectedUser || !newMessage.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        content: newMessage,
        timestamp: serverTimestamp(),
        read: false,
        type: 'text',
        participants: [currentUser.uid, selectedUser.uid]
      });
      setNewMessage("");
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleFriendRequest = async (requestId: string, accept: boolean) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const senderRef = doc(db, "users", requestId);

      // Remove request
      await updateDoc(userRef, {
        friendRequests: arrayRemove(requestId)
      });

      if (accept) {
        // Add to friends lists
        await updateDoc(userRef, {
          friends: arrayUnion(requestId)
        });
        await updateDoc(senderRef, {
          friends: arrayUnion(currentUser.uid)
        });

        // Refresh chat users
        const senderDoc = await getDoc(senderRef);
        const senderData = senderDoc.data();
        if (senderData) {
          setChatUsers(prev => [...prev, {
            uid: requestId,
            displayName: senderData.displayName || "Anonymous User",
            photoURL: senderData.photoURL || "",
            online: senderData.online || false
          }]);
        }
      }

      // Remove from local state
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error("Error handling friend request:", error);
    }
  };

  const filteredUsers = chatUsers.filter(user =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-background/90">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <PageNavigation />

        <div className="grid gap-6 md:grid-cols-[350px_1fr]">
          {/* Users List */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chats" | "requests")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chats" className="relative">
                    Chats
                    {chatUsers.some(user => user.unreadCount && user.unreadCount > 0) && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                        {chatUsers.reduce((acc, user) => acc + (user.unreadCount || 0), 0)}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="relative">
                    Requests
                    {friendRequests.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                        {friendRequests.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={activeTab === "chats" ? "Search messages..." : "Search requests..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <AnimatePresence mode="wait">
                  {activeTab === "chats" ? (
                    <motion.div
                      key="chats"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-2"
                    >
                      {filteredUsers.map((user) => (
                        <motion.div
                          key={user.uid}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                            selectedUser?.uid === user.uid
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-muted/50"
                          )}
                          onClick={() => {
                            setSelectedUser(user);
                            navigate(`/inbox/${user.uid}`);
                          }}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={user.photoURL} />
                              <AvatarFallback>
                                {user.displayName[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {user.online && (
                              <Badge
                                className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{user.displayName}</p>
                              {user.lastMessageTime && (
                                <p className="text-xs text-muted-foreground">
                                  {format(user.lastMessageTime, 'p')}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {user.typing ? (
                                <p className="text-sm text-primary animate-pulse">
                                  Typing...
                                </p>
                              ) : (
                                <p className="text-sm text-muted-foreground truncate">
                                  {user.lastMessage || "No messages yet"}
                                </p>
                              )}
                              {user.unreadCount > 0 && (
                                <Badge className="h-5 w-5 flex items-center justify-center p-0">
                                  {user.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="requests"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-2"
                    >
                      {friendRequests.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <UserPlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No friend requests</p>
                        </div>
                      ) : (
                        friendRequests.map((request) => (
                          <motion.div
                            key={request.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                          >
                            <Avatar>
                              <AvatarImage src={request.senderPhoto} />
                              <AvatarFallback>
                                {request.senderName[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{request.senderName}</p>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                  {format(request.timestamp, 'PP')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-green-500"
                                onClick={() => handleFriendRequest(request.id, true)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleFriendRequest(request.id, false)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            {selectedUser ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => {
                          setSelectedUser(null);
                          navigate("/inbox");
                        }}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedUser.photoURL} />
                          <AvatarFallback>
                            {selectedUser.displayName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {selectedUser.online && (
                          <Badge
                            className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500"
                          />
                        )}
                      </div>
                      <div>
                        <CardTitle>{selectedUser.displayName}</CardTitle>
                        <CardDescription>
                          {selectedUser.typing ? (
                            <span className="text-primary animate-pulse">Typing...</span>
                          ) : selectedUser.online ? (
                            "Online"
                          ) : (
                            "Offline"
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                          <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Block User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "flex",
                            message.senderId === currentUser?.uid ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] rounded-lg p-3",
                              message.senderId === currentUser?.uid
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            {message.type === 'text' ? (
                              <p>{message.content}</p>
                            ) : message.type === 'image' ? (
                              <img
                                src={message.fileUrl}
                                alt="Shared image"
                                className="rounded-lg max-w-full"
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                <Paperclip className="h-4 w-4" />
                                <a
                                  href={message.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline"
                                >
                                  View File
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs opacity-70">
                                {format(message.timestamp, 'p')}
                              </p>
                              {message.senderId === currentUser?.uid && (
                                <Check className={cn(
                                  "h-3 w-3",
                                  message.read ? "text-blue-500" : "opacity-70"
                                )} />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          handleTyping();
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-center p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="font-medium text-lg">No chat selected</h3>
                  <p className="text-muted-foreground">
                    Choose a friend from the list to start chatting
                  </p>
                </motion.div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Inbox; 