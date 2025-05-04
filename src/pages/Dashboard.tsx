import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Zap,
  CheckCircle,
  BookMarked,
  ArrowRight,
  Star,
  Rocket,
  Swords,
  Medal,
  Target
} from "lucide-react";
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { Navbar } from "@/components/layout/Navbar";

interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  lastAccessed: string;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
  icon: string;
}

interface Activity {
  id: string;
  type: 'course_progress' | 'achievement_earned' | 'lesson_completed' | 'battle_won';
  description: string;
  timestamp: string;
  courseId?: string;
  courseName?: string;
  achievementId?: string;
}

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalAchievements: 0,
    learningStreak: 0,
    totalTimeSpent: 0,
    battleRoyaleWins: 0,
    totalBattles: 0,
  });
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setUserStats({
            totalCourses: userData.totalCourses || 0,
            completedCourses: userData.completedCourses || 0,
            totalAchievements: userData.totalAchievements || 0,
            learningStreak: userData.learningStreak || 0,
            totalTimeSpent: userData.totalTimeSpent || 0,
            battleRoyaleWins: userData.battleRoyaleWins || 0,
            totalBattles: userData.totalBattles || 0,
          });

          const progressRef = collection(db, "courseProgress");
          const progressQuery = query(
            progressRef,
            where("userId", "==", currentUser.uid),
            orderBy("lastAccessed", "desc")
          );
          const progressSnapshot = await getDocs(progressQuery);
          const progressData = progressSnapshot.docs.map(doc => ({
            courseId: doc.id,
            ...doc.data()
          })) as CourseProgress[];
          setCourseProgress(progressData);

          const achievementsRef = collection(db, "userAchievements");
          const achievementsQuery = query(
            achievementsRef,
            where("userId", "==", currentUser.uid),
            orderBy("earnedDate", "desc")
          );
          const achievementsSnapshot = await getDocs(achievementsQuery);
          const achievementsData = achievementsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Achievement[];
          setAchievements(achievementsData);

          const activityRef = collection(db, "userActivity");
          const activityQuery = query(
            activityRef,
            where("userId", "==", currentUser.uid),
            orderBy("timestamp", "desc"),
            limit(10)
          );
          const activitySnapshot = await getDocs(activityQuery);
          const activityData = activitySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Activity[];
          setRecentActivity(activityData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'achievement_earned':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'course_progress':
        return <BookMarked className="h-4 w-4 text-blue-500" />;
      case 'lesson_completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'battle_won':
        return <Swords className="h-4 w-4 text-purple-500" />;
      default:
        return <Star className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-24">
          {/* Welcome Section */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary">
              <Rocket className="w-4 h-4 mr-2" />
              Learning Dashboard
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Welcome back, {currentUser.displayName || 'Learner'}!
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your progress and continue your learning journey
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
              <div>
                    <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-2xl font-bold">{userStats.totalCourses}</h3>
                      <p className="text-xs text-muted-foreground">({userStats.completedCourses} completed)</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
              <div>
                    <p className="text-sm text-muted-foreground">Learning Streak</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-2xl font-bold">{userStats.learningStreak}</h3>
                      <p className="text-xs text-muted-foreground">days</p>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
              <div>
                    <p className="text-sm text-muted-foreground">Battle Royale</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-2xl font-bold">{userStats.battleRoyaleWins}</h3>
                      <p className="text-xs text-muted-foreground">wins ({userStats.totalBattles} battles)</p>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <Swords className="h-6 w-6 text-purple-500" />
              </div>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
              <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-2xl font-bold">{userStats.totalAchievements}</h3>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <Medal className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Course Progress & Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Courses</CardTitle>
                      <CardDescription>Track your learning progress</CardDescription>
                    </div>
                      <Button variant="outline" size="sm" asChild>
                      <Link to="/courses" className="flex items-center gap-2">
                        View All
                        <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courseProgress.map((course) => (
                      <motion.div
                        key={course.courseId}
                        className="space-y-2"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between">
                          <Link 
                            to={`/courses/${course.courseId}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {course.courseName}
                          </Link>
                          {course.completed ? (
                            <Badge className="bg-green-500">Completed</Badge>
                          ) : (
                            <Badge variant="outline">{course.progress}%</Badge>
                          )}
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                        </p>
                      </motion.div>
                    ))}

                    {courseProgress.length === 0 && (
                      <div className="text-center py-6">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">No courses started yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Begin your learning journey by enrolling in a course
                </p>
                <Button asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
            </div>
                    )}
                    </div>
                  </CardContent>
                </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <motion.div
                        key={activity.id}
                        className="flex items-start gap-4"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`p-2 rounded-full ${
                          activity.type === 'achievement_earned' ? 'bg-yellow-500/10' :
                          activity.type === 'course_progress' ? 'bg-blue-500/10' :
                          activity.type === 'battle_won' ? 'bg-purple-500/10' :
                          'bg-green-500/10'
                        }`}>
                          {getActivityIcon(activity.type)}
                      </div>
                        <div>
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString()}
                          </p>
                      </div>
                      </motion.div>
                    ))}

                    {recentActivity.length === 0 && (
                      <div className="text-center py-6">
                        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">No recent activity</h3>
                        <p className="text-sm text-muted-foreground">
                          Your learning activities will appear here
                        </p>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
