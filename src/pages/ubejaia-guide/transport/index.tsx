import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bus, MapPin, Clock, Calendar, AlertCircle,
  LucideIcon
} from "lucide-react";

interface BusStop {
  name: string;
  location: string;
  lines: string[];
}

interface BusLine {
  name: string;
  icon: LucideIcon;
  description: string;
  schedule: {
    weekdays: string[];
    weekend: string[];
  };
  stops: BusStop[];
  frequency: string;
  notes?: string;
}

interface TransportData {
  [key: string]: BusLine;
}

const transportData: TransportData = {
  line1: {
    name: "Ligne 1: Targa - Centre Ville",
    icon: Bus,
    description: "Dessert le campus Targa Ouzemour et le centre-ville",
    schedule: {
      weekdays: ["7h00", "8h30", "10h00", "12h00", "13h30", "15h00", "16h30", "18h00"],
      weekend: ["8h00", "10h00", "14h00", "16h00"]
    },
    stops: [
      {
        name: "Campus Targa",
        location: "Entrée principale du campus",
        lines: ["1", "3"]
      },
      {
        name: "Résidence Universitaire",
        location: "Arrêt RU Campus 1",
        lines: ["1", "2"]
      },
      {
        name: "Centre Ville",
        location: "Place Saïd Mekbel",
        lines: ["1", "2", "3"]
      }
    ],
    frequency: "Toutes les 90 minutes",
    notes: "Service réduit pendant les vacances"
  },
  line2: {
    name: "Ligne 2: Aboudaou - Centre Ville",
    icon: Bus,
    description: "Relie le campus Aboudaou au centre-ville",
    schedule: {
      weekdays: ["7h30", "9h00", "10h30", "12h30", "14h00", "15h30", "17h00", "18h30"],
      weekend: ["8h30", "10h30", "14h30", "16h30"]
    },
    stops: [
      {
        name: "Campus Aboudaou",
        location: "Entrée principale",
        lines: ["2", "3"]
      },
      {
        name: "Résidence Campus 2",
        location: "Arrêt RU Campus 2",
        lines: ["2"]
      },
      {
        name: "Centre Ville",
        location: "Place Saïd Mekbel",
        lines: ["1", "2", "3"]
      }
    ],
    frequency: "Toutes les 90 minutes"
  },
  line3: {
    name: "Ligne 3: Targa - Aboudaou",
    icon: Bus,
    description: "Liaison directe entre les deux campus",
    schedule: {
      weekdays: ["7h15", "8h45", "10h15", "12h15", "13h45", "15h15", "16h45", "18h15"],
      weekend: ["8h15", "10h15", "14h15", "16h15"]
    },
    stops: [
      {
        name: "Campus Targa",
        location: "Entrée principale du campus",
        lines: ["1", "3"]
      },
      {
        name: "Campus Aboudaou",
        location: "Entrée principale",
        lines: ["2", "3"]
      }
    ],
    frequency: "Toutes les 90 minutes",
    notes: "Service express entre les campus"
  }
};

const TransportPage = () => {
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
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Bus className="w-4 h-4 mr-2" />
            Transport
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Transport Universitaire
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Horaires et lignes de bus universitaires
          </p>
        </motion.div>

        {/* Bus Lines Tabs */}
        <Tabs defaultValue="line1" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto">
            <TabsTrigger value="line1">Ligne 1</TabsTrigger>
            <TabsTrigger value="line2">Ligne 2</TabsTrigger>
            <TabsTrigger value="line3">Ligne 3</TabsTrigger>
          </TabsList>

          {Object.entries(transportData).map(([id, line]) => (
            <TabsContent key={id} value={id}>
              <div className="grid gap-6">
                {/* Line Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <line.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <CardTitle>{line.name}</CardTitle>
                    </div>
                    <CardDescription>{line.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Schedule */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Horaires</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Jours de semaine</h4>
                            <div className="flex flex-wrap gap-2">
                              {line.schedule.weekdays.map((time) => (
                                <Badge key={time} variant="outline">
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Weekend</h4>
                            <div className="flex flex-wrap gap-2">
                              {line.schedule.weekend.map((time) => (
                                <Badge key={time} variant="outline">
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="w-4 h-4 mr-2" />
                          Fréquence: {line.frequency}
                        </div>
                        {line.notes && (
                          <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {line.notes}
                          </div>
                        )}
                      </div>

                      {/* Stops */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Arrêts</h3>
                        <div className="space-y-4">
                          {line.stops.map((stop) => (
                            <div
                              key={stop.name}
                              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                            >
                              <h4 className="font-medium mb-2">{stop.name}</h4>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  {stop.location}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {stop.lines.map((l) => (
                                    <Badge key={l} variant="secondary">
                                      Ligne {l}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TransportPage; 