import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, GraduationCap, FileText, Users, Calendar,
  BookOpen, Library, MapPin, HelpCircle, ChevronLeft,
  Building2, Mail, Phone, Clock, Globe, Map
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data - This would come from your backend in a real application
const guidesData = {
  registration: {
    name: "Guide d'Inscription",
    description: "Tout ce que vous devez savoir sur le processus d'inscription à l'Université de Béjaïa",
    steps: [
      {
        title: "Pré-inscription en ligne",
        description: "Remplissez le formulaire de pré-inscription sur le portail de l'université",
        deadline: "15 Juillet",
      },
      {
        title: "Dépôt des dossiers",
        description: "Déposez votre dossier complet au bureau des inscriptions",
        deadline: "30 Juillet",
      },
      {
        title: "Paiement des frais",
        description: "Effectuez le paiement des frais d'inscription",
        deadline: "5 Septembre",
      },
      {
        title: "Finalisation",
        description: "Récupérez votre carte d'étudiant et votre emploi du temps",
        deadline: "15 Septembre",
      },
    ],
    documents: [
      "Relevé de notes du bac",
      "Attestation de réussite au bac",
      "Photos d'identité",
      "Copie de la carte d'identité",
      "Justificatif de domicile",
    ],
  },
  campus: {
    name: "Guide du Campus",
    description: "Découvrez les installations et services disponibles sur le campus",
    facilities: [
      {
        name: "Bibliothèque",
        description: "Accès à des milliers de livres et ressources en ligne",
        location: "Bâtiment A, 1er étage",
        hours: "8h00 - 20h00",
      },
      {
        name: "Restaurant Universitaire",
        description: "Service de restauration pour les étudiants",
        location: "Bâtiment B, Rez-de-chaussée",
        hours: "11h30 - 14h30",
      },
      {
        name: "Centre Sportif",
        description: "Installations sportives et activités",
        location: "Bâtiment C",
        hours: "8h00 - 22h00",
      },
    ],
    map: {
      image: "/images/campus-map.jpg",
      description: "Plan du campus avec les différents bâtiments et installations",
    },
  },
  services: {
    name: "Services Universitaires",
    description: "Les services disponibles pour les étudiants",
    services: [
      {
        name: "Bureau des Inscriptions",
        description: "Gestion des inscriptions et dossiers étudiants",
        contact: "inscriptions@univ-bejaia.dz",
        location: "Bâtiment Administratif",
      },
      {
        name: "Service des Stages",
        description: "Aide à la recherche de stages et alternance",
        contact: "stages@univ-bejaia.dz",
        location: "Bâtiment B, 2ème étage",
      },
      {
        name: "Service de Santé",
        description: "Soins médicaux et conseils de santé",
        contact: "sante@univ-bejaia.dz",
        location: "Bâtiment C, Rez-de-chaussée",
      },
    ],
  },
};

const GuidePage = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const guide = guidesData[guideId as keyof typeof guidesData];

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Guide non trouvé</p>
            <Button onClick={() => navigate("/ubejaia-guide")} className="mt-4">
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/ubejaia-guide")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            {guide.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {guide.description}
          </p>
        </motion.div>

        {/* Main Content */}
        {guideId === "registration" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Étapes d'Inscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guide.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4 p-4 rounded-lg border">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                          <p className="text-sm text-primary mt-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Date limite: {step.deadline}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents Requis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.documents.map((doc, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-primary" />
                      {doc}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {guideId === "campus" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installations du Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guide.facilities.map((facility, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle>{facility.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {facility.description}
                          </p>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {facility.location}
                            </p>
                            <p className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {facility.hours}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan du Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Map className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground ml-4">
                    Plan du campus à venir
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {guideId === "services" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Services Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guide.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle>{service.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {service.description}
                          </p>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {service.contact}
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {service.location}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePage; 