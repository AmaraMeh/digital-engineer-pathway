import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  Bell, 
  Shield, 
  Palette, 
  Laptop, 
  Moon, 
  Sun, 
  Save, 
  UserCog, 
  Globe, 
  Volume2, 
  Eye, 
  Mail
} from "lucide-react";

const Settings = () => {
  const { currentUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState([16]);
  const [notifications, setNotifications] = useState({
    email: true,
    courses: true,
    updates: false,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    activityTracking: true,
    dataSaving: false
  });
  
  const { toast } = useToast();

  const handleSave = async (section: string) => {
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Settings saved",
        description: `Your ${section} settings have been updated successfully.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save settings",
        description: "Please try again later.",
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>You need to be logged in to access settings</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account preferences and application settings</p>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all sticky top-20">
                <TabsList className="flex flex-col h-auto w-full p-0 bg-transparent">
                  <TabsTrigger 
                    value="appearance" 
                    className="justify-start px-4 py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start px-4 py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="justify-start px-4 py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <UserCog className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="justify-start px-4 py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security & Privacy
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="flex-1">
              <TabsContent value="appearance" className="m-0">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Appearance Settings
                    </CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-3">Theme</h3>
                        <div className="grid grid-cols-3 gap-3">
                          <div 
                            className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${theme === "light" ? "border-primary bg-primary/5" : "hover:bg-accent"}`}
                            onClick={() => setTheme("light")}
                          >
                            <Sun className="h-6 w-6 mb-2" />
                            <span className="text-sm">Light</span>
                          </div>
                          <div 
                            className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${theme === "dark" ? "border-primary bg-primary/5" : "hover:bg-accent"}`}
                            onClick={() => setTheme("dark")}
                          >
                            <Moon className="h-6 w-6 mb-2" />
                            <span className="text-sm">Dark</span>
                          </div>
                          <div 
                            className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${theme === "system" ? "border-primary bg-primary/5" : "hover:bg-accent"}`}
                            onClick={() => setTheme("system")}
                          >
                            <Laptop className="h-6 w-6 mb-2" />
                            <span className="text-sm">System</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Language</h3>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-full max-w-xs">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">Font Size</h3>
                          <span className="text-sm text-muted-foreground">{fontSize}px</span>
                        </div>
                        <Slider
                          value={fontSize}
                          min={12}
                          max={24}
                          step={1}
                          onValueChange={setFontSize}
                          className="max-w-sm"
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Preferences</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="animations">Enable animations</Label>
                            <p className="text-sm text-muted-foreground">Turn on/off UI animations</p>
                          </div>
                          <Switch id="animations" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="sound-effects">Sound effects</Label>
                            <p className="text-sm text-muted-foreground">Play sounds for certain interactions</p>
                          </div>
                          <Switch id="sound-effects" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between border-t pt-6">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button onClick={() => handleSave('appearance')} disabled={saving}>
                      {saving ? "Saving..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Control when and how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-notifications">Course updates</Label>
                              <p className="text-sm text-muted-foreground">Get notified about new lessons and course updates</p>
                            </div>
                            <Switch 
                              id="email-notifications" 
                              checked={notifications.courses}
                              onCheckedChange={(checked) => setNotifications({...notifications, courses: checked})}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="product-updates">Product updates</Label>
                              <p className="text-sm text-muted-foreground">Receive updates about new features and improvements</p>
                            </div>
                            <Switch 
                              id="product-updates" 
                              checked={notifications.updates}
                              onCheckedChange={(checked) => setNotifications({...notifications, updates: checked})}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="marketing">Marketing emails</Label>
                              <p className="text-sm text-muted-foreground">Receive tips, special offers, and promotions</p>
                            </div>
                            <Switch 
                              id="marketing" 
                              checked={notifications.marketing}
                              onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-4">In-App Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="achievement">Achievements</Label>
                              <p className="text-sm text-muted-foreground">When you earn badges or complete courses</p>
                            </div>
                            <Switch id="achievement" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="reminders">Learning reminders</Label>
                              <p className="text-sm text-muted-foreground">Daily reminders to continue learning</p>
                            </div>
                            <Switch id="reminders" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-2">Notification Schedule</h3>
                        <p className="text-sm text-muted-foreground mb-4">Configure when you want to receive notifications</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="start-time">Start Time</Label>
                            <Input id="start-time" type="time" defaultValue="09:00" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="end-time">End Time</Label>
                            <Input id="end-time" type="time" defaultValue="21:00" className="mt-1" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Notifications will only be sent between these hours</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between border-t pt-6">
                    <div className="flex items-center">
                      <Switch id="pause-all" />
                      <Label htmlFor="pause-all" className="ml-2">Pause all notifications</Label>
                    </div>
                    <Button onClick={() => handleSave('notifications')} disabled={saving}>
                      {saving ? "Saving..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="m-0">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCog className="h-5 w-5 mr-2" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Account Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="display-name">Display Name</Label>
                          <Input id="display-name" defaultValue={currentUser.displayName || ""} className="mt-1 max-w-md" />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" defaultValue={currentUser.email || ""} disabled className="mt-1 max-w-md" />
                          <p className="text-xs text-muted-foreground mt-1">Contact support to change your email address</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Account Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Time Zone</Label>
                            <Select defaultValue="auto">
                              <SelectTrigger className="w-full max-w-xs mt-1">
                                <SelectValue placeholder="Select Time Zone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">Auto-detect (System)</SelectItem>
                                <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                                <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                                <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                                <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                                <SelectItem value="europe-london">London (GMT)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="learning-reminders">Learning Reminders</Label>
                              <p className="text-sm text-muted-foreground">Set daily reminders to continue your learning streak</p>
                            </div>
                            <Switch id="learning-reminders" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Linked Accounts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-[#4267B2] text-white rounded flex items-center justify-center">f</div>
                            <div>
                              <p className="font-medium">Facebook</p>
                              <p className="text-sm text-muted-foreground">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-[#1DA1F2] text-white rounded flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                            </div>
                            <div>
                              <p className="font-medium">Twitter</p>
                              <p className="text-sm text-muted-foreground">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-[#333] text-white rounded flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </div>
                            <div>
                              <p className="font-medium">GitHub</p>
                              <p className="text-sm text-muted-foreground">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-destructive">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">Irreversible and destructive actions</p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end border-t pt-6">
                    <Button onClick={() => handleSave('account')} disabled={saving}>
                      {saving ? "Saving..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Security & Privacy
                    </CardTitle>
                    <CardDescription>
                      Manage your security settings and privacy preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" className="mt-1 max-w-md" />
                        </div>
                        
                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" className="mt-1 max-w-md" />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" className="mt-1 max-w-md" />
                        </div>
                        
                        <Button>Change Password</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account by requiring a verification code in addition to your password.
                      </p>
                      <Button variant="outline">Setup 2FA</Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <Select 
                            value={privacy.profileVisibility}
                            onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
                          >
                            <SelectTrigger className="mt-1 max-w-md">
                              <SelectValue placeholder="Who can see your profile" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">
                                <div className="flex items-center">
                                  <Globe className="h-4 w-4 mr-2" />
                                  <span>Public</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="friends">
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-2" />
                                  <span>Friends only</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="private">
                                <div className="flex items-center">
                                  <Shield className="h-4 w-4 mr-2" />
                                  <span>Private</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="activity-tracking">Activity Tracking</Label>
                            <p className="text-sm text-muted-foreground">Allow us to track your learning progress and activities</p>
                          </div>
                          <Switch 
                            id="activity-tracking" 
                            checked={privacy.activityTracking}
                            onCheckedChange={(checked) => setPrivacy({...privacy, activityTracking: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="data-collection">Data Collection</Label>
                            <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve our platform</p>
                          </div>
                          <Switch id="data-collection" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Sessions</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        These are devices that have logged into your account. Revoke any sessions that you do not recognize.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Current session</p>
                            <p className="text-sm text-muted-foreground">Chrome on Windows • {new Date().toLocaleDateString()}</p>
                          </div>
                          <Badge>Current</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Mobile session</p>
                            <p className="text-sm text-muted-foreground">iOS App • {new Date(Date.now() - 86400000).toLocaleDateString()}</p>
                          </div>
                          <Button variant="outline" size="sm">Revoke</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between border-t pt-6">
                    <Button variant="outline">Sign out all devices</Button>
                    <Button onClick={() => handleSave('security')} disabled={saving}>
                      {saving ? "Saving..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
