
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Award, Edit, Settings, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function UserProfileCard() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(45);

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

  // Use real stats or provide sensible defaults
  const stats = [
    { 
      label: "Joined", 
      value: joinDate, 
      icon: Calendar 
    },
    { 
      label: "Learning Time", 
      value: "0h 0m", // This would typically come from a database 
      icon: Clock 
    },
    { 
      label: "Certificates", 
      value: "0 earned", // This would typically come from a database
      icon: Award 
    },
  ];

  return (
    <Card className="w-full hover:shadow-lg transition-all border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary animate-fade-in">
              <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
              <AvatarFallback className="bg-primary text-xl font-bold text-white">{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{currentUser?.displayName || "User"}</CardTitle>
              <CardDescription>{currentUser?.email || ""}</CardDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="animate-fade-in transition-all hover:bg-primary/20">Learning</Badge>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all">
              <div className="bg-primary/10 rounded-full p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-medium">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <p className="text-sm text-muted-foreground">
          {currentUser?.metadata?.lastSignInTime 
            ? `Last login: ${new Date(currentUser.metadata.lastSignInTime).toLocaleString()}`
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
