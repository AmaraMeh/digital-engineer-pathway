import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  serverTimestamp,
  limit,
  startAfter
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Users, MessageSquare, Calendar, Code, Book, Trophy, Star, 
  Heart, Share2, Bell, Settings, Plus, ArrowRight, Clock, 
  Award, Bookmark, ThumbsUp, MessageCircle, FileText, Video, 
  Image, Link2, Hash, Tag, Pin, Flag, Shield, Crown, Zap, 
  TrendingUp, BarChart2, Activity, Brain, Lightbulb, 
  Rocket, Coffee, Smile, Medal, Gift, Sparkles,
  Award as AwardIcon,
  Cloud,
  CloudRain,
  CloudSun,
  CloudMoon,
  CloudLightning,
  CloudSnow,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  CloudAlert,
  CloudOff,
  MoreHorizontal,
  Search,
  Twitter,
  Linkedin,
  Facebook,
  ExternalLink
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  content: string;
  author: string;
  authorName: string;
  authorPhoto: string;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
  shares: number;
  tags: string[];
  type: 'text' | 'image' | 'video' | 'link' | 'poll' | 'question';
  media?: string;
  poll?: {
    question: string;
    options: string[];
    votes: { [key: string]: string }; // userId: optionIndex
  };
  isActive: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  authorName: string;
  authorPhoto: string;
  createdAt: Date;
  likes: string[];
  replies: Comment[];
}

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
  savedPosts: string[];
  notifications: Notification[];
  achievements: Achievement[];
  interests: string[];
  skills: string[];
  education: Education[];
  experience: Experience[];
  stats: UserStats;
  lastActive: Date;
  isOnline: boolean;
  unreadMessages: number;
  unreadNotifications: number;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'achievement';
  from: string;
  fromName: string;
  fromPhoto: string;
  to: string;
  content: string;
  postId?: string;
  createdAt: Date;
  read: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  skills: string[];
}

interface UserStats {
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  engagementRate: number;
  streak: number;
  lastStreak: Date;
}

const ITEMS_PER_PAGE = 10;

const DzConnect = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<{
    content: string;
    type: Post['type'];
    media: string;
    poll: {
      question: string;
      options: string[];
    };
  }>({
    content: "",
    type: "text",
    media: "",
    poll: {
      question: "",
      options: ["", ""],
    },
  });
  const [activeTab, setActiveTab] = useState("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingTags, setTrendingTags] = useState<{tag: string, count: number}[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeComment, setActiveComment] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Subscribe to real-time updates
    const unsubscribePosts = subscribeToRealtimePosts();
    const unsubscribeUsers = subscribeToRealtimeUsers();
    const unsubscribeTrending = fetchTrendingTags();
    const unsubscribeEvents = fetchUpcomingEvents();
    const unsubscribeUserData = subscribeToUserData();

    return () => {
      unsubscribePosts();
      unsubscribeUsers();
      unsubscribeTrending();
      unsubscribeEvents();
      unsubscribeUserData();
    };
  }, [currentUser]);

  const subscribeToRealtimePosts = () => {
    const postsRef = collection(db, "posts");
    const postsQuery = query(
      postsRef,
      where("isActive", "==", true),
      orderBy("createdAt", "desc"),
      limit(ITEMS_PER_PAGE)
    );

    return onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        authorName: doc.data().authorName || "Anonymous",
        authorPhoto: doc.data().authorPhoto || "",
        likes: doc.data().likes || [],
        comments: doc.data().comments || [],
        shares: doc.data().shares || 0,
        tags: doc.data().tags || [],
      })) as Post[];

      setPosts(postsData);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
      setLoading(false);
    });
  };

  const subscribeToRealtimeUsers = () => {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("isActive", "==", true));

    return onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().name || "Anonymous",
        photoURL: doc.data().photoURL || "",
        bio: doc.data().bio || "",
        lastActive: doc.data().lastActive?.toDate() || new Date(),
        isOnline: doc.data().isOnline || false,
        followers: doc.data().followers || [],
        following: doc.data().following || [],
        stats: {
          totalPosts: doc.data().stats?.totalPosts || 0,
          totalFollowers: doc.data().stats?.totalFollowers || 0,
          totalFollowing: doc.data().stats?.totalFollowing || 0,
          totalLikes: doc.data().stats?.totalLikes || 0,
          totalComments: doc.data().stats?.totalComments || 0,
          totalShares: doc.data().stats?.totalShares || 0,
          engagementRate: doc.data().stats?.engagementRate || 0,
          streak: doc.data().stats?.streak || 0,
          lastStreak: doc.data().stats?.lastStreak?.toDate() || new Date()
        }
      })) as UserData[];

      setUsers(usersData);
    });
  };

  const fetchTrendingTags = () => {
    const postsRef = collection(db, "posts");
    const postsQuery = query(
      postsRef,
      where("isActive", "==", true),
      where("createdAt", ">=", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    );

    return onSnapshot(postsQuery, (snapshot) => {
      const tagCounts: { [key: string]: number } = {};
      snapshot.docs.forEach(doc => {
        const tags = doc.data().tags || [];
        tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      const sortedTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setTrendingTags(sortedTags);
    });
  };

  const fetchUpcomingEvents = () => {
    const eventsRef = collection(db, "events");
    const now = new Date();
    const eventsQuery = query(
      eventsRef,
      where("date", ">=", now),
      where("isActive", "==", true),
      orderBy("date", "asc"),
      limit(5)
    );

    return onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date()
      }));

      setUpcomingEvents(eventsData);
    });
  };

  const subscribeToUserData = () => {
    if (!currentUser) return () => {};

    const userRef = doc(db, "users", currentUser.uid);
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserData({
          id: doc.id,
          name: data.name || currentUser.displayName || "Anonymous",
          email: data.email || currentUser.email || "",
          photoURL: data.photoURL || currentUser.photoURL || "",
          bio: data.bio || "",
          followers: data.followers || [],
          following: data.following || [],
          posts: data.posts || [],
          savedPosts: data.savedPosts || [],
          notifications: data.notifications || [],
          achievements: data.achievements || [],
          interests: data.interests || [],
          skills: data.skills || [],
          education: data.education || [],
          experience: data.experience || [],
          stats: {
            totalPosts: data.stats?.totalPosts || 0,
            totalFollowers: data.stats?.totalFollowers || 0,
            totalFollowing: data.stats?.totalFollowing || 0,
            totalLikes: data.stats?.totalLikes || 0,
            totalComments: data.stats?.totalComments || 0,
            totalShares: data.stats?.totalShares || 0,
            engagementRate: data.stats?.engagementRate || 0,
            streak: data.stats?.streak || 0,
            lastStreak: data.stats?.lastStreak?.toDate() || new Date()
          },
          lastActive: data.lastActive?.toDate() || new Date(),
          isOnline: data.isOnline || false,
          unreadMessages: data.unreadMessages || 0,
          unreadNotifications: data.unreadNotifications || 0
        });
      }
    });
  };

  const loadMorePosts = async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      const postsRef = collection(db, "posts");
      const postsQuery = query(
        postsRef,
        where("isActive", "==", true),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(ITEMS_PER_PAGE)
      );

      const snapshot = await getDocs(postsQuery);
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Post[];

      setPosts(prev => [...prev, ...newPosts]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error loading more posts:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load more posts"
      });
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) return;

    try {
      const postRef = doc(db, "posts", postId);
      const post = posts.find(p => p.id === postId);
      
      if (post?.likes.includes(currentUser.uid)) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser.uid)
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser.uid)
        });

        // Create notification for post author
        if (post?.author !== currentUser.uid) {
          const notificationRef = collection(db, "notifications");
          await addDoc(notificationRef, {
            type: "like",
            from: currentUser.uid,
            fromName: currentUser.displayName,
            fromPhoto: currentUser.photoURL,
            to: post?.author,
            content: "liked your post",
            postId: postId,
            createdAt: serverTimestamp(),
            read: false
          });
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update like"
      });
    }
  };

  const handleComment = async (postId: string, content: string) => {
    if (!currentUser || !content.trim()) return;

    try {
      const postRef = doc(db, "posts", postId);
      const newComment = {
        id: Date.now().toString(),
        content: content.trim(),
        author: currentUser.uid,
        authorName: currentUser.displayName || "Anonymous",
        authorPhoto: currentUser.photoURL || "",
        createdAt: new Date(),
        likes: [],
        replies: []
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });

      // Create notification for post author
      const post = posts.find(p => p.id === postId);
      if (post?.author !== currentUser.uid) {
        const notificationRef = collection(db, "notifications");
        await addDoc(notificationRef, {
          type: "comment",
          from: currentUser.uid,
          fromName: currentUser.displayName,
          fromPhoto: currentUser.photoURL,
          to: post?.author,
          content: "commented on your post",
          postId: postId,
          createdAt: serverTimestamp(),
          read: false
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment"
      });
    }
  };

  const handleShare = async (post: Post) => {
    setSelectedPost(post);
    setShowShareModal(true);
  };

  const handleFollow = async (userId: string) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", userId);
      const currentUserRef = doc(db, "users", currentUser.uid);
      const user = users.find(u => u.id === userId);

      if (user?.followers.includes(currentUser.uid)) {
        await updateDoc(userRef, {
          followers: arrayRemove(currentUser.uid)
        });
        await updateDoc(currentUserRef, {
          following: arrayRemove(userId)
        });
      } else {
        await updateDoc(userRef, {
          followers: arrayUnion(currentUser.uid)
        });
        await updateDoc(currentUserRef, {
          following: arrayUnion(userId)
        });

        // Create notification
        const notificationRef = collection(db, "notifications");
        await addDoc(notificationRef, {
          type: "follow",
          from: currentUser.uid,
          fromName: currentUser.displayName,
          fromPhoto: currentUser.photoURL,
          to: userId,
          content: "started following you",
          createdAt: serverTimestamp(),
          read: false
        });
      }
    } catch (error) {
      console.error("Error updating follow:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update follow"
      });
    }
  };

  const handleCreatePost = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to create posts",
      });
      return;
    }

    if (!newPost.content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Post content cannot be empty",
      });
      return;
    }

    try {
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        content: newPost.content,
        author: currentUser.uid,
        authorName: userData?.name || currentUser.displayName || "Anonymous",
        authorPhoto: userData?.photoURL || currentUser.photoURL || "",
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
        shares: 0,
        tags: [],
        type: newPost.type,
        media: newPost.media,
        poll: newPost.type === "poll" ? newPost.poll : null,
        isActive: true,
      });

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      setNewPost({
        content: "",
        type: "text",
        media: "",
        poll: {
          question: "",
          options: ["", ""],
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post",
      });
    }
  };

  const handlePostMenu = (post: Post) => {
    // Implement post menu handling
  };

  const handleSave = (postId: string) => {
    if (savedPosts.includes(postId)) {
      // Remove from saved posts
      setSavedPosts(prev => prev.filter(id => id !== postId));
    } else {
      // Add to saved posts
      setSavedPosts(prev => [...prev, postId]);
    }
  };

  const handleVote = (postId: string, optionIndex: number) => {
    // Implement vote handling
  };

  const handleCommentLike = (postId: string, commentId: string) => {
    // Implement comment like handling
  };

  const handleReplyingTo = (commentId: string) => {
    // Implement replying to a comment
  };

  const handleMediaUpload = (type: 'image' | 'video') => {
    // Implement media upload handling
  };

  const handleShowPollModal = () => {
    // Implement show poll modal handling
  };

  const handleShowTagsModal = () => {
    // Implement show tags modal handling
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading amazing content...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <Badge className="mb-2 px-4 py-1.5 text-sm bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary">
                <Rocket className="w-4 h-4 mr-2" />
                DZCONNECT
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Student Social Network
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Connect, Share, and Grow Together
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:flex-none"
                onClick={() => navigate('/inbox')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
                {userData?.unreadMessages > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {userData.unreadMessages}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex-1 md:flex-none"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                {userData?.unreadNotifications > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {userData.unreadNotifications}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* User Profile Card */}
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-20 bg-gradient-to-r from-primary to-purple-500" />
              </CardHeader>
              <CardContent className="pt-0 -mt-10">
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 ring-4 ring-background">
                    <AvatarImage src={userData?.photoURL} alt={userData?.name} />
                    <AvatarFallback>{userData?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold text-lg">{userData?.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData?.email}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="text-center">
                      <p className="font-semibold">{userData?.stats?.totalPosts || 0}</p>
                      <p className="text-xs text-muted-foreground">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{userData?.stats?.totalFollowers || 0}</p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{userData?.stats?.totalFollowing || 0}</p>
                      <p className="text-xs text-muted-foreground">Following</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => navigate(`/profile/${userData?.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Trending Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {trendingTags.map((tag, index) => (
                      <motion.div
                        key={tag.tag}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                        onClick={() => setSearchQuery(tag.tag)}
                      >
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-primary" />
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {tag.tag}
                          </span>
                        </div>
                        <Badge variant="secondary">{tag.count} posts</Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="text-sm font-semibold text-primary">
                              {format(event.date, "MMM")}
                            </div>
                            <div className="text-2xl font-bold">
                              {format(event.date, "d")}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium group-hover:text-primary transition-colors">
                              {event.title}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{format(event.date, "h:mm a")}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Create Post */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={userData?.photoURL || ""} alt={userData?.name} />
                    <AvatarFallback>{userData?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleMediaUpload('image')}>
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleMediaUpload('video')}>
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => setShowPollModal(true)}>
                          <BarChart2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => setShowTagsModal(true)}>
                          <Hash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPost.content.trim()}
                        className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.authorPhoto} alt={post.authorName} />
                            <AvatarFallback>{post.authorName?.[0] || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium hover:text-primary cursor-pointer" onClick={() => navigate(`/profile/${post.author}`)}>
                              {post.authorName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handlePostMenu(post)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Post Content */}
                      <p className="whitespace-pre-wrap">{post.content}</p>

                      {/* Media */}
                      {post.media && (
                        <div className="rounded-lg overflow-hidden">
                          {post.type === 'image' ? (
                            <img
                              src={post.media}
                              alt="Post media"
                              className="w-full max-h-[500px] object-cover"
                              loading="lazy"
                            />
                          ) : post.type === 'video' && (
                            <video
                              src={post.media}
                              controls
                              className="w-full max-h-[500px]"
                            />
                          )}
                        </div>
                      )}

                      {/* Poll */}
                      {post.type === 'poll' && post.poll && (
                        <div className="space-y-4">
                          <p className="font-medium">{post.poll.question}</p>
                          <div className="space-y-2">
                            {post.poll.options.map((option, index) => {
                              const votes = Object.values(post.poll?.votes || {}).filter(v => v === index.toString()).length;
                              const totalVotes = Object.keys(post.poll?.votes || {}).length;
                              const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                              const hasVoted = post.poll?.votes[currentUser?.uid || ""] !== undefined;
                              const userVoted = post.poll?.votes[currentUser?.uid || ""] === index.toString();

                              return (
                                <div key={index} className="relative">
                                  <Button
                                    variant={userVoted ? "default" : "outline"}
                                    className="w-full justify-start"
                                    onClick={() => handleVote(post.id, index)}
                                    disabled={hasVoted && !userVoted}
                                  >
                                    <div className="absolute inset-0">
                                      <div
                                        className="h-full bg-primary/10 rounded-lg transition-all"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                    <span className="relative z-10 flex justify-between w-full">
                                      <span>{option}</span>
                                      <span>{percentage.toFixed(1)}%</span>
                                    </span>
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {Object.keys(post.poll.votes).length} votes
                          </p>
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-primary/20"
                              onClick={() => setSearchQuery(tag)}
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.likes.includes(currentUser?.uid || "") ? "text-primary" : ""}
                          >
                            <Heart className={`h-4 w-4 mr-2 ${post.likes.includes(currentUser?.uid || "") ? "fill-current" : ""}`} />
                            {post.likes.length}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveComment(activeComment === post.id ? null : post.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {post.comments.length}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleShare(post)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            {post.shares}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSave(post.id)}
                          className={savedPosts.includes(post.id) ? "text-primary" : ""}
                        >
                          <Bookmark className={`h-4 w-4 ${savedPosts.includes(post.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>

                      {/* Comments */}
                      <AnimatePresence>
                        {activeComment === post.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 pt-4 border-t"
                          >
                            {post.comments.map((comment, index) => (
                              <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.authorPhoto} alt={comment.authorName} />
                                  <AvatarFallback>{comment.authorName?.[0] || "U"}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-muted p-3 rounded-lg">
                                    <p className="font-medium text-sm">{comment.authorName}</p>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                  <div className="flex items-center gap-4 mt-1">
                                    <button
                                      className="text-xs text-muted-foreground hover:text-primary"
                                      onClick={() => handleCommentLike(post.id, comment.id)}
                                    >
                                      {comment.likes.includes(currentUser?.uid || "") ? "Unlike" : "Like"}
                                    </button>
                                    <button
                                      className="text-xs text-muted-foreground hover:text-primary"
                                      onClick={() => setReplyingTo(comment.id)}
                                    >
                                      Reply
                                    </button>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            <div className="flex gap-2">
                              <Textarea
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="flex-1 min-h-[60px] resize-none"
                              />
                              <Button
                                onClick={() => handleComment(post.id, commentText)}
                                disabled={!commentText.trim()}
                              >
                                Post
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Load More */}
            {hasMore && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={loadMorePosts}
                  disabled={loadingMore}
                  className="w-full"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts, people, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Suggested Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {users
                      .filter(u => u.id !== currentUser?.uid && !u.followers.includes(currentUser?.uid || ""))
                      .slice(0, 5)
                      .map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.photoURL} alt={user.name} />
                              <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium group-hover:text-primary transition-colors cursor-pointer"
                                 onClick={() => navigate(`/profile/${user.id}`)}>
                                {user.name}
                              </p>
                              <p className="text-sm text-muted-foreground">{user.bio}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFollow(user.id)}
                          >
                            Follow
                          </Button>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Online Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Online Now
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {users
                      .filter(u => u.id !== currentUser?.uid && u.isOnline)
                      .slice(0, 5)
                      .map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={user.photoURL} alt={user.name} />
                                <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                              </Avatar>
                              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                            </div>
                            <p className="font-medium cursor-pointer hover:text-primary transition-colors"
                               onClick={() => navigate(`/profile/${user.id}`)}>
                              {user.name}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/inbox/${user.id}`)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-semibold">Share Post</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/post/${selectedPost.id}`);
                      toast({
                        title: "Success",
                        description: "Link copied to clipboard"
                      });
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.content)}&url=${encodeURIComponent(`${window.location.origin}/post/${selectedPost.id}`)}`, '_blank')}
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/post/${selectedPost.id}`)}`, '_blank')}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/post/${selectedPost.id}`)}`, '_blank')}
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowShareModal(false);
                    setSelectedPost(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DzConnect; 