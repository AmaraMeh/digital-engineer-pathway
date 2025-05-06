import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, ChevronLeft, ChevronRight, 
  Code, Stethoscope, Microscope, Calculator, Library, LineChart, Book
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const faculties = [
  {
    id: "technology",
    name: "Faculté de Technologie",
    icon: Code,
    description: "Formation en sciences de l'ingénieur et technologies",
    stats: {
      students: 8558,
      teachers: 456
    },
    departments: [
      "Génie des procédés",
      "Génie électrique",
      "Génie mécanique",
      "Génie civil",
      "Architecture"
    ],
    color: "blue",
    location: "Campus Targa Ouzemour"
  },
  {
    id: "sciences_exactes",
    name: "Faculté des Sciences Exactes",
    icon: Calculator,
    description: "La Faculté des Sciences Exactes offre des formations conduisant aux diplômes de Licence, Master et Doctorat dans les domaines des Sciences de la Matière et des Mathématiques et Informatique.",
    stats: {
      students: 3221,
      teachers: 220
    },
    departments: [
      "Mathématiques",
      "Informatique",
      "Recherche opérationnelle",
      "Chimie",
      "Physique"
    ],
    color: "indigo",
    location: "Campus Targa Ouzemour"
  },
  {
    id: "sciences_nature",
    name: "Faculté des Sciences de la Nature et de la Vie",
    icon: Microscope,
    description: "Formation en sciences biologiques et environnementales",
    stats: {
      students: 3393,
      teachers: 262
    },
    departments: [
      "Sciences biologiques",
      "Hydrobiologie marine et continentale",
      "Biotechnologies",
      "Sciences alimentaires",
      "Écologie et environnement"
    ],
    color: "emerald",
    location: "Campus Targa Ouzemour"
  },
  {
    id: "medecine",
    name: "Faculté de Médecine",
    icon: Stethoscope,
    description: "Formation en sciences médicales et pharmaceutiques",
    stats: {
      students: 1207,
      teachers: 82
    },
    departments: [
      "Médecine",
      "Pharmacie"
    ],
    color: "green",
    location: "Campus Aboudaou"
  },
  {
    id: "droit",
    name: "Faculté de Droit et des Sciences Politiques",
    icon: Library,
    description: "Formation en sciences juridiques et politiques",
    stats: {
      students: 4638,
      teachers: 168
    },
    departments: [
      "Enseignements de base en droit",
      "Droit privé",
      "Droit public"
    ],
    color: "amber",
    location: "Campus Aboudaou"
  },
  {
    id: "sciences_eco",
    name: "Faculté des Sciences Économiques, Commerciales et des Sciences de Gestion",
    icon: LineChart,
    description: "Formation en sciences économiques, commerciales et sciences de gestion",
    stats: {
      students: 6326,
      teachers: 240
    },
    departments: [
      "Sciences de gestion",
      "Sciences économiques",
      "Sciences commerciales",
      "Sciences financières et comptabilité"
    ],
    color: "rose",
    location: "Campus Aboudaou"
  },
  {
    id: "lettres_langues",
    name: "Faculté des Lettres et des Langues",
    icon: Book,
    description: "Avec plus de 3000 étudiants, la Faculté des Lettres et des Langues offre une grande variété de formations diplômantes en langues et littérature.",
    stats: {
      students: 3260,
      teachers: 228
    },
    departments: [
      "Langue et littérature arabes",
      "Langue et littérature françaises",
      "Langue et littérature anglaises",
      "Langue et culture amazighes",
      "Traduction et interprétariat"
    ],
    color: "yellow",
    location: "Campus Aboudaou"
  }
];

const FacultiesPage = () => {
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
              <Building2 className="w-4 h-4 mr-2" />
              Facultés
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Nos Facultés
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Découvrez nos facultés et leurs programmes de formation
            </p>
          </div>
        </motion.div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {faculties.map((faculty, idx) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group"
            >
              <Link 
                to={`/ubejaia-guide/faculties/${faculty.id}`}
                className="block h-full transform transition-all duration-300 hover:scale-[1.02]"
              >
                <Card className={`h-full hover:shadow-lg transition-all border-t-4 border-t-${faculty.color}-500`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-lg bg-${faculty.color}-50 dark:bg-${faculty.color}-900/20`}>
                        <faculty.icon className={`w-6 h-6 text-${faculty.color}-600 dark:text-${faculty.color}-400`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {faculty.name}
                        </CardTitle>
                        <CardDescription>{faculty.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Statistiques
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Étudiants</p>
                            <p className="text-lg font-semibold">{faculty.stats.students}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Enseignants</p>
                            <p className="text-lg font-semibold">{faculty.stats.teachers}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Départements
                        </h3>
                        <div className="space-y-2">
                          {faculty.departments.map((dept, index) => (
                            <div 
                              key={index}
                              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-between"
                            >
                              <span className="text-sm">{dept}</span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Building2 className="w-4 h-4" />
                        {faculty.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultiesPage; 