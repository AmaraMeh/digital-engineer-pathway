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
const departmentsData = {
  informatique: {
    name: "Informatique",
    description: "Le département d'informatique offre une formation complète en développement logiciel, réseaux, et systèmes d'information.",
    courses: {
      l1: [
        { id: "algo1", name: "Algorithmique 1", description: "Introduction aux algorithmes et structures de données" },
        { id: "prog1", name: "Programmation 1", description: "Introduction à la programmation en C" },
        { id: "math1", name: "Mathématiques 1", description: "Algèbre et analyse" },
      ],
      l2: [
        { id: "algo2", name: "Algorithmique 2", description: "Algorithmes avancés et complexité" },
        { id: "prog2", name: "Programmation 2", description: "Programmation orientée objet en Java" },
        { id: "bd", name: "Bases de données", description: "Conception et implémentation de bases de données" },
      ],
      l3: [
        { id: "web", name: "Développement Web", description: "Technologies web modernes" },
        { id: "reseau", name: "Réseaux", description: "Architecture des réseaux informatiques" },
        { id: "ia", name: "Intelligence Artificielle", description: "Introduction à l'IA et machine learning" },
      ],
    },
    resources: [
      { id: "syllabus", name: "Syllabus", type: "document" },
      { id: "tps", name: "Travaux Pratiques", type: "exercises" },
      { id: "exams", name: "Anciens Examens", type: "exams" },
    ],
  },
  // Add more departments as needed
};

const DepartmentPage = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const department = departmentsData[departmentId as keyof typeof departmentsData];

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Département non trouvé</p>
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
            {department.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {department.description}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(department.courses).map(([year, courses]) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        {year.toUpperCase()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className="p-2 rounded-lg hover:bg-muted cursor-pointer"
                          >
                            <h3 className="font-medium">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {course.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {department.resources.map((resource) => (
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
                        Accédez aux {resource.name.toLowerCase()} du département
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
                <CardTitle>Informations du Département</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Coordonnées</h3>
                    <p className="text-muted-foreground">
                      Faculté des Sciences Exactes
                      <br />
                      Université de Béjaïa
                      <br />
                      Tél: +213 34 21 21 21
                      <br />
                      Email: informatique@univ-bejaia.dz
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Horaires de Bureau</h3>
                    <p className="text-muted-foreground">
                      Lundi - Vendredi: 8h00 - 16h00
                    </p>
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

export default DepartmentPage; 