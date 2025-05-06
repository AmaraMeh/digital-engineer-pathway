import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coffee, MapPin, Clock, Users, Utensils,
  Pizza, Sandwich, Apple, LucideIcon
} from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price?: string;
  category: string;
}

interface Restaurant {
  name: string;
  description: string;
  location: string;
  type: string;
  icon: LucideIcon;
  capacity: string;
  hours: {
    weekdays: string;
    weekend: string;
  };
  menu: {
    [key: string]: MenuItem[];
  };
  services: string[];
}

interface RestaurantData {
  [key: string]: Restaurant;
}

const restaurantData: RestaurantData = {
  ru1: {
    name: "Restaurant Universitaire Targa",
    description: "Restaurant principal du campus Targa Ouzemour",
    location: "Campus Targa Ouzemour",
    type: "Restaurant Universitaire",
    icon: Utensils,
    capacity: "1000 places",
    hours: {
      weekdays: "6h30 - 20h00",
      weekend: "7h30 - 19h00"
    },
    menu: {
      "Petit Déjeuner": [
        {
          name: "Petit Déjeuner Complet",
          description: "Café/Thé, Pain, Beurre, Confiture, Fromage",
          category: "Petit Déjeuner"
        },
        {
          name: "Petit Déjeuner Express",
          description: "Café/Thé, Viennoiserie",
          category: "Petit Déjeuner"
        }
      ],
      "Déjeuner": [
        {
          name: "Menu du Jour",
          description: "Entrée, Plat principal, Dessert",
          category: "Déjeuner"
        },
        {
          name: "Menu Végétarien",
          description: "Option végétarienne complète",
          category: "Déjeuner"
        }
      ],
      "Dîner": [
        {
          name: "Dîner Complet",
          description: "Soupe, Plat principal, Dessert",
          category: "Dîner"
        },
        {
          name: "Dîner Léger",
          description: "Soupe et Sandwich",
          category: "Dîner"
        }
      ]
    },
    services: [
      "Service à table",
      "Self-service",
      "Micro-ondes",
      "Fontaines à eau",
      "Cafétéria"
    ]
  },
  ru2: {
    name: "Restaurant Universitaire Aboudaou",
    description: "Restaurant moderne du campus Aboudaou",
    location: "Campus Aboudaou",
    type: "Restaurant Universitaire",
    icon: Utensils,
    capacity: "800 places",
    hours: {
      weekdays: "7h00 - 19h30",
      weekend: "8h00 - 18h30"
    },
    menu: {
      "Petit Déjeuner": [
        {
          name: "Formule Classique",
          description: "Café/Thé, Pain, Viennoiserie, Fruits",
          category: "Petit Déjeuner"
        },
        {
          name: "Formule Santé",
          description: "Thé, Céréales, Yaourt, Fruits frais",
          category: "Petit Déjeuner"
        }
      ],
      "Déjeuner": [
        {
          name: "Menu Traditionnel",
          description: "Entrée, Plat du jour, Dessert",
          category: "Déjeuner"
        },
        {
          name: "Menu Équilibré",
          description: "Salade composée, Protéines, Légumes",
          category: "Déjeuner"
        }
      ],
      "Dîner": [
        {
          name: "Dîner Standard",
          description: "Entrée chaude, Plat principal, Fruit",
          category: "Dîner"
        },
        {
          name: "Option Légère",
          description: "Potage, Sandwich gourmet, Yaourt",
          category: "Dîner"
        }
      ]
    },
    services: [
      "Self-service moderne",
      "Espace café",
      "Salades bar",
      "Micro-ondes",
      "Distributeurs automatiques"
    ]
  },
  cafe1: {
    name: "Cafétéria Sciences",
    description: "Cafétéria de la faculté des sciences",
    location: "Faculté des Sciences",
    type: "Cafétéria",
    icon: Coffee,
    capacity: "100 places",
    hours: {
      weekdays: "8h00 - 17h00",
      weekend: "Fermé"
    },
    menu: {
      "Boissons": [
        {
          name: "Café",
          description: "Expresso, Américain, Cappuccino",
          category: "Boissons",
          price: "30-50 DA"
        },
        {
          name: "Thé",
          description: "Thé noir, Thé vert, Infusions",
          category: "Boissons",
          price: "30 DA"
        }
      ],
      "Snacks": [
        {
          name: "Sandwichs",
          description: "Variété de sandwichs frais",
          category: "Snacks",
          price: "150-200 DA"
        },
        {
          name: "Pâtisseries",
          description: "Croissants, Gâteaux, Cookies",
          category: "Snacks",
          price: "50-100 DA"
        }
      ]
    },
    services: [
      "Service rapide",
      "Wifi gratuit",
      "Espace détente",
      "Terrasse"
    ]
  }
};

const RestaurantPage = () => {
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
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Utensils className="w-4 h-4 mr-2" />
            Restauration
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
            Restaurants Universitaires
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Découvrez nos restaurants et cafétérias sur les campus
          </p>
        </motion.div>

        {/* Restaurants Tabs */}
        <Tabs defaultValue="ru1" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto">
            <TabsTrigger value="ru1">RU Targa</TabsTrigger>
            <TabsTrigger value="ru2">RU Aboudaou</TabsTrigger>
            <TabsTrigger value="cafe1">Cafétéria</TabsTrigger>
          </TabsList>

          {Object.entries(restaurantData).map(([id, restaurant]) => (
            <TabsContent key={id} value={id}>
              <div className="grid gap-6">
                {/* Restaurant Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <restaurant.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <CardTitle>{restaurant.name}</CardTitle>
                    </div>
                    <CardDescription>{restaurant.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{restaurant.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-slate-500" />
                          <span>Capacité: {restaurant.capacity}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-slate-500" />
                            <span>Horaires:</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            <p className="text-sm">Semaine: {restaurant.hours.weekdays}</p>
                            <p className="text-sm">Weekend: {restaurant.hours.weekend}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-3">Services</h3>
                        <div className="flex flex-wrap gap-2">
                          {restaurant.services.map((service) => (
                            <Badge key={service} variant="outline">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Menu */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(restaurant.menu).map(([category, items], idx) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {items.map((item) => (
                              <div
                                key={item.name}
                                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  {item.price && (
                                    <Badge variant="secondary">{item.price}</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {item.description}
                                </p>
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

export default RestaurantPage; 