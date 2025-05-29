<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { useProgress } from "@/context/ProgressContext";
import { doc, getDoc, updateDoc, collection, getDocs, query, where, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings, 
  Shield, 
  Activity, 
  MessageSquare, 
  FileText, 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  Search, 
  LogOut,
  Lock,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  points: number;
  rank: string;
  completedCourses: number;
  totalCourses: number;
  learningStreak: number;
  lastActive: string;
  createdAt: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  totalLessons: number;
  enrolledStudents: number;
  averageRating: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  lastUpdated: string;
  instructor: string;
}

interface Report {
  id: string;
  type: 'user' | 'course' | 'content';
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  reportedBy: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { courseProgress, userStats, refreshProgress } = useProgress();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    instructor: ''
  });

  const ADMIN_PASSWORD = "Legocity2020+Legocity2020+";

  const authenticate = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Authentication Successful",
        description: "Welcome to the Admin Panel",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password",
        variant: "destructive",
=======
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Plus, Settings, Shield, Trash2, Edit2, Lock } from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}

const ADMIN_PASSWORD = "Legocity2020+";

const AdminPanel = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
  }, [currentUser, navigate]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchCommunities();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid password",
>>>>>>> ce75beafacb03958a21b96746a8c74423069b768
      });
    }
  };

<<<<<<< HEAD
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
=======
  const fetchCommunities = async () => {
    try {
      const communitiesRef = collection(db, "communities");
      const q = query(communitiesRef);
      const querySnapshot = await getDocs(q);
      
      const communitiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Community[];
      
      setCommunities(communitiesData);
    } catch (error) {
      console.error("Error fetching communities:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch communities",
>>>>>>> ce75beafacb03958a21b96746a8c74423069b768
      });
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const coursesRef = collection(db, "courses");
      const snapshot = await getDocs(coursesRef);
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const reportsRef = collection(db, "reports");
      const snapshot = await getDocs(reportsRef);
      const reportsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Report[];
      setReports(reportsData);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
=======
  const handleCreateCommunity = async () => {
    if (!newCommunity.name || !newCommunity.description) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    try {
      const communitiesRef = collection(db, "communities");
      await addDoc(communitiesRef, {
        name: newCommunity.name,
        description: newCommunity.description,
        members: 0,
        createdAt: serverTimestamp(),
        createdBy: currentUser?.uid,
        isActive: true,
      });

      toast({
        title: "Success",
        description: "Community created successfully",
      });

      setNewCommunity({ name: "", description: "" });
      setShowCreateForm(false);
      fetchCommunities();
    } catch (error) {
      console.error("Error creating community:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create community",
>>>>>>> ce75beafacb03958a21b96746a8c74423069b768
      });
    }
  };

<<<<<<< HEAD
  const updateCourseStatus = async (courseId: string, newStatus: 'active' | 'draft' | 'archived') => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, { status: newStatus });
      toast({
        title: "Success",
        description: "Course status updated successfully",
      });
      fetchCourses();
    } catch (error) {
      console.error("Error updating course status:", error);
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive",
      });
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await deleteDoc(courseRef);
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const createCourse = async () => {
    try {
      const coursesRef = collection(db, "courses");
      await addDoc(coursesRef, {
        ...newCourse,
        status: 'draft',
        enrolledStudents: 0,
        averageRating: 0,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      });
      toast({
        title: "Success",
        description: "Course created successfully",
      });
      setShowCreateModal(false);
      setNewCourse({
        title: '',
        description: '',
        category: '',
        difficulty: 'beginner',
        instructor: ''
      });
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
      toast({
        title: "Error",
        description: "Failed to create course",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
      fetchCourses();
      fetchReports();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
=======
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
>>>>>>> ce75beafacb03958a21b96746a8c74423069b768
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
<<<<<<< HEAD
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center">Admin Authentication</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Enter the admin password to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && authenticate()}
                  className="bg-gray-900/50 border-gray-700"
                />
                <Button onClick={authenticate} className="w-full">
                  Authenticate
                </Button>
              </div>
=======
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Admin Access</CardTitle>
              </div>
              <CardDescription>Enter the admin password to access the panel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Access Admin Panel
                </Button>
              </form>
>>>>>>> ce75beafacb03958a21b96746a8c74423069b768
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

<<<<<<< HEAD
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your platform efficiently</p>
          </motion.div>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              setPassword('');
            }}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl mb-8 bg-gray-800/50">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{users.length}</div>
                    <p className="text-xs text-gray-400">Active users</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{courses.length}</div>
                    <p className="text-xs text-gray-400">Available courses</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                    <Activity className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {courses.filter(c => c.status === 'active').length}
                    </div>
                    <p className="text-xs text-gray-400">Currently active</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                    <AlertCircle className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {reports.filter(r => r.status === 'pending').length}
                    </div>
                    <p className="text-xs text-gray-400">Require attention</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courseProgress.slice(0, 5).map((progress) => (
                          <TableRow key={progress.courseId}>
                            <TableCell>{progress.courseName}</TableCell>
                            <TableCell>
                              <Badge variant={progress.completed ? "secondary" : "default"}>
                                {progress.completed ? "Completed" : "In Progress"}
                              </Badge>
                            </TableCell>
                            <TableCell>{progress.progress}%</TableCell>
                            <TableCell>{new Date(progress.lastAccessed).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports.slice(0, 5).map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>{report.type}</TableCell>
                            <TableCell>{report.title}</TableCell>
                            <TableCell>
                              <Badge variant={
                                report.status === 'pending' ? 'default' :
                                report.status === 'resolved' ? 'secondary' : 'destructive'
                              }>
                                {report.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-900/50 border-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user.id, e.target.value)}
                            className="bg-gray-900/50 border-gray-700 rounded px-2 py-1"
                          >
                            <option value="user">User</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </TableCell>
                        <TableCell>{user.points}</TableCell>
                        <TableCell>
                          {user.completedCourses}/{user.totalCourses}
                        </TableCell>
                        <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/profile/${user.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/inbox/${user.id}`)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Course Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateModal(true)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      New Course
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-900/50 border-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.difficulty}</TableCell>
                        <TableCell>{course.enrolledStudents}</TableCell>
                        <TableCell>{course.averageRating.toFixed(1)}</TableCell>
                        <TableCell>
                          <select
                            value={course.status}
                            onChange={(e) => updateCourseStatus(course.id, e.target.value as 'active' | 'draft' | 'archived')}
                            className="bg-gray-900/50 border-gray-700 rounded px-2 py-1"
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                          </select>
                        </TableCell>
                        <TableCell>{new Date(course.lastUpdated).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/course/${course.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/course/${course.id}/edit`)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteCourse(course.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Report Management</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-900/50 border-gray-700"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.reportedBy}</TableCell>
                        <TableCell>
                          <Badge variant={
                            report.status === 'pending' ? 'default' :
                            report.status === 'resolved' ? 'secondary' : 'destructive'
                          }>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {/* Handle view report */}}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {/* Handle resolve report */}}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {/* Handle dismiss report */}}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>User Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{user.name}</span>
                          <span>{user.completedCourses}/{user.totalCourses} courses</span>
                        </div>
                        <Progress
                          value={(user.completedCourses / user.totalCourses) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.slice(0, 5).map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{course.title}</span>
                          <span>{course.enrolledStudents} students</span>
                        </div>
                        <Progress
                          value={(course.enrolledStudents / Math.max(...courses.map(c => c.enrolledStudents))) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-gray-400">
                      Enable maintenance mode to temporarily disable the platform for all users except administrators.
                    </p>
                    <Button variant="outline">Toggle Maintenance Mode</Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-400">
                      Configure email notification settings for various platform events.
                    </p>
                    <Button variant="outline">Configure Notifications</Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Backup & Restore</h3>
                    <p className="text-sm text-gray-400">
                      Create backups of your platform data and restore from previous backups.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">Create Backup</Button>
                      <Button variant="outline">Restore Backup</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
=======
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <Badge className="mb-2 px-4 py-1.5 text-sm bg-primary/10 text-primary">
              <Shield className="w-4 h-4 mr-2" />
              Admin Panel
            </Badge>
            <h1 className="text-3xl font-bold">Community Management</h1>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Community
          </Button>
        </div>

        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Create New Community</CardTitle>
                <CardDescription>Fill in the details to create a new community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Community Name</label>
                  <Input
                    placeholder="Enter community name"
                    value={newCommunity.name}
                    onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Enter community description"
                    value={newCommunity.description}
                    onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateCommunity}>Create</Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid gap-6">
          {communities.map((community) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{community.name}</CardTitle>
                      <CardDescription>{community.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {community.members} members
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Created on {community.createdAt?.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
>>>>>>> ce75beafacb03958a21b96746a8c74423069b768
    </div>
  );
};

export default AdminPanel; 