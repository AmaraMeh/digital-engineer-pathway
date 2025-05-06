import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Phone, Mail, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const campusData = {
  targaOuzemour: {
    name: "Campus Targa Ouzemour",
    description: "Campus principal de l'université",
    location: "Route de Targa Ouzemour, 06000 Béjaïa",
    faculties: [
      "Faculté de Technologie",
      "Faculté des Sciences Exactes",
      "Faculté des Sciences Économiques"
    ],
    contact: {
      phone: "034 81 68 20",
      email: "contact@univ-bejaia.dz"
    }
  },
  aboudaou: {
    name: "Campus Aboudaou",
    description: "Pôle universitaire moderne",
    location: "Route d'Aboudaou, 06000 Béjaïa",
    faculties: [
      "Faculté de Médecine",
      "Faculté des Sciences de la Nature et de la Vie",
      "Faculté de Droit"
    ],
    contact: {
      phone: "034 81 68 21",
      email: "contact.aboudaou@univ-bejaia.dz"
    }
  },
  elKseur: {
    name: "Campus El Kseur",
    description: "Nouveau pôle universitaire",
    location: "El Kseur, 06008 Béjaïa",
    faculties: [
      "Institut des Sciences et Techniques",
      "École Supérieure de Management"
    ],
    contact: {
      phone: "034 81 68 22",
      email: "contact.elkseur@univ-bejaia.dz"
    }
  }
};

const CampusPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => navigate("/ubejaia-guide")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour au guide
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Building2 className="w-4 h-4 mr-2" />
            Campus
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Nos Campus
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Découvrez les différents campus de l'Université de Béjaïa
          </p>
        </motion.div>

        {/* Campus Tabs */}
        <Tabs defaultValue="targaOuzemour" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto">
            <TabsTrigger value="targaOuzemour">Targa Ouzemour</TabsTrigger>
            <TabsTrigger value="aboudaou">Aboudaou</TabsTrigger>
            <TabsTrigger value="elKseur">El Kseur</TabsTrigger>
          </TabsList>

          {Object.entries(campusData).map(([id, campus]) => (
            <TabsContent key={id} value={id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6"
              >
                {/* Campus Info */}
                <Card className="overflow-hidden">
                  <CardHeader className="border-b bg-slate-50 dark:bg-slate-800/50">
                    <CardTitle className="text-2xl">{campus.name}</CardTitle>
                    <CardDescription className="text-base">{campus.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{campus.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span>{campus.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span>{campus.contact.email}</span>
                      </div>

                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-3 text-slate-900 dark:text-slate-100">Facultés présentes</h3>
                        <div className="flex flex-wrap gap-2">
                          {campus.faculties.map((faculty) => (
                            <Badge key={faculty} variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                              {faculty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CampusPage; 