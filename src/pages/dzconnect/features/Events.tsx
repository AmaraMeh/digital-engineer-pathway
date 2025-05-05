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
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight,
  Star,
  Award,
  Trophy,
  Book,
  Code,
  MessageSquare,
  Share2,
  Bookmark,
  Flag
} from "lucide-react";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow, format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  organizer: string;
  organizerName: string;
  organizerPhoto: string;
  attendees: string[];
  capacity: number;
  tags: string[];
  type: 'workshop' | 'meetup' | 'conference' | 'hackathon' | 'webinar';
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: string;
}

const Events = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsRef = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsRef);
      const eventsData = eventsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate(),
          attendees: doc.data().attendees || [],
          tags: doc.data().tags || [],
        })) as Event[];

      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch events",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAttend = async (eventId: string) => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to attend events",
      });
      return;
    }

    try {
      const eventRef = doc(db, "events", eventId);
      const event = events.find(e => e.id === eventId);

      if (event?.attendees.includes(currentUser.uid)) {
        await updateDoc(eventRef, {
          attendees: arrayRemove(currentUser.uid),
        });
        toast({
          title: "Success",
          description: "Removed from event",
        });
      } else {
        if (event?.attendees.length >= event?.capacity) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Event is full",
          });
          return;
        }

        await updateDoc(eventRef, {
          attendees: arrayUnion(currentUser.uid),
        });
        toast({
          title: "Success",
          description: "Added to event",
        });
      }

      fetchEvents();
    } catch (error) {
      console.error("Error attending/leaving event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to attend/leave event",
      });
    }
  };

  const handleShare = (eventId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/events/${eventId}`);
    toast({
      title: "Success",
      description: "Event link copied to clipboard",
    });
  };

  const handleReport = (eventId: string) => {
    toast({
      title: "Report",
      description: "Event reported successfully",
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === "all" || event.type === selectedType;

    return matchesSearch && matchesType;
  });

  const upcomingEvents = filteredEvents
    .filter(event => event.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const ongoingEvents = filteredEvents
    .filter(event => event.status === "ongoing")
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const completedEvents = filteredEvents
    .filter(event => event.status === "completed")
    .sort((a, b) => b.date.getTime() - a.date.getTime());

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
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedType("all")}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  All Events
                </Button>
                <Button
                  variant={selectedType === "workshop" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedType("workshop")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Workshops
                </Button>
                <Button
                  variant={selectedType === "meetup" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedType("meetup")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Meetups
                </Button>
                <Button
                  variant={selectedType === "conference" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedType("conference")}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Conferences
                </Button>
                <Button
                  variant={selectedType === "hackathon" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedType("hackathon")}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Hackathons
                </Button>
                <Button
                  variant={selectedType === "webinar" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedType("webinar")}
                >
                  <Book className="h-4 w-4 mr-2" />
                  Webinars
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="ongoing">
                <Clock className="h-4 w-4 mr-2" />
                Ongoing
              </TabsTrigger>
              <TabsTrigger value="completed">
                <Star className="h-4 w-4 mr-2" />
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-24 w-24 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {format(event.date, "MMM d, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleAttend(event.id)}
                        >
                          {event.attendees.includes(currentUser?.uid || "") ? "Attending" : "Attend"}
                        </Button>
                        <Button variant="outline" onClick={() => handleShare(event.id)}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" onClick={() => handleReport(event.id)}>
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ongoing" className="space-y-4">
              {ongoingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-24 w-24 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock className="h-8 w-8 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {event.attendees.length}/{event.capacity} attendees
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleAttend(event.id)}
                        >
                          {event.attendees.includes(currentUser?.uid || "") ? "Attending" : "Attend"}
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-24 w-24 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Star className="h-8 w-8 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {event.attendees.length} attendees
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {format(event.date, "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => handleShare(event.id)}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events; 