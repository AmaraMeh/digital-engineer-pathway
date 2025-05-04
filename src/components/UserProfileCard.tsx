
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Award } from "lucide-react";

export function UserProfileCard() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(45);

  const userInitials = currentUser?.displayName
    ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  // Mock user stats
  const stats = [
    { label: "Joined", value: "May 2023", icon: Calendar },
    { label: "Learning Time", value: "78h 22m", icon: Clock },
    { label: "Certificates", value: "3 earned", icon: Award },
  ];

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
              <AvatarFallback className="bg-primary text-xl font-bold text-white">{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{currentUser?.displayName || "User"}</CardTitle>
              <CardDescription>{currentUser?.email || ""}</CardDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">Frontend</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">JavaScript</Badge>
              </div>
            </div>
          </div>
          <Button>Edit Profile</Button>
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
            <div key={stat.label} className="flex items-center gap-3 p-3 border rounded-lg">
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
        <p className="text-sm text-muted-foreground">Last activity: 2 hours ago</p>
        <Button variant="ghost" size="sm">View full activity</Button>
      </CardFooter>
    </Card>
  );
}
