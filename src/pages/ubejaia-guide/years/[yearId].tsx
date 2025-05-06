import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, GraduationCap, FileText, Users, Calendar,
  BookOpen, Library, MapPin, HelpCircle, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data - This would come from your backend in a real application
const yearsData = {
  l1: {
    name: "Licence 1",
    description: "Première année de licence - Année de transition et d'adaptation",
    commonCourses: [
      { id: "math1", name: "Mathématiques 1", description: "Algèbre et analyse" },
      { id: "physique1", name: "Physique 1", description: "Mécanique et thermodynamique" },
      { id: "chimie1", name: "Chimie 1", description: "Chimie générale" },
      { id: "info1", name: "Informatique 1", description: "Introduction à l'informatique" },
    ],
    departments: {
      informatique: [
        { id: "algo1", name: "Algorithmique 1", description: "Introduction aux algorithmes" },
        { id: "prog1", name: "Programmation 1", description: "Introduction à la programmation en C" },
      ],
      mathematiques: [
        { id: "algebre1", name: "Algèbre 1", description: "Structures algébriques" },
        { id: "analyse1", name: "Analyse 1", description: "Fonctions réelles" },
      ],
    },
    resources: [
      { id: "syllabus", name: "Syllabus", type: "document" },
      { id: "tps", name: "Travaux Pratiques", type: "exercises" },
      { id: "exams", name: "Anciens Examens", type: "exams" },
    ],
  },
  // Add more years as needed
};

const YearPage = () => {
  const { yearId } = useParams();
  const navigate = useNavigate();
  const year = yearsData[yearId as keyof typeof yearsData];

  if (!year) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Année non trouvée</p>
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
            {year.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {year.description}
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">
              <Book className="w-4 h-4 mr-2" />
              Cours
            </TabsTrigger>
            <TabsTrigger value="resources">
              <FileText className="w-4 h-4 mr-2" />
              Ressources
            </TabsTrigger>
            <TabsTrigger value="info">
              <HelpCircle className="w-4 h-4 mr-2" />
              Informations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            {/* Common Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Cours Communs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {year.commonCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle>{course.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{course.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Department-specific Courses */}
            {Object.entries(year.departments).map(([dept, courses]) => (
              <Card key={dept}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <CardTitle>{course.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{course.description}</CardDescription>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {year.resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <CardTitle>{resource.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Accédez aux {resource.name.toLowerCase()} de {year.name}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Calendrier Académique</h3>
                    <p className="text-muted-foreground">
                      Rentrée: Septembre
                      <br />
                      Examens: Janvier
                      <br />
                      Rattrapages: Février
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Conseils pour la Réussite</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Assister régulièrement aux cours</li>
                      <li>Prendre des notes détaillées</li>
                      <li>Participer aux travaux pratiques</li>
                      <li>Réviser régulièrement</li>
                      <li>Utiliser les ressources disponibles</li>
                    </ul>
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

export default YearPage; 