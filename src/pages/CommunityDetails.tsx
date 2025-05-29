import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Code, 
  Book, 
  Trophy, 
  Star, 
  Heart, 
  Share2, 
  Bell, 
  Settings, 
  Plus, 
  ArrowRight,
  Clock,
  Award,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  FileText,
  Video,
  Image,
  Link,
  Hash,
  Tag,
  Pin,
  Flag,
  Shield,
  Crown,
  Zap,
  Target,
  TrendingUp,
  BarChart2,
  Activity,
  Brain,
  Lightbulb,
  Rocket,
  Coffee,
  Smile,
  Award as AwardIcon,
  Medal,
  Gift,
  Sparkles,
  Sun,
  Moon,
  Cloud,
  Wind,
  Droplet,
  Flame,
  Leaf,
  Tree,
  Mountain,
  Waves,
  Snowflake,
  Umbrella,
  CloudRain,
  CloudSun,
  CloudMoon,
  CloudLightning,
  CloudSnow,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  CloudSleet,
  CloudWind,
  CloudRainbow,
  CloudOff,
  CloudSunRain,
  CloudMoonRain,
  CloudSunLightning,
  CloudMoonLightning,
  CloudSunSnow,
  CloudMoonSnow,
  CloudSunFog,
  CloudMoonFog,
  CloudSunDrizzle,
  CloudMoonDrizzle,
  CloudSunHail,
  CloudMoonHail,
  CloudSunSleet,
  CloudMoonSleet,
  CloudSunWind,
  CloudMoonWind,
  CloudSunRainbow,
  CloudMoonRainbow,
  CloudSunOff,
  CloudMoonOff
} from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  members: string[];
  moderators: string[];
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
  tags: string[];
  rules: string[];
  announcements: string[];
  featuredPosts: string[];
  events: any[];
  resources: any[];
  stats: {
    totalPosts: number;
    totalComments: number;
    totalLikes: number;
    totalShares: number;
    totalEvents: number;
    totalResources: number;
    activeMembers: number;
    newMembers: number;
    engagementRate: number;
  };
}

interface Post {
  id: string;
  content: string;
  author: string;
  authorName: string;
  authorPhoto: string;
  createdAt: Date;
  likes: string[];
  comments: any[];
  shares: number;
  tags: string[];
  type: 'text' | 'image' | 'video' | 'link' | 'poll' | 'question';
  media?: string;
  poll?: {
    question: string;
    options: string[];
    votes: number[];
  };
}

const CommunityDetails = () => {
  const { communityId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({
    content: "",
    type: "text" as const,
    media: "",
    poll: {
      question: "",
      options: ["", ""],
    },
  });
  const [activeTab, setActiveTab] = useState("posts");
  const [isMember, setIsMember] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    fetchCommunity();
  }, [communityId]);

  const fetchCommunity = async () => {
    try {
      const communityRef = doc(db, "communities", communityId);
      const communityDoc = await getDoc(communityRef);
      
      if (!communityDoc.exists()) {
        throw new Error("Community not found");
      }

      const communityData = communityDoc.data();
      const isMember = Array.isArray(communityData.members) && communityData.members.includes(currentUser?.uid);
      
      setCommunity({
        id: communityDoc.id,
        ...communityData,
        createdAt: communityData.createdAt?.toDate(),
        members: communityData.members || [],
        moderators: communityData.moderators || [],
        tags: communityData.tags || [],
        rules: communityData.rules || [],
        announcements: communityData.announcements || [],
        featuredPosts: communityData.featuredPosts || [],
        events: communityData.events || [],
        resources: communityData.resources || [],
        stats: {
          totalPosts: communityData.stats?.totalPosts || 0,
          totalComments: communityData.stats?.totalComments || 0,
          totalLikes: communityData.stats?.totalLikes || 0,
          totalShares: communityData.stats?.totalShares || 0,
          totalEvents: communityData.stats?.totalEvents || 0,
          totalResources: communityData.stats?.totalResources || 0,
          activeMembers: communityData.stats?.activeMembers || 0,
          newMembers: communityData.stats?.newMembers || 0,
          engagementRate: communityData.stats?.engagementRate || 0,
        }
      } as Community);
      setIsMember(isMember);
    } catch (error) {
      console.error("Error fetching community:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch community",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (communityId: string) => {
    try {
      const postsRef = collection(db, "communities", communityId, "posts");
      const q = query(postsRef, where("isActive", "==", true));
      const querySnapshot = await getDocs(q);
      
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Post[];
      
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleJoinCommunity = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const communityRef = doc(db, "communities", communityId!);
      await updateDoc(communityRef, {
        members: arrayUnion(currentUser.uid),
      });

      toast({
        title: "Success",
        description: "You have joined the community!",
      });

      setIsMember(true);
      fetchCommunity();
    } catch (error) {
      console.error("Error joining community:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to join community",
      });
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      const communityRef = doc(db, "communities", communityId!);
      await updateDoc(communityRef, {
        members: arrayRemove(currentUser?.uid),
      });

      toast({
        title: "Success",
        description: "You have left the community",
      });

      setIsMember(false);
      fetchCommunity();
    } catch (error) {
      console.error("Error leaving community:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to leave community",
      });
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Post content cannot be empty",
      });
      return;
    }

    try {
      const postsRef = collection(db, "communities", communityId!, "posts");
      await addDoc(postsRef, {
        content: newPost.content,
        author: currentUser?.uid,
        authorName: currentUser?.displayName,
        authorPhoto: currentUser?.photoURL,
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

      fetchPosts(communityId!);
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!community) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Community Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <Badge className="mb-2 px-4 py-1.5 text-sm bg-primary/10 text-primary">
              <Users className="w-4 h-4 mr-2" />
              Community
            </Badge>
            <h1 className="text-4xl font-bold">{community.name}</h1>
            <p className="text-xl text-muted-foreground mt-2">{community.description}</p>
          </div>
          <div className="flex gap-2">
            {isMember ? (
              <Button variant="outline" onClick={handleLeaveCommunity}>
                Leave Community
              </Button>
            ) : (
              <Button onClick={handleJoinCommunity}>
                Join Community
              </Button>
            )}
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <h3 className="text-2xl font-bold">{community.members.length}</h3>
                </div>
                <Users className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Posts</p>
                  <h3 className="text-2xl font-bold">{community.stats.totalPosts}</h3>
                </div>
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Events</p>
                  <h3 className="text-2xl font-bold">{community.stats.totalEvents}</h3>
                </div>
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <h3 className="text-2xl font-bold">{community.stats.engagementRate}%</h3>
                </div>
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{community.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {community.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rules</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {community.rules.map((rule, index) => (
                      <li key={index} className="text-sm">{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moderators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {community.moderators.map((moderatorId) => (
                  <div key={moderatorId} className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="" alt="Moderator" />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Moderator</p>
                      <p className="text-sm text-muted-foreground">@username</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {/* Create Post */}
              {isMember && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Textarea
                        placeholder="What's on your mind?"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Image className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Link className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Hash className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button onClick={handleCreatePost}>Post</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Posts List */}
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={post.authorPhoto} alt={post.authorName} />
                        <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.authorName}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {post.likes.length}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {post.comments.length}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {community.events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees.length} attending</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {community.resources.map((resource) => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{resource.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="h-4 w-4" />
                          <span>{resource.category}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="members">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {community.members.map((memberId) => (
                  <Card key={memberId}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="" alt="Member" />
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Member Name</p>
                          <p className="text-sm text-muted-foreground">@username</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails; 