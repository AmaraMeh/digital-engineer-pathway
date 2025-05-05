import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
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

const Community = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const communitiesRef = collection(db, "communities");
      const q = query(communitiesRef, where("isActive", "==", true), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const communitiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        members: doc.data().members || [],
        moderators: doc.data().moderators || [],
        tags: doc.data().tags || [],
        rules: doc.data().rules || [],
        announcements: doc.data().announcements || [],
        featuredPosts: doc.data().featuredPosts || [],
        events: doc.data().events || [],
        resources: doc.data().resources || [],
        stats: {
          totalPosts: doc.data().stats?.totalPosts || 0,
          totalComments: doc.data().stats?.totalComments || 0,
          totalLikes: doc.data().stats?.totalLikes || 0,
          totalShares: doc.data().stats?.totalShares || 0,
          totalEvents: doc.data().stats?.totalEvents || 0,
          totalResources: doc.data().stats?.totalResources || 0,
          activeMembers: doc.data().stats?.activeMembers || 0,
          newMembers: doc.data().stats?.newMembers || 0,
          engagementRate: doc.data().stats?.engagementRate || 0,
        }
      })) as Community[];
      
      setCommunities(communitiesData);
    } catch (error) {
      console.error("Error fetching communities:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch communities",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <Badge className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary">
          <Users className="w-4 h-4 mr-2" />
          Community
        </Badge>
        <h1 className="text-4xl font-bold mb-4">Join Our Developer Community</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Connect with fellow developers, share knowledge, and grow together
        </p>
        <div className="max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </motion.div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full cursor-pointer" onClick={() => navigate(`/community/${community.id}`)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{community.name}</CardTitle>
                  <Badge variant="outline">
                    {community.members.length} members
                  </Badge>
                </div>
                <CardDescription>{community.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Created {community.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>{community.stats.engagementRate}% engagement</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-muted-foreground mb-8">
          Become part of our growing developer community
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/admin")}>
            <Shield className="w-4 h-4 mr-2" />
            Access Admin Panel
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Join Community
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Community; 