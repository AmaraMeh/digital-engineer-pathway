
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Bell, Shield, User } from "lucide-react";

const profileSchema = z.object({
  displayName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }).optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  github: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: currentUser?.displayName || "",
      email: currentUser?.email || "",
      bio: "",
      website: "",
      github: "",
      twitter: "",
      linkedin: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    try {
      console.log("Profile update data:", data);
      // Here you would implement the actual update logic with Firebase
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const userInitials = currentUser?.displayName
    ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

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
        <h1 className="text-3xl font-bold">Your Profile</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64">
              <div className="flex flex-col items-center py-8 px-4 bg-card border rounded-lg mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || ""} />
                  <AvatarFallback className="bg-primary text-2xl font-bold text-white">{userInitials}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{currentUser?.displayName || "User"}</h2>
                <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Frontend Developer</Badge>
                  <Badge variant="outline">Student</Badge>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg overflow-hidden">
                <TabsList className="flex flex-col h-auto w-full p-0 bg-transparent">
                  <TabsTrigger 
                    value="general" 
                    className="justify-start px-4 py-2 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <User className="h-4 w-4 mr-2" />
                    General
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start px-4 py-2 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="justify-start px-4 py-2 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="flex-1">
              <TabsContent value="general" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>General information</CardTitle>
                    <CardDescription>
                      Update your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="displayName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your name" 
                                  {...field} 
                                  className="max-w-md"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="Enter your email" 
                                  {...field} 
                                  className="max-w-md" 
                                  disabled 
                                />
                              </FormControl>
                              <FormDescription>
                                Email can't be changed directly. Please contact support.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Tell us a little about yourself" 
                                  {...field} 
                                  className="max-w-md"
                                />
                              </FormControl>
                              <FormDescription>
                                Brief description for your profile.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://yourwebsite.com" 
                                  {...field} 
                                  className="max-w-md"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Social Profiles</h3>
                          <div className="grid gap-4">
                            <FormField
                              control={form.control}
                              name="github"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>GitHub</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="github" 
                                      {...field} 
                                      className="max-w-md"
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Your GitHub username
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="twitter"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Twitter</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="twitter" 
                                      {...field} 
                                      className="max-w-md"
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Your Twitter username
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="linkedin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>LinkedIn</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="linkedin" 
                                      {...field} 
                                      className="max-w-md"
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Your LinkedIn username
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? "Saving..." : "Save changes"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification settings</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Coming soon. Notification preferences will be available in a future update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security settings</CardTitle>
                    <CardDescription>
                      Manage your account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">Password</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Change your password to keep your account secure.
                        </p>
                        <Button variant="outline">Change password</Button>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div>
                        <h3 className="font-medium text-destructive mb-1">Danger zone</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Permanently delete your account and all of your content.
                        </p>
                        <Button variant="destructive">Delete account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
