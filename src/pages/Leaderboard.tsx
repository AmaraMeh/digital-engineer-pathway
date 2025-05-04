import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Crown, 
  Medal,
  Star,
  Flame,
  Shield,
  Zap,
  Swords,
  BookOpen,
  Target,
  ArrowRight,
  Loader2
} from "lucide-react";
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { PageNavigation } from "@/components/layout/PageNavigation";

interface UserRanking {
  uid: string;
  displayName: string;
  photoURL: string;
  points: number;
  rank: string;
  streak: number;
  completedCourses: number;
  achievements: number;
  battlesWon: number;
  battlesPlayed: number;
  experienceLevel: string;
  primaryLanguage: string;
  lastActive: Date;
}

const RANKS = {
  'BRONZE': { minPoints: 0, color: 'bg-amber-600/10 text-amber-600', icon: Medal },
  'SILVER': { minPoints: 1000, color: 'bg-gray-400/10 text-gray-400', icon: Shield },
  'GOLD': { minPoints: 2500, color: 'bg-yellow-500/10 text-yellow-500', icon: Star },
  'PLATINUM': { minPoints: 5000, color: 'bg-blue-500/10 text-blue-500', icon: Crown },
  'DIAMOND': { minPoints: 10000, color: 'bg-purple-500/10 text-purple-500', icon: Trophy },
  'MASTER': { minPoints: 20000, color: 'bg-red-500/10 text-red-500', icon: Flame }
};

const getRank = (points: number): string => {
  let currentRank = 'BRONZE';
  for (const [rank, { minPoints }] of Object.entries(RANKS)) {
    if (points >= minPoints) {
      currentRank = rank;
    } else {
      break;
    }
  }
  return currentRank;
};

const getNextRank = (currentRank: string): { rank: string; pointsNeeded: number } => {
  const ranks = Object.keys(RANKS);
  const currentIndex = ranks.indexOf(currentRank);
  if (currentIndex < ranks.length - 1) {
    const nextRank = ranks[currentIndex + 1];
    return {
      rank: nextRank,
      pointsNeeded: RANKS[nextRank as keyof typeof RANKS].minPoints
    };
  }
  return { rank: currentRank, pointsNeeded: 0 };
};

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [topUsers, setTopUsers] = useState<UserRanking[]>([]);
  const [userRanking, setUserRanking] = useState<UserRanking | null>(null);
  const [activeTab, setActiveTab] = useState("overall");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        const usersRef = collection(db, "leaderboard");
        const q = query(usersRef, orderBy("totalScore", "desc"), limit(100));
        const querySnapshot = await getDocs(q);
        
        const rankings: UserRanking[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          rankings.push({
            uid: doc.id,
            displayName: data.displayName || "Anonymous User",
            photoURL: data.photoURL || "",
            points: data.totalScore || 0,
            rank: getRank(data.totalScore || 0),
            streak: data.learningStreak || 0,
            completedCourses: data.completedCourses || 0,
            achievements: data.totalAchievements || 0,
            battlesWon: data.battlesWon || 0,
            battlesPlayed: data.battlesPlayed || 0,
            experienceLevel: data.experienceLevel || "beginner",
            primaryLanguage: data.primaryLanguage || "",
            lastActive: data.lastActive?.toDate() || new Date()
          });
        });

        setTopUsers(rankings);
        const currentUserRanking = rankings.find(r => r.uid === currentUser.uid);
        if (currentUserRanking) {
          setUserRanking(currentUserRanking);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const RankBadge = ({ rank }: { rank: string }) => {
    const rankConfig = RANKS[rank as keyof typeof RANKS];
    const Icon = rankConfig.icon;
    return (
      <Badge className={rankConfig.color}>
        <Icon className="h-4 w-4 mr-1" />
        {rank}
      </Badge>
    );
  };

  const filteredUsers = activeTab === "overall" 
    ? topUsers 
    : topUsers.filter(user => user.experienceLevel === activeTab);

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <PageNavigation />

        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary">
            <Trophy className="w-4 h-4 mr-2" />
            Global Rankings
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-xl text-muted-foreground">
            See how you stack up against other learners
          </p>
        </motion.div>

        {userRanking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Ranking</CardTitle>
                    <CardDescription>Your current position and stats</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleUserClick(userRanking.uid)}
                    className="flex items-center gap-2"
                  >
                    View Profile
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={userRanking.photoURL} />
                      <AvatarFallback>{userRanking.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{userRanking.displayName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <RankBadge rank={userRanking.rank} />
                        <span className="text-gray-600">{userRanking.points} points</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="p-3 bg-yellow-500/10 rounded-full inline-block mb-2">
                        <Zap className="h-6 w-6 text-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-600">Streak</p>
                      <p className="text-lg font-bold">{userRanking.streak} days</p>
                    </div>
                    <div className="text-center">
                      <div className="p-3 bg-blue-500/10 rounded-full inline-block mb-2">
                        <BookOpen className="h-6 w-6 text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-600">Courses</p>
                      <p className="text-lg font-bold">{userRanking.completedCourses}</p>
                    </div>
                    <div className="text-center">
                      <div className="p-3 bg-purple-500/10 rounded-full inline-block mb-2">
                        <Swords className="h-6 w-6 text-purple-500" />
                      </div>
                      <p className="text-sm text-gray-600">Battles</p>
                      <p className="text-lg font-bold">{userRanking.battlesWon}/{userRanking.battlesPlayed}</p>
                    </div>
                  </div>
                </div>

                {userRanking.rank !== 'MASTER' && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress to {getNextRank(userRanking.rank).rank}</span>
                      <span className="text-sm font-medium">
                        {userRanking.points}/{getNextRank(userRanking.rank).pointsNeeded}
                      </span>
                    </div>
                    <Progress 
                      value={(userRanking.points / getNextRank(userRanking.rank).pointsNeeded) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Learners</CardTitle>
                  <CardDescription>See who's leading the pack</CardDescription>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overall">Overall</TabsTrigger>
                    <TabsTrigger value="beginner">Beginner</TabsTrigger>
                    <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  filteredUsers.map((user, index) => (
                    <div 
                      key={user.uid} 
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all cursor-pointer ${
                        user.uid === currentUser.uid 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleUserClick(user.uid)}
                    >
                      <div className="w-8 text-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.photoURL || ""} />
                        <AvatarFallback>{(user.displayName || "A")[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{user.displayName}</h3>
                        <div className="flex items-center space-x-2">
                          <RankBadge rank={user.rank} />
                          <span className="text-sm text-gray-600">{user.points} points</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Streak</p>
                          <p className="font-bold">{user.streak}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Courses</p>
                          <p className="font-bold">{user.completedCourses}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Battles</p>
                          <p className="font-bold">{user.battlesWon}/{user.battlesPlayed}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-4">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard; 