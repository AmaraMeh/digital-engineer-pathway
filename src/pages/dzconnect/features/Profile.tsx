import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { collection, doc, getDoc, getDocs, query, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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
  Trees,
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
  CloudAlert,
  CloudOff
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
  savedPosts: string[];
  notifications: any[];
  achievements: any[];
  interests: string[];
  skills: string[];
  education: any[];
  experience: any[];
  stats: {
    totalPosts: number;
    totalFollowers: number;
    totalFollowing: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
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

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "users", userId!);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error("User not found");
      }

      const userData = userDoc.data() as User;
      setUser(userData);
      setIsFollowing(userData.followers.includes(currentUser?.uid));

      // Fetch user's posts
      const postsRef = collection(db, "posts");
      const postsQuery = query(postsRef, where("author", "==", userId));
      const postsSnapshot = await getDocs(postsQuery);
      const postsData = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        likes: doc.data().likes || [],
        comments: doc.data().comments || [],
        shares: doc.data().shares || 0,
        tags: doc.data().tags || [],
        media: doc.data().media || null,
        poll: doc.data().poll || null
      })) as Post[];

      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch user data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to follow users",
      });
      return;
    }

    try {
      const userRef = doc(db, "users", userId!);
      const currentUserRef = doc(db, "users", currentUser.uid);

      if (isFollowing) {
        await updateDoc(userRef, {
          followers: arrayRemove(currentUser.uid),
        });
        await updateDoc(currentUserRef, {
          following: arrayRemove(userId),
        });
        setIsFollowing(false);
        toast({
          title: "Success",
          description: "Unfollowed user",
        });
      } else {
        await updateDoc(userRef, {
          followers: arrayUnion(currentUser.uid),
        });
        await updateDoc(currentUserRef, {
          following: arrayUnion(userId),
        });
        setIsFollowing(true);
        toast({
          title: "Success",
          description: "Followed user",
        });
      }

      fetchUserData();
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to follow/unfollow user",
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

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-start gap-8">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.photoURL} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">{user.name}</h1>
                <p className="text-xl text-muted-foreground mt-2">{user.bio}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleFollow}>
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.totalPosts}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.totalFollowers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.totalFollowing}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.engagementRate}%</p>
                <p className="text-sm text-muted-foreground">Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-medium">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.experience.map((exp, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.position}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
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

            <TabsContent value="saved">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No saved posts yet</p>
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.achievements.map((achievement, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Earned on {achievement.date}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="space-y-4">
                {[1, 2, 3].map((activity) => (
                  <Card key={activity}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Activity className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Posted a new update</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Followers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.followers.slice(0, 5).map((followerId) => (
                  <div key={followerId} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="" alt="Follower" />
                        <AvatarFallback>F</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Follower Name</p>
                        <p className="text-sm text-muted-foreground">@username</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Following</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.following.slice(0, 5).map((followingId) => (
                  <div key={followingId} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="" alt="Following" />
                        <AvatarFallback>F</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Following Name</p>
                        <p className="text-sm text-muted-foreground">@username</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Following
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 