
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Award, Edit, Settings, ExternalLink, Book, BookOpen, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function UserProfileCard() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [certificates, setCertificates] = useState<string[]>([]);
  const [lastActivity, setLastActivity] = useState<string | null>(null);
  const [learningTime, setLearningTime] = useState("0h 0m");
  const [userStatus, setUserStatus] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  // Calculate user initials from display name
  const userInitials = currentUser?.displayName
    ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  // Calculate join date from user metadata if available
  const joinDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    : "May 2023"; // Fallback

  // Fetch user progress and statistics from local storage or database
  useEffect(() => {
    if (currentUser?.uid) {
      // In a real app, you would fetch this data from Firebase or another database
      // For now, we'll simulate it with data from local storage
      
      // Get progress from local storage
      const savedProgress = localStorage.getItem(`course-progress-html-basics-${currentUser.uid}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
      
      // Get certificates from local storage
      const savedCertificates = localStorage.getItem(`certificates-${currentUser.uid}`);
      if (savedCertificates) {
        const parsedCertificates = JSON.parse(savedCertificates);
        setCertificates(parsedCertificates);
        setCompletedCourses(parsedCertificates.length);
      }
      
      // Total available courses (in a real app, this would come from your course database)
      setTotalCourses(10);
      
      // Calculate user status based on completed courses and certificates
      if (completedCourses >= 5) {
        setUserStatus("advanced");
      } else if (completedCourses >= 2) {
        setUserStatus("intermediate");
      } else {
        setUserStatus("beginner");
      }
      
      // Get last activity time
      setLastActivity(currentUser.metadata?.lastSignInTime || null);
      
      // Calculate learning time (in a real app, this would be tracked in the database)
      // Here we'll estimate based on completed courses
      const estimatedHours = completedCourses * 2;
      setLearningTime(`${estimatedHours}h 0m`);
    }
  }, [currentUser, completedCourses]);

  // Stats displayed in the profile card
  const stats = [
    { 
      label: "Joined", 
      value: joinDate, 
      icon: Calendar 
    },
    { 
      label: "Learning Time", 
      value: learningTime,
      icon: Clock 
    },
    { 
      label: "Certificates", 
      value: `${certificates.length} earned`, 
      icon: Award 
    },
  ];

  return (
    <Card className="w-full hover:shadow-lg transition-all border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
                <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">{userInitials}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <CardTitle className="text-2xl">{currentUser?.displayName || "User"}</CardTitle>
              <CardDescription>{currentUser?.email || ""}</CardDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="animate-fade-in transition-all hover:bg-primary/20">
                  {userStatus === "beginner" ? "Beginner" : 
                   userStatus === "intermediate" ? "Intermediate" : "Advanced"}
                </Badge>
                {certificates.includes('html-basics') && (
                  <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-400 animate-fade-in">
                    <Trophy className="h-3 w-3 mr-1 text-amber-500" /> HTML Certified
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Link>
            </Button>
            <Button size="sm" className="group" asChild>
              <Link to="/profile">
                <Edit className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Learning Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {completedCourses > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-primary" /> Course Completion
              </span>
              <span className="text-sm">{completedCourses}/{totalCourses} courses</span>
            </div>
            <Progress value={(completedCourses / totalCourses) * 100} className="h-2" />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all"
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-primary/10 rounded-full p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-medium">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {certificates.length > 0 && (
          <motion.div
            className="mt-6 p-4 border rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">Earned Certificates</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificates.map(cert => (
                <Badge key={cert} variant="outline" className="border-amber-500/30 text-amber-600 px-3 py-1">
                  {cert === 'html-basics' ? 'HTML Basics' : cert}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <p className="text-sm text-muted-foreground">
          {lastActivity 
            ? `Last login: ${new Date(lastActivity).toLocaleString()}`
            : "Last activity: 2 hours ago"}
        </p>
        <Button variant="ghost" size="sm" className="group" asChild>
          <Link to="/activity">
            View full activity
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
