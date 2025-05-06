import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Book, Users, GraduationCap, Clock } from "lucide-react";
import { facultiesData } from "../[facultyId]";

const DepartmentPage = () => {
  const { facultyId, departmentId } = useParams();
  const navigate = useNavigate();

  const faculty = facultiesData[facultyId as keyof typeof facultiesData];
  const department = faculty?.departments.find(dept => dept.id === departmentId);

  if (!faculty || !department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Département non trouvé</p>
            <Button onClick={() => navigate(`/ubejaia-guide/faculties/${facultyId}`)} className="mt-4">
              Retour à la faculté
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
            onClick={() => navigate(`/ubejaia-guide/faculties/${facultyId}`)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour à {faculty.name}
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Book className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {department.name}
              </h1>
              <Badge variant="outline" className="mt-2">
                {department.code}
              </Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            {department.description}
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Programs */}
          <Card>
            <CardHeader>
              <CardTitle>Formations</CardTitle>
              <CardDescription>
                Programmes et spécialisations disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faculty.programs?.licenses && (
                  <div>
                    <h3 className="font-medium mb-2">Licence</h3>
                    <div className="space-y-2">
                      {Object.entries(faculty.programs.licenses).map(([name, data]) => (
                        <div key={name} className="p-3 rounded-lg bg-muted">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{name}</span>
                            <Badge variant="outline">{data.code}</Badge>
                          </div>
                          {data.specialties && (
                            <div className="flex flex-wrap gap-2">
                              {data.specialties.map(specialty => (
                                <Badge key={specialty} variant="secondary">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {faculty.programs?.masters && (
                  <div>
                    <h3 className="font-medium mb-2">Master</h3>
                    <div className="space-y-2">
                      {Object.entries(faculty.programs.masters).map(([name, data]) => (
                        <div key={name} className="p-3 rounded-lg bg-muted">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{name}</span>
                          </div>
                          {data.specialties && (
                            <div className="flex flex-wrap gap-2">
                              {data.specialties.map(specialty => (
                                <Badge key={specialty} variant="secondary">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Responsable du département</p>
                      <p className="text-sm text-muted-foreground">Dr. Mohammed AMARA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Horaires d'ouverture</p>
                      <p className="text-sm text-muted-foreground">
                        Du dimanche au jeudi: 08:00 - 17:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Durée des études</p>
                      <p className="text-sm text-muted-foreground">
                        Licence: 3 ans
                        <br />
                        Master: 2 ans
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage; 