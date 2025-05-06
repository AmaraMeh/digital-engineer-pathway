import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Library, MapPin, Clock, Book, Users,
  Wifi, Laptop, Printer, Search, Database,
  BookOpen, LucideIcon, Phone, Mail, ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Resource {
  name: string;
  icon: LucideIcon;
  description: string;
  details: {
    [key: string]: string | string[];
  };
}

interface LibraryData {
  name: string;
  description: string;
  location: string;
  hours: {
    weekdays: string;
    weekend: string;
  };
  capacity: string;
  resources: Resource[];
  services: string[];
  contact: {
    phone: string;
    email: string;
  };
}

interface LibrariesData {
  [key: string]: LibraryData;
}

const librariesData: LibrariesData = {
  central: {
    name: "Bibliothèque Centrale",
    description: "Bibliothèque principale de l'université",
    location: "Campus Targa Ouzemour",
    hours: {
      weekdays: "8h00 - 17h00",
      weekend: "9h00 - 15h00"
    },
    capacity: "800 places",
    resources: [
      {
        name: "Collection Générale",
        icon: Book,
        description: "Ouvrages généraux et spécialisés",
        details: {
          volumes: "50,000+ ouvrages",
          languages: ["Français", "Anglais", "Arabe"],
          subjects: ["Sciences", "Technologie", "Littérature", "Sciences Humaines"]
        }
      },
      {
        name: "Ressources Numériques",
        icon: Database,
        description: "Accès aux bases de données et revues électroniques",
        details: {
          databases: ["ScienceDirect", "IEEE Xplore", "Springer"],
          access: "Sur place et à distance",
          content: ["Articles scientifiques", "Thèses", "E-books"]
        }
      },
      {
        name: "Espace Multimédia",
        icon: Laptop,
        description: "Postes informatiques et ressources multimédia",
        details: {
          equipment: "30 postes de travail",
          services: ["Internet haut débit", "Logiciels spécialisés", "Impression"]
        }
      }
    ],
    services: [
      "Prêt d'ouvrages",
      "Consultation sur place",
      "Photocopie",
      "Impression",
      "Wifi gratuit",
      "Formation documentaire"
    ],
    contact: {
      phone: "034 81 68 30",
      email: "bibliotheque@univ-bejaia.dz"
    }
  },
  technology: {
    name: "Bibliothèque de Technologie",
    description: "Bibliothèque spécialisée en sciences et technologie",
    location: "Campus Targa Ouzemour",
    hours: {
      weekdays: "8h00 - 16h00",
      weekend: "Fermé"
    },
    capacity: "300 places",
    resources: [
      {
        name: "Collection Technique",
        icon: Book,
        description: "Ouvrages spécialisés en technologie",
        details: {
          volumes: "25,000+ ouvrages",
          languages: ["Français", "Anglais"],
          subjects: ["Informatique", "Électronique", "Mécanique", "Génie Civil"]
        }
      }
    ],
    services: [
      "Consultation sur place",
      "Photocopie",
      "Wifi gratuit",
      "Salle de lecture"
    ],
    contact: {
      phone: "034 81 68 32",
      email: "biblio.tech@univ-bejaia.dz"
    }
  },
  sciences: {
    name: "Bibliothèque des Sciences",
    description: "Bibliothèque spécialisée en sciences exactes",
    location: "Campus Targa Ouzemour",
    hours: {
      weekdays: "8h00 - 16h00",
      weekend: "Fermé"
    },
    capacity: "250 places",
    resources: [
      {
        name: "Collection Scientifique",
        icon: Book,
        description: "Ouvrages spécialisés en sciences",
        details: {
          volumes: "20,000+ ouvrages",
          languages: ["Français", "Anglais"],
          subjects: ["Mathématiques", "Physique", "Chimie", "Biologie"]
        }
      }
    ],
    services: [
      "Consultation sur place",
      "Photocopie",
      "Wifi gratuit",
      "Salle de lecture"
    ],
    contact: {
      phone: "034 81 68 33",
      email: "biblio.sciences@univ-bejaia.dz"
    }
  },
  medical: {
    name: "Bibliothèque des Sciences Médicales",
    description: "Bibliothèque spécialisée en médecine et sciences de la santé",
    location: "Campus Aboudaou",
    hours: {
      weekdays: "8h00 - 16h00",
      weekend: "Fermé"
    },
    capacity: "400 places",
    resources: [
      {
        name: "Collection Médicale",
        icon: Book,
        description: "Ouvrages spécialisés en médecine",
        details: {
          volumes: "20,000+ ouvrages",
          languages: ["Français", "Anglais"],
          subjects: ["Médecine", "Pharmacie", "Biologie"]
        }
      },
      {
        name: "Périodiques",
        icon: BookOpen,
        description: "Revues médicales et scientifiques",
        details: {
          journals: "200+ abonnements",
          access: "Consultation sur place",
          archives: "10 dernières années"
        }
      },
      {
        name: "Base de Données Médicales",
        icon: Database,
        description: "Accès aux ressources médicales en ligne",
        details: {
          databases: ["PubMed", "Medline", "ClinicalKey"],
          content: ["Articles médicaux", "Cas cliniques", "Protocoles"]
        }
      }
    ],
    services: [
      "Consultation sur place",
      "Recherche bibliographique",
      "Photocopie",
      "Wifi gratuit",
      "Formation aux bases de données"
    ],
    contact: {
      phone: "034 81 68 31",
      email: "biblio.medical@univ-bejaia.dz"
    }
  },
  law: {
    name: "Bibliothèque de Droit",
    description: "Bibliothèque spécialisée en droit et sciences politiques",
    location: "Campus Aboudaou",
    hours: {
      weekdays: "8h00 - 16h00",
      weekend: "Fermé"
    },
    capacity: "200 places",
    resources: [
      {
        name: "Collection Juridique",
        icon: Book,
        description: "Ouvrages spécialisés en droit",
        details: {
          volumes: "15,000+ ouvrages",
          languages: ["Français", "Arabe"],
          subjects: ["Droit", "Sciences Politiques", "Relations Internationales"]
        }
      }
    ],
    services: [
      "Consultation sur place",
      "Photocopie",
      "Wifi gratuit",
      "Salle de lecture"
    ],
    contact: {
      phone: "034 81 68 34",
      email: "biblio.droit@univ-bejaia.dz"
    }
  },
  letters: {
    name: "Bibliothèque des Lettres",
    description: "Bibliothèque spécialisée en lettres et langues",
    location: "Campus Aboudaou",
    hours: {
      weekdays: "8h00 - 16h00",
      weekend: "Fermé"
    },
    capacity: "250 places",
    resources: [
      {
        name: "Collection Littéraire",
        icon: Book,
        description: "Ouvrages spécialisés en lettres",
        details: {
          volumes: "18,000+ ouvrages",
          languages: ["Français", "Arabe", "Anglais", "Espagnol"],
          subjects: ["Littérature", "Linguistique", "Traduction", "Civilisation"]
        }
      }
    ],
    services: [
      "Consultation sur place",
      "Photocopie",
      "Wifi gratuit",
      "Salle de lecture"
    ],
    contact: {
      phone: "034 81 68 35",
      email: "biblio.lettres@univ-bejaia.dz"
    }
  },
  elKseur: {
    name: "Bibliothèque d'El Kseur",
    description: "Bibliothèque du campus d'El Kseur",
    location: "Campus El Kseur",
    hours: {
      weekdays: "8h00 - 16h00",
      weekend: "Fermé"
    },
    capacity: "200 places",
    resources: [
      {
        name: "Collection Générale",
        icon: Book,
        description: "Ouvrages généraux et spécialisés",
        details: {
          volumes: "15,000+ ouvrages",
          languages: ["Français", "Arabe"],
          subjects: ["Sciences", "Technologie", "Littérature"]
        }
      }
    ],
    services: [
      "Consultation sur place",
      "Photocopie",
      "Wifi gratuit",
      "Salle de lecture"
    ],
    contact: {
      phone: "034 81 68 36",
      email: "biblio.elkseur@univ-bejaia.dz"
    }
  }
};

const LibrariesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("central");

  // Group libraries by campus
  const campusGroups = {
    "Targa Ouzemour": ["central", "technology", "sciences"],
    "Aboudaou": ["medical", "law", "letters"],
    "El Kseur": ["elKseur"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 hover:bg-slate-100 dark:hover:bg-slate-800"
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
            <Library className="w-4 h-4 mr-2" />
            Bibliothèques
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            Nos Bibliothèques
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Découvrez les ressources et services de nos bibliothèques universitaires
          </p>
        </motion.div>

        {/* Campus Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            {Object.keys(campusGroups).map((campus) => (
              <Button
                key={campus}
                variant="ghost"
                className={`px-4 py-2 rounded-md transition-all ${
                  campusGroups[campus].includes(activeTab)
                    ? "bg-white dark:bg-slate-700 shadow-sm"
                    : "hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveTab(campusGroups[campus][0])}
              >
                {campus}
              </Button>
            ))}
          </div>
        </div>

        {/* Libraries Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {Object.entries(librariesData).map(([id, library]) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 transition-all duration-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Library className="w-4 h-4" />
                    <span className="truncate">{library.name}</span>
                  </motion.div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(librariesData).map(([id, library]) => (
            <TabsContent
              key={id}
              value={id}
              className="mt-6"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-8">
                  {/* Library Info */}
                  <Card className="overflow-hidden border-2 border-slate-100 dark:border-slate-700">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl font-bold">{library.name}</CardTitle>
                          <CardDescription className="text-lg mt-2">{library.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-sm px-3 py-1">
                          {library.location}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                          >
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Horaires d'ouverture</h3>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                <p>Semaine: {library.hours.weekdays}</p>
                                <p>Weekend: {library.hours.weekend}</p>
                              </div>
                            </div>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                          >
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Capacité</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{library.capacity}</p>
                            </div>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                          >
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Contact</h3>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                <p>{library.contact.phone}</p>
                                <p>{library.contact.email}</p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-4">Services disponibles</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {library.services.map((service) => (
                              <motion.div
                                key={service}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-sm">{service}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resources */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {library.resources.map((resource, idx) => (
                      <motion.div
                        key={resource.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full border-2 border-slate-100 dark:border-slate-700">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <resource.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <CardTitle className="text-lg">{resource.name}</CardTitle>
                            </div>
                            <CardDescription className="mt-2">{resource.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {Object.entries(resource.details).map(([key, value]) => (
                                <div key={key}>
                                  <h4 className="text-sm font-medium mb-2 capitalize text-slate-700 dark:text-slate-300">
                                    {key}
                                  </h4>
                                  {Array.isArray(value) ? (
                                    <div className="flex flex-wrap gap-2">
                                      {value.map((item) => (
                                        <Badge
                                          key={item}
                                          variant="secondary"
                                          className="bg-slate-100 dark:bg-slate-800"
                                        >
                                          {item}
                                        </Badge>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                      {value}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default LibrariesPage; 