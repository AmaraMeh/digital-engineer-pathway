
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Globe, Moon, Shield, Sun, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [language, setLanguage] = useState("english");
  
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme set to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`,
    });
  };

  const handleNotificationSettingsSave = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleAccountSettingsSave = () => {
    toast({
      title: "Account settings updated",
      description: "Your account settings have been saved.",
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Password reset email sent",
      description: "Check your email for instructions to reset your password.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email to confirm account deletion.",
      variant: "destructive",
    });
  };

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
      <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px] mb-8">
            <TabsTrigger value="appearance" className="flex gap-2 items-center">
              <Sun className="h-4 w-4" /> 
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex gap-2 items-center">
              <User className="h-4 w-4" /> 
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" /> 
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex gap-2 items-center">
              <Globe className="h-4 w-4" /> 
              <span className="hidden sm:inline">Language</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center">
              <Shield className="h-4 w-4" /> 
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="animate-in fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how CodePathway looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all ${theme === 'light' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                        onClick={() => handleThemeChange('light')}
                      >
                        <div className="size-12 bg-white border border-gray-200 rounded-md mb-3 flex items-center justify-center">
                          <Sun className="h-6 w-6 text-amber-500" />
                        </div>
                        <span className="font-medium">Light</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all ${theme === 'dark' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                        onClick={() => handleThemeChange('dark')}
                      >
                        <div className="size-12 bg-slate-900 border border-slate-800 rounded-md mb-3 flex items-center justify-center">
                          <Moon className="h-6 w-6 text-slate-400" />
                        </div>
                        <span className="font-medium">Dark</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all ${theme === 'system' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                        onClick={() => handleThemeChange('system')}
                      >
                        <div className="size-12 bg-gradient-to-br from-white to-slate-900 border border-gray-200 rounded-md mb-3 flex items-center justify-center">
                          <Sun className="h-5 w-5 text-amber-500 -mr-1" />
                          <Moon className="h-5 w-5 text-slate-400 -ml-1" />
                        </div>
                        <span className="font-medium">System</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      System setting will automatically match your device's theme preference.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="animate-in fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="display_name">Display Name</Label>
                    <Input id="display_name" defaultValue={currentUser?.displayName || ""} />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={currentUser?.email || ""} disabled />
                    <p className="text-sm text-muted-foreground">
                      Your email is used for sign-in and cannot be changed directly
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" placeholder="Tell others a little about yourself" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="headline">Professional Headline</Label>
                    <Input id="headline" placeholder="e.g., Frontend Developer at Tech Inc." />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAccountSettingsSave}>Save account settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="animate-in fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email_notifications" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive course updates and announcements</p>
                    </div>
                    <Switch 
                      id="email_notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push_notifications" className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                    </div>
                    <Switch 
                      id="push_notifications" 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing_emails" className="font-medium">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional content and special offers</p>
                    </div>
                    <Switch 
                      id="marketing_emails" 
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNotificationSettingsSave}>Save notification settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="language" className="animate-in fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>
                  Select your preferred language for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="language">Interface Language</Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    This will change the language used throughout the platform.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save language settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="animate-in fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Password</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Change your password to keep your account secure
                    </p>
                    <Button variant="outline" onClick={handleChangePassword}>Change password</Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Set up 2FA</Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-destructive mb-1">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all of your content
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>Delete account</Button>
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

export default Settings;
