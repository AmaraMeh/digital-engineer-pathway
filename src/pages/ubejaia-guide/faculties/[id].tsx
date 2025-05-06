import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2, Users, BookOpen, ChevronRight, MapPin,
  Code, Stethoscope, Microscope, Book, GraduationCap,
  Clock, Calendar, Phone, Mail
} from "lucide-react";

const facultyData = {
  technology: {
    name: "Faculté de Technologie",
    icon: Code,
    description: "Sciences et technologies de l'ingénieur",
    color: "blue",
    location: "Campus Targa Ouzemour",
    contact: {
      phone: "034 81 68 20",
      email: "tech@univ-bejaia.dz",
      address: "Route de Targa Ouzemour, 06000"
    },
    stats: {
      students: 8558,
      teachers: 456,
      staff: 141
    },
    departments: [
      {
        name: "Génie des Procédés",
        code: "GP",
        programs: [
          {
            name: "Tronc Commun",
            code: "TCL01",
            year: "L1",
            description: "Première année de formation commune"
          },
          {
            name: "Génie des Procédés",
            code: "LAL01",
            year: "L2-L3",
            description: "Spécialisation en génie des procédés"
          },
          {
            name: "Génie Chimique",
            code: "MAL01",
            year: "M1-M2",
            description: "Master en génie chimique"
          }
        ]
      },
      {
        name: "Génie Électrique",
        code: "GE",
        programs: [
          {
            name: "Tronc Commun",
            code: "TCL01",
            year: "L1",
            description: "Première année de formation commune"
          },
          {
            name: "Électrotechnique",
            code: "LAL02",
            year: "L2-L3",
            description: "Spécialisation en électrotechnique"
          },
          {
            name: "Électronique",
            code: "LAL03",
            year: "L2-L3",
            description: "Spécialisation en électronique"
          }
        ]
      }
    ]
  },
  // Add other faculties data here...
};

const FacultyPage = () => {
  const { id } = useParams();
  const faculty = facultyData[id as keyof typeof facultyData];

  if (!faculty) {
    return <div>Faculty not found</div>;
  }

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
          <div className="text-center mb-8">
            <Badge className={`mb-4 px-4 py-1.5 text-sm bg-${faculty.color}-500/10 text-${faculty.color}-600 dark:text-${faculty.color}-400`}>
              <Building2 className="w-4 h-4 mr-2" />
              Faculté
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {faculty.name}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {faculty.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="w-8 h-8 mb-2 mx-auto text-blue-600 dark:text-blue-400" />
                  <p className="text-2xl font-bold">{faculty.stats.students}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Étudiants</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <GraduationCap className="w-8 h-8 mb-2 mx-auto text-purple-600 dark:text-purple-400" />
                  <p className="text-2xl font-bold">{faculty.stats.teachers}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Enseignants</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="w-8 h-8 mb-2 mx-auto text-pink-600 dark:text-pink-400" />
                  <p className="text-2xl font-bold">{faculty.stats.staff}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Personnel</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="departments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="departments">Départements</TabsTrigger>
            <TabsTrigger value="programs">Formations</TabsTrigger>
            <TabsTrigger value="info">Informations</TabsTrigger>
          </TabsList>

          <TabsContent value="departments" className="space-y-6">
            {faculty.departments.map((dept, idx) => (
              <motion.div
                key={dept.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{dept.name}</CardTitle>
                    <CardDescription>Code département: {dept.code}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dept.programs.map((program) => (
                        <div
                          key={program.code}
                          className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{program.name}</h4>
                            <Badge>{program.year}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {program.description}
                          </p>
                          <div className="mt-2">
                            <Badge variant="outline">Code: {program.code}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>Parcours de Formation</CardTitle>
                <CardDescription>
                  Organisation des études selon le système LMD
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <h4 className="font-medium mb-2">Licence (BAC+3)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>L1: Tronc commun</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>L2-L3: Spécialisation</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <h4 className="font-medium mb-2">Master (BAC+5)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>M1: Première année master</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>M2: Deuxième année master</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Informations Pratiques</CardTitle>
                <CardDescription>
                  Coordonnées et localisation de la faculté
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <h4 className="font-medium mb-4">Contact</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{faculty.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{faculty.contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{faculty.contact.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <h4 className="font-medium mb-4">Localisation</h4>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span>{faculty.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyPage; 