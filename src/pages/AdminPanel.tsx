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
      });
    }
  };

  const fetchCommunities = async () => {
    try {
      const communitiesRef = collection(db, "communities");
      const q = query(communitiesRef);
      const querySnapshot = await getDocs(q);
      
      const communitiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Community[];
      
      setCommunities(communitiesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching communities:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch communities",
      });
      setLoading(false);
    }
  };

  const handleCreateCommunity = async () => {
    try {
      if (!newCommunity.name || !newCommunity.description) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all fields",
        });
        return;
      }

      const communityData = {
        ...newCommunity,
        members: 0,
        createdAt: serverTimestamp(),
        createdBy: currentUser?.uid,
        isActive: true,
      };

      await addDoc(collection(db, "communities"), communityData);
      
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
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Admin Authentication</CardTitle>
            <CardDescription>Please enter the admin password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Authenticate
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Community
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Community</CardTitle>
            <CardDescription>Fill in the details to create a new community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Community Name"
                value={newCommunity.name}
                onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
              />
              <Textarea
                placeholder="Community Description"
                value={newCommunity.description}
                onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCommunity}>
                  Create Community
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          communities.map((community) => (
            <Card key={community.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{community.name}</CardTitle>
                    <CardDescription>{community.description}</CardDescription>
                  </div>
                  <Badge variant={community.isActive ? "default" : "secondary"}>
                    {community.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{community.members} members</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 