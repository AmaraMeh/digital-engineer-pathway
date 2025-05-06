import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, ChevronLeft, ChevronRight, 
  Library, Bus, Home, Utensils, Heart,
  GraduationCap, Trophy, Microscope, Music
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const activities = [
  {
    id: "libraries",
    name: "Bibliothèques Universitaires",
    icon: Library,
    description: "Les bibliothèques universitaires offrent un complément indispensable aux études. L'Université de Béjaïa met à la disposition de ses étudiants sept (07) bibliothèques avec des salles de lecture et un catalogue en ligne pour faciliter la recherche documentaire.",
    link: "http://recherche.univ-bejaia.dz/",
    color: "blue"
  },
  {
    id: "sports",
    name: "Activités Sportives",
    icon: Trophy,
    description: "Le sport universitaire est organisé autour des Clubs Sportifs Amateurs Universitaires (CSAU) sous l'égide de la sous-direction des activités scientifiques, culturelles et sportives de l'université.",
    details: {
      facilities: [
        "Salle omnisport couverte",
        "Salle de musculation",
        "Terrains de proximité multidisciplinaires"
      ],
      stats: {
        "Clubs scientifiques": 14,
        "Associations culturelles": 6,
        "Clubs Sportifs Amateurs Universitaires (C.S.A.U)": 1
      }
    },
    color: "green"
  },
  {
    id: "scientific",
    name: "Activités Scientifiques",
    icon: Microscope,
    description: "Les activités scientifiques sont proposées par les clubs scientifiques agréés et qui ont pour objectifs de stimuler et promouvoir tout projet, action ou manifestation à caractère scientifique présenté par les étudiants de l'université.",
    color: "indigo"
  },
  {
    id: "cultural",
    name: "Activités Culturelles",
    icon: Music,
    description: "Les activités culturelles sont proposées par les associations culturelles agréées. L'étudiant peut adhérer à une association de son choix pour activer dans les différents domaines culturels tels que : la musique, le théâtre, la photographie, ...etc.",
    color: "purple"
  },
  {
    id: "medical",
    name: "Centres de Premiers Soins",
    icon: Heart,
    description: "Des centres médicaux au sein des campus universitaires et des résidences universitaires assurent la prise en charge en premiers soins des étudiants.",
    color: "red"
  },
  {
    id: "housing",
    name: "Hébergement",
    icon: Home,
    description: "L'hébergement des étudiants s'effectue en chambres collectives dans des résidences qui offrent tous les moyens nécessaires pour étudier dans des conditions sereines et adéquates. Ces résidences sont implantées à Béjaïa, El Kseur et Amizour.",
    color: "orange"
  },
  {
    id: "services",
    name: "Services Universitaires",
    icon: GraduationCap,
    description: "Outre les études, l'État offre aux étudiants algériens et étrangers la possibilité de bénéficier des services des œuvres universitaires: hébergement, bourse, restauration et transport.",
    details: {
      services: [
        {
          name: "Bourse",
          description: "La bourse est un moyen financier octroyé aux étudiants durant la période de leurs études."
        },
        {
          name: "Restauration",
          description: "Muni de la carte d'étudiant et d'un ticket de restauration, l'étudiant peut bénéficier d'un repas au niveau des restaurants universitaires."
        },
        {
          name: "Transport",
          description: "L'étudiant inscrit peut bénéficier du transport universitaire en payant un abonnement annuel"
        }
      ],
      link: "http://dou-bejaia.dz"
    },
    color: "yellow"
  }
];

const StudentLifePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/ubejaia-guide")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour au guide
          </Button>
          
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-4 h-4 mr-2" />
              Vie Étudiante
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Activités et Services Estudiantins
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Découvrez les activités et services disponibles pour les étudiants
            </p>
          </div>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group"
            >
              <Card className={`h-full hover:shadow-lg transition-all border-t-4 border-t-${activity.color}-500`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg bg-${activity.color}-50 dark:bg-${activity.color}-900/20`}>
                      <activity.icon className={`w-6 h-6 text-${activity.color}-600 dark:text-${activity.color}-400`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {activity.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-300">
                      {activity.description}
                    </p>

                    {activity.details?.facilities && (
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Infrastructures disponibles
                        </h3>
                        <div className="space-y-2">
                          {activity.details.facilities.map((facility, index) => (
                            <div 
                              key={index}
                              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-between"
                            >
                              <span className="text-sm">{facility}</span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activity.details?.stats && (
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Statistiques
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(activity.details.stats).map(([key, value], index) => (
                            <div 
                              key={index}
                              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-between"
                            >
                              <span className="text-sm">{key}</span>
                              <Badge variant="secondary">{value}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activity.details?.services && (
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Services disponibles
                        </h3>
                        <div className="space-y-2">
                          {activity.details.services.map((service, index) => (
                            <div 
                              key={index}
                              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                            >
                              <h4 className="font-medium mb-1">{service.name}</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {service.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activity.link && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(activity.link, '_blank')}
                      >
                        En savoir plus
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentLifePage; 