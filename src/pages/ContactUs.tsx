import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Instagram, School, Code, ExternalLink } from "lucide-react";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { useLanguage } from "@/context/LanguageContext";

const contactInfo = [
  {
    title: "Developer",
    value: "Amara Mehdi",
    icon: Code,
    description: "Lead Developer & Creator"
  },
  {
    title: "Location",
    value: "Bejaia, Algeria",
    icon: MapPin,
    description: "University of Bejaia"
  },
  {
    title: "Phone",
    value: "+213 542 264 585",
    icon: Phone,
    description: "Monday to Friday, 9AM to 5PM"
  },
  {
    title: "Email",
    value: "Mehdi.amara@tech.univ-bejaia.dz",
    icon: Mail,
    description: "Send us your query anytime!"
  },
  {
    title: "University",
    value: "University of Bejaia",
    icon: School,
    description: "Faculty of Technology"
  },
  {
    title: "Instagram",
    value: "@spot_campuselkseur",
    secondValue: "@amaramehdipersonal",
    icon: Instagram,
    description: "Follow us for updates"
  }
];

const ContactUs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <PageNavigation />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all border-primary/10">
                    <CardHeader className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <info.icon className="h-5 w-5" />
                        </div>
                        {info.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-lg">{info.value}</p>
                      {info.secondValue && (
                        <p className="font-medium text-lg mt-1">{info.secondValue}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button className="w-full">
                  Send Message
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map or Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="p-6 bg-primary/5 border-primary/10">
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">Visit Our Campus</h3>
              <p className="text-muted-foreground">
                We're located at the University of Bejaia, Faculty of Technology.
                Come visit us to learn more about our programs and opportunities.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs; 