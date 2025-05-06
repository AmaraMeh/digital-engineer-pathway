import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home, MapPin, Phone, Mail, Users,
  Wifi, Coffee, Bus, Bed, Bath,
  Tv, Utensils, Building,
  LucideIcon
} from "lucide-react";

interface FacilityDetails {
  [key: string]: string | string[];
}

interface Facility {
  name: string;
  icon: LucideIcon;
  description: string;
  details: FacilityDetails;
}

interface Contact {
  phone: string;
  email: string;
}

interface Residence {
  name: string;
  description: string;
  location: string;
  capacity: string;
  type: string;
  facilities: Facility[];
  contact: Contact;
}

interface ResidenceData {
  [key: string]: Residence;
}

const residenceData: ResidenceData = {
  campus1: {
    name: "Résidence Universitaire Campus 1",
    description: "Résidence principale pour étudiants",
    location: "Campus Targa Ouzemour",
    capacity: "2000 lits",
    type: "Mixte",
    facilities: [
      {
        name: "Chambres Standard",
        icon: Bed,
        description: "Chambres doubles avec équipements de base",
        details: {
          type: "Double",
          furniture: ["Lits", "Bureaux", "Armoires"],
          amenities: ["Chauffage", "Eau chaude"]
        }
      },
      {
        name: "Sanitaires",
        icon: Bath,
        description: "Installations sanitaires communes",
        details: {
          type: "Commun",
          facilities: ["Douches", "Toilettes", "Lavabos"],
          maintenance: "Nettoyage quotidien"
        }
      },
      {
        name: "Espaces Communs",
        icon: Tv,
        description: "Zones de détente et d'étude",
        details: {
          spaces: ["Salle TV", "Salle d'étude", "Buanderie"],
          hours: "24h/24"
        }
      },
      {
        name: "Restauration",
        icon: Utensils,
        description: "Service de restauration sur place",
        details: {
          meals: ["Petit déjeuner", "Déjeuner", "Dîner"],
          hours: "6h00 - 22h00"
        }
      }
    ],
    contact: {
      phone: "034 81 68 25",
      email: "residence1@univ-bejaia.dz"
    }
  },
  campus2: {
    name: "Résidence Universitaire Campus 2",
    description: "Résidence moderne à Aboudaou",
    location: "Campus Aboudaou",
    capacity: "1500 lits",
    type: "Non-mixte",
    facilities: [
      {
        name: "Chambres Confort",
        icon: Bed,
        description: "Chambres individuelles et doubles modernes",
        details: {
          types: ["Individual", "Double"],
          furniture: ["Lits", "Bureaux", "Armoires", "Étagères"],
          amenities: ["Climatisation", "Chauffage", "Eau chaude"]
        }
      },
      {
        name: "Sanitaires Privés",
        icon: Bath,
        description: "Salles de bain privées",
        details: {
          type: "Privé",
          facilities: ["Douche", "Toilette", "Lavabo"],
          maintenance: "Service hebdomadaire"
        }
      },
      {
        name: "Espaces Modernes",
        icon: Tv,
        description: "Espaces communs équipés",
        details: {
          spaces: ["Salle multimédia", "Salle de sport", "Cafétéria"],
          hours: "24h/24"
        }
      }
    ],
    contact: {
      phone: "034 81 68 26",
      email: "residence2@univ-bejaia.dz"
    }
  }
};

const HousingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Home className="w-4 h-4 mr-2" />
            Hébergement
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            Résidences Universitaires
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Découvrez nos résidences universitaires et leurs installations
          </p>
        </motion.div>

        {/* Residences Tabs */}
        <Tabs defaultValue="campus1" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto">
            <TabsTrigger value="campus1">Campus 1</TabsTrigger>
            <TabsTrigger value="campus2">Campus 2</TabsTrigger>
          </TabsList>

          {Object.entries(residenceData).map(([id, residence]) => (
            <TabsContent key={id} value={id}>
              <div className="grid gap-6">
                {/* Residence Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>{residence.name}</CardTitle>
                    <CardDescription>{residence.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{residence.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-slate-500" />
                          <span>Capacité: {residence.capacity}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-slate-500" />
                          <span>Type: {residence.type}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{residence.contact.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{residence.contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Facilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {residence.facilities.map((facility, idx) => (
                    <motion.div
                      key={facility.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <facility.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            <CardTitle className="text-lg">{facility.name}</CardTitle>
                          </div>
                          <CardDescription>{facility.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {Object.entries(facility.details).map(([key, value]) => (
                              <div key={key}>
                                <h4 className="text-sm font-medium mb-2 capitalize">
                                  {key}
                                </h4>
                                {Array.isArray(value) ? (
                                  <div className="flex flex-wrap gap-2">
                                    {value.map((item) => (
                                      <Badge key={item} variant="outline">
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default HousingPage; 