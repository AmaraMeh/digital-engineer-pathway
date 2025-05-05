import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Users, 
  Hash, 
  TrendingUp, 
  Star, 
  Award, 
  Book, 
  Code, 
  MessageSquare,
  Plus,
  X
} from "lucide-react";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
  interests: string[];
  skills: string[];
  achievements: any[];
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

interface Tag {
  name: string;
  count: number;
}

const Discover = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchTags();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          followers: doc.data().followers || [],
          following: doc.data().following || [],
          posts: doc.data().posts || [],
          interests: doc.data().interests || [],
          skills: doc.data().skills || [],
          achievements: doc.data().achievements || [],
          stats: doc.data().stats || {
            totalPosts: 0,
            totalFollowers: 0,
            totalFollowing: 0,
            totalLikes: 0,
            totalComments: 0,
            totalShares: 0,
            engagementRate: 0
          }
        })) as User[];

      // Filter out current user
      const filteredUsers = usersData.filter(user => user.id !== currentUser?.uid);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const postsRef = collection(db, "posts");
      const postsSnapshot = await getDocs(postsRef);
      const tagCounts: { [key: string]: number } = {};

      postsSnapshot.docs.forEach(doc => {
        const postTags = doc.data().tags || [];
        postTags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      const tagsData = Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to follow users",
      });
      return;
    }

    try {
      const userRef = doc(db, "users", userId);
      const currentUserRef = doc(db, "users", currentUser.uid);
      const user = users.find(u => u.id === userId);

      if (user?.followers.includes(currentUser.uid)) {
        await updateDoc(userRef, {
          followers: arrayRemove(currentUser.uid),
        });
        await updateDoc(currentUserRef, {
          following: arrayRemove(userId),
        });
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
        toast({
          title: "Success",
          description: "Followed user",
        });
      }

      fetchUsers();
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to follow/unfollow user",
      });
    }
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => user.interests.includes(tag) || user.skills.includes(tag));

    return matchesSearch && matchesTags;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 20).map((tag) => (
                  <Badge
                    key={tag.name}
                    variant={selectedTags.includes(tag.name) ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => handleTagSelect(tag.name)}
                  >
                    #{tag.name}
                    <span className="ml-1 text-xs">({tag.count})</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Tags</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTags.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tags selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => handleTagSelect(tag)}
                    >
                      #{tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="skills">
                <Code className="h-4 w-4 mr-2" />
                Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user.photoURL} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.bio}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {user.interests.slice(0, 3).map((interest) => (
                              <Badge key={interest} variant="secondary">
                                {interest}
                              </Badge>
                            ))}
                            {user.interests.length > 3 && (
                              <Badge variant="secondary">
                                +{user.interests.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleFollow(user.id)}
                        >
                          {user.followers.includes(currentUser?.uid || "") ? "Following" : "Follow"}
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users
                  .sort((a, b) => b.stats.engagementRate - a.stats.engagementRate)
                  .slice(0, 6)
                  .map((user) => (
                    <Card key={user.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.photoURL} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.stats.engagementRate}% engagement
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users
                  .flatMap(user => user.achievements)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 6)
                  .map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users
                  .flatMap(user => user.skills)
                  .reduce((acc: { [key: string]: number }, skill) => {
                    acc[skill] = (acc[skill] || 0) + 1;
                    return acc;
                  }, {})
                  .entries()
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 6)
                  .map(([skill, count]) => (
                    <Card key={skill}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Code className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{skill}</p>
                            <p className="text-sm text-muted-foreground">
                              {count} users
                            </p>
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

export default Discover; 