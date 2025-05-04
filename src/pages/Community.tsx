import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Users, MessageSquare, Star, Calendar, Heart, Code } from "lucide-react";

const events = [
  {
    title: "Web Development Workshop",
    date: "March 25, 2024",
    time: "2:00 PM EST",
    description: "Join us for a hands-on workshop on modern web development practices.",
    attendees: "150",
    icon: Code
  },
  {
    title: "React Community Meetup",
    date: "April 5, 2024",
    time: "3:00 PM EST",
    description: "Connect with fellow React developers and share your experiences.",
    attendees: "200",
    icon: Users
  },
  {
    title: "Code Review Session",
    date: "April 15, 2024",
    time: "4:00 PM EST",
    description: "Get feedback on your code from experienced developers.",
    attendees: "100",
    icon: MessageSquare
  }
];

const communityStats = [
  {
    title: "Active Members",
    value: "10,000+",
    description: "Join our growing community of developers",
    icon: Users
  },
  {
    title: "Discussions",
    value: "5,000+",
    description: "Engage in meaningful conversations",
    icon: MessageSquare
  },
  {
    title: "Events",
    value: "50+",
    description: "Participate in regular community events",
    icon: Calendar
  },
  {
    title: "Projects",
    value: "1,000+",
    description: "Collaborate on exciting projects",
    icon: Code
  }
];

const Community = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary">
            <Star className="w-4 h-4 mr-2" />
            Join Our Community
          </Badge>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Connect & Collaborate
        </motion.h1>
        
        <motion.p
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Join our vibrant community of developers, share knowledge, and grow together.
        </motion.p>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search community discussions..."
              className="pl-10 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityStats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
                  <CardDescription className="text-lg">{stat.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community events to learn, network, and grow together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`p-3 rounded-full w-fit mb-4 ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-500'}`}>
                    <event.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.attendees} attending
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <Button className="w-full gap-2 group">
                    Join Event
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <motion.div
          className="p-8 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-gray-200/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become part of our growing community and start connecting with fellow developers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 group">
              Join Community
              <Users className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 group">
              View Events
              <Calendar className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Community; 