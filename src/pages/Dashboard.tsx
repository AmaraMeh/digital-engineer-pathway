
import { useAuth } from "@/context/AuthContext";
import { UserProfileCard } from "@/components/UserProfileCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, ArrowRight, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useAuth();

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "HTML & CSS Foundations",
      progress: 100,
      category: "Frontend",
      lessons: 12,
      duration: "2h 30m",
      completed: true,
    },
    {
      id: 2,
      title: "JavaScript Basics",
      progress: 75,
      category: "Frontend",
      lessons: 24,
      duration: "5h 15m",
      completed: false,
    },
    {
      id: 3,
      title: "React for Beginners",
      progress: 30,
      category: "Frontend",
      lessons: 18,
      duration: "4h 45m",
      completed: false,
    },
    {
      id: 4,
      title: "Git & GitHub",
      progress: 0,
      category: "Tools",
      lessons: 8,
      duration: "1h 45m",
      completed: false,
    },
  ];

  // Mock roadmap data
  const roadmaps = [
    {
      id: "frontend",
      title: "Frontend Developer",
      progress: 45,
      topics: 28,
      estimate: "6-8 months",
    },
    {
      id: "backend",
      title: "Backend Developer",
      progress: 10,
      topics: 32,
      estimate: "8-10 months",
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      progress: 5,
      topics: 48,
      estimate: "12-16 months",
    },
  ];

  // Mock achievements data
  const achievements = [
    {
      title: "First Lesson Completed",
      description: "Completed your first lesson",
      date: "June 2, 2023",
    },
    {
      title: "5-Day Streak",
      description: "Studied for 5 days in a row",
      date: "June 10, 2023",
    },
    {
      title: "HTML Master",
      description: "Completed the HTML & CSS Foundations course",
      date: "June 15, 2023",
    }
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">You need to be logged in to view this page</h1>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid gap-8">
        <UserProfileCard />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Learning Progress</CardTitle>
                <CardDescription>Your progress across all courses</CardDescription>
              </div>
              <Clock className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">48 hours</div>
              <p className="text-muted-foreground mt-1 text-sm">Total learning time</p>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall completion</span>
                  <span className="text-sm font-medium">38%</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Courses</CardTitle>
                <CardDescription>Your enrolled courses</CardDescription>
              </div>
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-muted-foreground mt-1 text-sm">Courses enrolled</p>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Completion rate</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Achievements</CardTitle>
                <CardDescription>Milestones reached</CardDescription>
              </div>
              <Award className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-muted-foreground mt-1 text-sm">Badges earned</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/achievements">
                    View Achievements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="bg-primary/10 rounded-md px-2 py-1">
                        <span className="text-xs font-medium text-primary">{course.category}</span>
                      </div>
                      {course.completed && (
                        <div className="bg-green-500/10 rounded-md px-2 py-1">
                          <span className="text-xs font-medium text-green-500">Completed</span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription>{course.lessons} lessons • {course.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    
                    <div className="mt-4 flex justify-between items-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/courses/${course.id}`}>
                          {course.progress > 0 ? "Continue" : "Start"} Course
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="flex flex-col items-center justify-center p-6 border-dashed hover:border-primary/50 transition-colors cursor-pointer">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Code className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Explore More Courses</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Discover our collection of programming courses
                </p>
                <Button asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="roadmaps" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {roadmaps.map((roadmap) => (
                <Card key={roadmap.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{roadmap.title}</CardTitle>
                    <CardDescription>{roadmap.topics} topics • {roadmap.estimate} to complete</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{roadmap.progress}% complete</span>
                    </div>
                    <Progress value={roadmap.progress} className="h-2 mb-4" />
                    <Button asChild className="w-full">
                      <Link to={`/roadmaps/${roadmap.id}`}>
                        {roadmap.progress > 0 ? "Continue" : "Start"} This Path
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>
                  Track your progress and earn badges as you learn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="bg-primary/10 rounded-full p-3">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{achievement.date}</div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
                    <Award className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-center">Keep Learning to Earn More Badges</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">
                      Complete courses and challenges to unlock achievements
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
