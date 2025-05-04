import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { format } from "date-fns";
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
  Calendar,
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Award,
  Activity,
  Code,
  CheckCircle2,
  Timer,
  Brain,
  Loader2,
  UserPlus,
  MessageSquare,
  Check,
  X,
  Bell,
  ChevronRight,
  AlertCircle
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
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from "@/lib/firebase";

interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  location: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  points: number;
  rank: string;
  streak: number;
  completedCourses: number;
  achievements: number;
  battlesWon: number;
  battlesPlayed: number;
  experienceLevel: string;
  primaryLanguage: string;
  languages: string[];
  joinedDate: Date;
  lastActive: Date;
  totalStudyTime: number;
  averageDailyStudy: number;
  bestStudyStreak: number;
  currentStudyStreak: number;
  completedTasks: number;
  totalTasks: number;
  friends: string[];
  friendRequests: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  date: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ActivityLog {
  id: string;
  type: 'course' | 'battle' | 'achievement' | 'task';
  title: string;
  description: string;
  timestamp: Date;
  points: number;
  icon: any;
}

interface Notification {
  id: string;
  type: 'friend_request' | 'message' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionData?: {
    senderId: string;
    senderName: string;
    senderPhoto: string;
  };
}

const RANKS = {
  'BRONZE': { minPoints: 0, color: 'bg-amber-600/10 text-amber-600', icon: Medal },
  'SILVER': { minPoints: 1000, color: 'bg-gray-400/10 text-gray-400', icon: Shield },
  'GOLD': { minPoints: 2500, color: 'bg-yellow-500/10 text-yellow-500', icon: Star },
  'PLATINUM': { minPoints: 5000, color: 'bg-blue-500/10 text-blue-500', icon: Crown },
  'DIAMOND': { minPoints: 10000, color: 'bg-purple-500/10 text-purple-500', icon: Trophy },
  'MASTER': { minPoints: 20000, color: 'bg-red-500/10 text-red-500', icon: Flame }
};

const RARITY_COLORS = {
  common: 'bg-slate-500/10 text-slate-500',
  rare: 'bg-blue-500/10 text-blue-500',
  epic: 'bg-purple-500/10 text-purple-500',
  legendary: 'bg-amber-500/10 text-amber-500'
};

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'friend'>('none');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const targetUserId = userId || currentUser?.uid;
        
        if (!targetUserId) {
          navigate("/login");
          return;
        }

        // Fetch user profile
        const userDoc = await getDoc(doc(db, "users", targetUserId));
        if (!userDoc.exists()) {
          navigate("/404");
          return;
        }

        const userData = userDoc.data();
        setProfile({
          uid: userDoc.id,
          displayName: userData.displayName || "Anonymous User",
          photoURL: userData.photoURL || "",
          email: userData.email || "",
          location: userData.location || "Earth",
          bio: userData.bio || "No bio provided",
          githubUrl: userData.githubUrl || "",
          linkedinUrl: userData.linkedinUrl || "",
          points: userData.totalScore || 0,
          rank: userData.rank || "BRONZE",
          streak: userData.learningStreak || 0,
          completedCourses: userData.completedCourses || 0,
          achievements: userData.totalAchievements || 0,
          battlesWon: userData.battlesWon || 0,
          battlesPlayed: userData.battlesPlayed || 0,
          experienceLevel: userData.experienceLevel || "beginner",
          primaryLanguage: userData.primaryLanguage || "",
          languages: userData.languages || [],
          joinedDate: userData.joinedDate?.toDate() || new Date(),
          lastActive: userData.lastActive?.toDate() || new Date(),
          totalStudyTime: userData.totalStudyTime || 0,
          averageDailyStudy: userData.averageDailyStudy || 0,
          bestStudyStreak: userData.bestStudyStreak || 0,
          currentStudyStreak: userData.currentStudyStreak || 0,
          completedTasks: userData.completedTasks || 0,
          totalTasks: userData.totalTasks || 0,
          friends: userData.friends || [],
          friendRequests: userData.friendRequests || []
        });

        // Fetch achievements
        const achievementsRef = collection(db, "achievements");
        const achievementsQuery = query(
          achievementsRef,
          where("userId", "==", targetUserId),
          orderBy("date", "desc")
        );
        const achievementsSnapshot = await getDocs(achievementsQuery);
        const achievementsData: Achievement[] = [];
        achievementsSnapshot.forEach(doc => {
          const data = doc.data();
          achievementsData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            icon: data.icon,
            date: data.date.toDate(),
            rarity: data.rarity
          });
        });
        setAchievements(achievementsData);

        // Fetch activity log
        const activityRef = collection(db, "activity");
        const activityQuery = query(
          activityRef,
          where("userId", "==", targetUserId),
          orderBy("timestamp", "desc"),
          limit(50)
        );
        const activitySnapshot = await getDocs(activityQuery);
        const activityData: ActivityLog[] = [];
        activitySnapshot.forEach(doc => {
          const data = doc.data();
          activityData.push({
            id: doc.id,
            type: data.type,
            title: data.title,
            description: data.description,
            timestamp: data.timestamp.toDate(),
            points: data.points,
            icon: data.icon
          });
        });
        setActivityLog(activityData);

        // Check friend status
        if (currentUser && targetUserId !== currentUser.uid) {
          const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid));
          const currentUserData = currentUserDoc.data();
          
          if (currentUserData?.friends?.includes(targetUserId)) {
            setFriendStatus('friend');
          } else if (userData.friendRequests?.includes(currentUser.uid)) {
            setFriendStatus('pending');
          } else {
            setFriendStatus('none');
          }
        }

      } catch (error) {
        console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

    fetchProfileData();
  }, [userId, currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;

    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", currentUser.uid),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications: Notification[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        newNotifications.push({
          id: doc.id,
          type: data.type,
          title: data.title,
          description: data.description,
          timestamp: data.timestamp.toDate(),
          read: data.read,
          actionData: data.actionData
        });
      });
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.read).length);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

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

  const getProgressToNextRank = () => {
    const ranks = Object.keys(RANKS);
    const currentIndex = ranks.indexOf(profile.rank);
    if (currentIndex < ranks.length - 1) {
      const nextRank = ranks[currentIndex + 1];
      const nextRankPoints = RANKS[nextRank as keyof typeof RANKS].minPoints;
      return {
        nextRank,
        progress: (profile.points / nextRankPoints) * 100,
        required: nextRankPoints
      };
    }
    return null;
  };

  const progressToNext = getProgressToNextRank();

  const handleFriendAction = async () => {
    if (!currentUser || !profile) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const targetUserRef = doc(db, "users", profile.uid);

      if (friendStatus === 'none') {
        // Send friend request
        await updateDoc(targetUserRef, {
          friendRequests: arrayUnion(currentUser.uid)
        });
        setFriendStatus('pending');
      } else if (friendStatus === 'pending') {
        // Cancel friend request
        await updateDoc(targetUserRef, {
          friendRequests: arrayRemove(currentUser.uid)
        });
        setFriendStatus('none');
      } else if (friendStatus === 'friend') {
        // Remove friend
        await updateDoc(userRef, {
          friends: arrayRemove(profile.uid)
        });
        await updateDoc(targetUserRef, {
          friends: arrayRemove(currentUser.uid)
        });
        setFriendStatus('none');
      }
    } catch (error) {
      console.error("Error handling friend action:", error);
    }
  };

  const handleFriendRequest = async (accept: boolean) => {
    if (!currentUser || !profile) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const targetUserRef = doc(db, "users", profile.uid);

      // Remove the friend request
      await updateDoc(userRef, {
        friendRequests: arrayRemove(profile.uid)
      });

      if (accept) {
        // Add each user to the other's friends list
        await updateDoc(userRef, {
          friends: arrayUnion(profile.uid)
        });
        await updateDoc(targetUserRef, {
          friends: arrayUnion(currentUser.uid)
        });
        setFriendStatus('friend');
      }
    } catch (error) {
      console.error("Error handling friend request:", error);
    }
  };

  const handleNotificationAction = async (notification: Notification) => {
    if (!currentUser) return;

    try {
      // Mark notification as read
      await updateDoc(doc(db, "notifications", notification.id), {
        read: true
      });

      if (notification.type === 'friend_request' && notification.actionData) {
        // Navigate to sender's profile
        navigate(`/profile/${notification.actionData.senderId}`);
      } else if (notification.type === 'message' && notification.actionData) {
        // Navigate to chat with sender
        navigate(`/inbox/${notification.actionData.senderId}`);
      }
    } catch (error) {
      console.error("Error handling notification:", error);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
              </div>
              
      <div className="container mx-auto px-4 py-8">
        <PageNavigation />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
          {currentUser && profile?.uid === currentUser.uid && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/inbox')}>
                <MessageSquare className="h-5 w-5 mr-2" />
                Messages
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                    <div className="space-y-4">
                      {notifications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-lg transition-colors cursor-pointer ${
                              notification.read ? 'bg-muted/50' : 'bg-primary/5'
                            } hover:bg-muted`}
                            onClick={() => handleNotificationAction(notification)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${
                                notification.type === 'friend_request' ? 'bg-blue-500/10 text-blue-500' :
                                notification.type === 'message' ? 'bg-green-500/10 text-green-500' :
                                'bg-orange-500/10 text-orange-500'
                              }`}>
                                {notification.type === 'friend_request' ? <UserPlus className="h-4 w-4" /> :
                                 notification.type === 'message' ? <MessageSquare className="h-4 w-4" /> :
                                 <AlertCircle className="h-4 w-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{notification.title}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {notification.description}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {format(notification.timestamp, 'PP')}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                              )}
                              <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
                            </div>
                            {notification.actionData && (
                              <div className="mt-2 flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={notification.actionData.senderPhoto} />
                                  <AvatarFallback>
                                    {notification.actionData.senderName[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  {notification.actionData.senderName}
                                </span>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1 bg-card/50 backdrop-blur-sm border-primary/10">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={profile.photoURL} />
                <AvatarFallback>{(profile.displayName || "A")[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle>{profile.displayName}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                {profile.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <RankBadge rank={profile.rank} />
                </div>

                <div className="text-sm text-muted-foreground text-center">{profile.bio}</div>

                <Separator />

                <div className="space-y-2">
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                  )}
                  {profile.githubUrl && (
                    <a 
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                </div>
                        
                        <Separator />
                        
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      Joined {format(profile.joinedDate, 'MMMM yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      Last active {format(profile.lastActive, 'PP')}
                    </span>
                          </div>
                        </div>
                        
                <div className="flex items-center justify-center gap-2">
                  {currentUser && profile.uid !== currentUser.uid && (
                    <>
                      {friendStatus === 'none' && (
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={handleFriendAction}
                        >
                          <UserPlus className="h-4 w-4" />
                          Add Friend
                        </Button>
                      )}
                      {friendStatus === 'pending' && (
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={handleFriendAction}
                        >
                          <Clock className="h-4 w-4" />
                          Request Sent
                        </Button>
                      )}
                      {friendStatus === 'friend' && (
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={handleFriendAction}
                        >
                          <Check className="h-4 w-4" />
                          Friends
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => navigate(`/inbox/${profile.uid}`)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                    </>
                  )}
                  {currentUser && profile.uid === currentUser.uid && profile.friendRequests?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {profile.friendRequests.length} friend request(s)
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/inbox')}
                      >
                        View
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Overview */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-yellow-500/10 rounded-full">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Total Points</div>
                        <div className="text-2xl font-bold">{profile.points}</div>
                      </div>
                    </div>
                    {progressToNext && (
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Progress to {progressToNext.nextRank}
                        </div>
                        <Progress value={progressToNext.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground text-right">
                          {profile.points} / {progressToNext.required}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500/10 rounded-full">
                        <Zap className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Current Streak</div>
                        <div className="text-2xl font-bold">{profile.currentStudyStreak} days</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Best streak: {profile.bestStudyStreak} days
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-500/10 rounded-full">
                        <Target className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Task Completion</div>
                        <div className="text-2xl font-bold">
                          {((profile.completedTasks / profile.totalTasks) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={(profile.completedTasks / profile.totalTasks) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
                  </CardContent>
                </Card>

            {/* Tabs Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>Completed Courses</span>
                          </div>
                          <span className="font-bold">{profile.completedCourses}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Swords className="h-4 w-4" />
                            <span>Battle Win Rate</span>
                          </div>
                          <span className="font-bold">
                            {((profile.battlesWon / profile.battlesPlayed) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <span>Achievements</span>
                          </div>
                          <span className="font-bold">{profile.achievements}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4" />
                            <span>Total Study Time</span>
                        </div>
                          <span className="font-bold">
                            {Math.floor(profile.totalStudyTime / 60)}h {profile.totalStudyTime % 60}m
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            <span>Daily Average</span>
                      </div>
                          <span className="font-bold">
                            {profile.averageDailyStudy.toFixed(1)}h
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            <span>Experience Level</span>
                          </div>
                          <span className="font-bold capitalize">{profile.experienceLevel}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Programming Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language, index) => (
                        <Badge key={index} variant="secondary">
                          <Code className="h-4 w-4 mr-1" />
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements Showcase</CardTitle>
                    <CardDescription>
                      Unlocked {achievements.length} achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        {achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className={`p-4 rounded-lg ${RARITY_COLORS[achievement.rarity]}`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 rounded-full bg-background">
                                <Trophy className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{achievement.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.description}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Unlocked {format(achievement.date, 'PP')}
                                </p>
                              </div>
                              <Badge>{achievement.rarity}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {activityLog.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className={`p-2 rounded-full ${
                              activity.type === 'course' ? 'bg-blue-500/10 text-blue-500' :
                              activity.type === 'battle' ? 'bg-red-500/10 text-red-500' :
                              activity.type === 'achievement' ? 'bg-yellow-500/10 text-yellow-500' :
                              'bg-green-500/10 text-green-500'
                            }`}>
                              {activity.type === 'course' ? <BookOpen className="h-4 w-4" /> :
                               activity.type === 'battle' ? <Swords className="h-4 w-4" /> :
                               activity.type === 'achievement' ? <Trophy className="h-4 w-4" /> :
                               <CheckCircle2 className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{activity.title}</h4>
                                <Badge variant="outline">+{activity.points} pts</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {activity.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(activity.timestamp, 'PPpp')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profile.languages.map((language, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              <span>{language}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              Advanced
                            </span>
                          </div>
                          <Progress value={75} className="h-2" />
                      </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
