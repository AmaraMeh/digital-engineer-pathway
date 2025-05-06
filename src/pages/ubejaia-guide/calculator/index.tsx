import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, ChevronLeft, Save, Download, Trash2, Book, Check, FlaskConical, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, orderBy, getDocs, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import type { Year, Specialty, Module, ModuleGrades, Grade } from "@/lib/types/calculator";

const CalculatorPage = () => {
  const navigate = useNavigate();
  const [years, setYears] = useState<Year[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);
  const [grades, setGrades] = useState<ModuleGrades>({});
  const [overallAverage, setOverallAverage] = useState<number | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [hasEliminations, setHasEliminations] = useState(false);
  const [creditsValidated, setCreditsValidated] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [targetAverage, setTargetAverage] = useState(10);
  const [showGuidance, setShowGuidance] = useState(false);
  const [guidanceTitle, setGuidanceTitle] = useState("");
  const [guidanceText, setGuidanceText] = useState("");
  const [guidanceType, setGuidanceType] = useState<"success" | "warning" | "error">("warning");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch years ordered by order field
      const yearsQuery = query(
        collection(firestore, 'years'),
        orderBy('order', 'asc')
      );
      const yearsSnapshot = await getDocs(yearsQuery);
      const yearsData = yearsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Year));

      // Fetch specialties
      const specialtiesSnapshot = await getDocs(collection(firestore, 'specialties'));
      const specialtiesData = specialtiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Specialty));

      setYears(yearsData);
      setSpecialties(specialtiesData);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError('Error loading data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSpecialty) {
      fetchSemesters();
    } else {
      setSemesters([]);
      setSelectedSemester("");
    }
  }, [selectedSpecialty]);

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      setError(null);

      const modulesQuery = query(
        collection(firestore, 'modules'),
        where('specialtyId', '==', selectedSpecialty)
      );
      const modulesSnapshot = await getDocs(modulesQuery);
      
      // Get unique semesters
      const uniqueSemesters = Array.from(
        new Set(
          modulesSnapshot.docs.map(doc => doc.data().semesterKey)
        )
      ).sort();

      setSemesters(uniqueSemesters);
    } catch (err) {
      console.error('Error fetching semesters:', err);
      setError('Error loading semesters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSpecialty && selectedSemester) {
      fetchModules();
    }
  }, [selectedSpecialty, selectedSemester]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      setError(null);

      const modulesQuery = query(
        collection(firestore, 'modules'),
        where('specialtyId', '==', selectedSpecialty),
        where('semesterKey', '==', selectedSemester)
      );
      const modulesSnapshot = await getDocs(modulesQuery);
      const modulesData = modulesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Module));

      setModules(modulesData);
      setTotalCredits(modulesData.reduce((sum, m) => sum + m.credits, 0));
    } catch (err) {
      console.error('Error fetching modules:', err);
      setError('Error loading modules. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (moduleId: string, type: string, value: string) => {
    const numValue = parseFloat(value.replace(',', '.'));
    if (isNaN(numValue) || numValue < 0 || numValue > 20) return;

    setGrades(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [type]: value
      }
    }));
  };

  const calculateModuleAverage = (moduleId: string): { average: number | null; isEliminated: boolean } => {
    const module = modules.find(m => m.id === moduleId);
    const moduleGrades = grades[moduleId];
    
    if (!module || !moduleGrades) return { average: null, isEliminated: false };

    let sum = 0;
    let weightSum = 0;

    const hasTD = module.evaluations.includes('td');
    const hasTP = module.evaluations.includes('tp');
    const hasExam = module.evaluations.includes('examen');

    if (hasTD && hasTP && hasExam) {
      if (moduleGrades.td && moduleGrades.tp && moduleGrades.examen) {
        sum = parseFloat(moduleGrades.td) * 0.2 + 
              parseFloat(moduleGrades.tp) * 0.2 + 
              parseFloat(moduleGrades.examen) * 0.6;
        weightSum = 1;
      }
    } else if (hasTD && hasExam) {
      if (moduleGrades.td && moduleGrades.examen) {
        sum = parseFloat(moduleGrades.td) * 0.4 + 
              parseFloat(moduleGrades.examen) * 0.6;
        weightSum = 1;
      }
    } else if (hasTP && hasExam) {
      if (moduleGrades.tp && moduleGrades.examen) {
        sum = parseFloat(moduleGrades.tp) * 0.4 + 
              parseFloat(moduleGrades.examen) * 0.6;
        weightSum = 1;
      }
    } else if (hasExam && moduleGrades.examen) {
      sum = parseFloat(moduleGrades.examen);
      weightSum = 1;
    }

    if (weightSum === 0) return { average: null, isEliminated: false };

    const average = sum / weightSum;
    const isEliminated = module.noteEliminatoire !== undefined && average < module.noteEliminatoire;

    return { average, isEliminated };
  };

  const calculateOverallAverage = () => {
    let totalWeightedSum = 0;
    let totalCoeff = 0;
    let validatedCredits = 0;
    let hasElim = false;
    let allModulesHaveGrades = true;

    modules.forEach(module => {
      const { average, isEliminated } = calculateModuleAverage(module.id);
      if (average === null) {
        allModulesHaveGrades = false;
        return;
      }

      totalWeightedSum += average * module.coefficient;
      totalCoeff += module.coefficient;

      if (average >= 10 && !isEliminated) {
        validatedCredits += module.credits;
      }
      if (isEliminated) {
        hasElim = true;
      }
    });

    if (!allModulesHaveGrades) {
      setError("Veuillez entrer toutes les notes avant de calculer la moyenne.");
      return;
    }

    if (totalCoeff > 0) {
      const finalAverage = totalWeightedSum / totalCoeff;
      setOverallAverage(finalAverage);
      setIsValidated(finalAverage >= 10 && !hasElim);
      setHasEliminations(hasElim);
      setCreditsValidated(validatedCredits);
      setShowGuidance(true);
      setError(null);

      // Set guidance based on results
      if (finalAverage >= 10 && !hasElim) {
        setGuidanceType("success");
        setGuidanceTitle("Félicitations ! Semestre Validé ! 🎉");
        setGuidanceText("Excellent travail ! Votre persévérance a porté ses fruits. Continuez sur cette lancée pour le prochain semestre.");
      } else if (hasElim) {
        setGuidanceType("error");
        setGuidanceTitle("Attention : Modules Éliminés ❌");
        setGuidanceText(`Votre moyenne est de ${finalAverage.toFixed(2)}, mais la présence de modules éliminés rend la validation impossible. Concentrez-vous sur les rattrapages.`);
      } else if (finalAverage >= 9.5) {
        setGuidanceType("warning");
        setGuidanceTitle("Presque ! Le Semestre est à Portée ! 💪");
        setGuidanceText(`Avec une moyenne de ${finalAverage.toFixed(2)}, vous êtes très proche. Visez les rattrapages ou la compensation avec l'autre semestre.`);
      } else {
        setGuidanceType("error");
        setGuidanceTitle("Semestre Non Validé");
        setGuidanceText(`Votre moyenne de ${finalAverage.toFixed(2)} est insuffisante. Préparez-vous pour les rattrapages et demandez de l'aide si nécessaire.`);
      }
    }
  };

  const getStorageKey = () => {
    return selectedYear && selectedSpecialty && selectedSemester
      ? `calculator_${selectedYear}_${selectedSpecialty}_${selectedSemester}`
      : null;
  };

  const saveGrades = () => {
    const key = getStorageKey();
    if (!key) {
      setError("Sélectionnez une année, spécialité et semestre avant de sauvegarder.");
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(grades));
      setError(null);
      // Show success feedback
      const saveBtn = document.querySelector('#saveBtn');
      if (saveBtn) {
        saveBtn.innerHTML = '<i class="w-4 h-4 mr-2" data-lucide="check"></i>Sauvegardé';
        setTimeout(() => {
          saveBtn.innerHTML = '<i class="w-4 h-4 mr-2" data-lucide="save"></i>Sauvegarder';
        }, 2000);
      }
    } catch (err) {
      setError("Erreur lors de la sauvegarde des notes.");
    }
  };

  const loadGrades = () => {
    const key = getStorageKey();
    if (!key) {
      setError("Sélectionnez une année, spécialité et semestre avant de charger.");
      return;
    }

    try {
      const savedGrades = localStorage.getItem(key);
      if (savedGrades) {
        setGrades(JSON.parse(savedGrades));
        setError(null);
        setOverallAverage(null);
        setShowGuidance(false);
      } else {
        setError("Aucune note sauvegardée trouvée pour cette sélection.");
      }
    } catch (err) {
      setError("Erreur lors du chargement des notes.");
    }
  };

  const clearGrades = () => {
    if (window.confirm("Voulez-vous vraiment effacer toutes les notes ? Cette action est irréversible.")) {
      setGrades({});
      setOverallAverage(null);
      setIsValidated(false);
      setHasEliminations(false);
      setCreditsValidated(0);
      setShowGuidance(false);
      setError(null);

      // Clear localStorage if there are saved grades
      const key = getStorageKey();
      if (key) {
        localStorage.removeItem(key);
      }
    }
  };

  const calculateWhatIf = () => {
    if (!modules.length) {
      setError("Sélectionnez un semestre avant de faire le calcul.");
      return;
    }

    let totalWeightedSum = 0;
    let totalCoeff = 0;
    let examModules = [];

    modules.forEach(module => {
      const coeff = module.coefficient;
      const hasExam = module.evaluations.includes('examen');
      const moduleGrades = grades[module.id] || {};

      if (hasExam && !moduleGrades.examen) {
        examModules.push(module);
      } else {
        const { average } = calculateModuleAverage(module.id);
        if (average !== null) {
          totalWeightedSum += average * coeff;
          totalCoeff += coeff;
        }
      }
    });

    if (examModules.length === 0) {
      setError("Tous les examens ont déjà des notes.");
      return;
    }

    const remainingCoeff = examModules.reduce((sum, m) => sum + m.coefficient, 0);
    const neededAverage = ((targetAverage * (totalCoeff + remainingCoeff)) - totalWeightedSum) / remainingCoeff;

    if (neededAverage > 20) {
      setError(`Impossible d'atteindre ${targetAverage}/20 même avec 20/20 aux examens restants.`);
    } else if (neededAverage < 0) {
      setError(`La moyenne cible ${targetAverage}/20 est déjà dépassée.`);
    } else {
      setError(null);
      // Update grades with calculated exam values
      const newGrades = { ...grades };
      examModules.forEach(module => {
        newGrades[module.id] = {
          ...newGrades[module.id],
          examen: neededAverage.toFixed(2)
        };
      });
      setGrades(newGrades);
      calculateOverallAverage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative mb-8">
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2 hover:bg-slate-800"
            onClick={() => navigate("/ubejaia-guide")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour au guide
          </Button>
          <div className="text-center">
            <img src="/assets/img/ama2.png" alt="Logo" className="mx-auto h-16 mb-4" />
          </div>
        </div>

        {/* Title Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-500/10 text-blue-400">
            <Calculator className="w-4 h-4 mr-2" />
            Calculateur
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Calculateur de Moyenne
          </h1>
          <p className="text-slate-400">Développé par <span className="font-semibold">Amara Mehdi</span></p>
        </motion.div>

        {/* Main Calculator Card */}
        <Card className="mb-8 border-none shadow-xl bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5" />
              Sélection
            </CardTitle>
            <CardDescription>
              Sélectionnez votre année, spécialité et semestre pour calculer votre moyenne
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'année" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year.id} value={year.id}>
                      {year.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={selectedSpecialty} 
                onValueChange={setSelectedSpecialty}
                disabled={!selectedYear}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la spécialité" />
                </SelectTrigger>
                <SelectContent>
                  {specialties
                    .filter(s => s.yearId === selectedYear)
                    .map(specialty => (
                      <SelectItem key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedSemester}
                onValueChange={setSelectedSemester}
                disabled={!selectedSpecialty || semesters.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le semestre" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(semester => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Modules Section */}
            {modules.length > 0 ? (
              <div className="space-y-6">
                {modules.map(module => (
                  <Card key={module.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all bg-slate-900/50">
                    <CardHeader className="bg-slate-800/50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        {module.name}
                      </CardTitle>
                      <div className="flex gap-2 text-sm flex-wrap">
                        <Badge variant="outline">Coef: {module.coefficient}</Badge>
                        <Badge variant="outline">Crédits: {module.credits}</Badge>
                        {module.noteEliminatoire && (
                          <Badge variant="destructive">Élim: {module.noteEliminatoire}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {module.evaluations.map(evalType => (
                          <div key={evalType} className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">{evalType.toUpperCase()}</label>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.01"
                              value={grades[module.id]?.[evalType] || ""}
                              onChange={(e) => handleGradeChange(module.id, evalType, e.target.value)}
                              placeholder="Note"
                              className="bg-slate-950/50 border-slate-700 focus:border-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* What-If Calculator */}
                <Card className="border-none shadow-md bg-slate-900/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FlaskConical className="w-4 h-4" />
                      Calcul "Et Si ?"
                    </CardTitle>
                    <CardDescription>
                      Calculez la note d'examen nécessaire pour atteindre une moyenne cible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="w-full md:w-auto">
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Moyenne Cible
                        </label>
                        <Input
                          type="number"
                          min="0"
                          max="20"
                          step="0.01"
                          value={targetAverage}
                          onChange={(e) => setTargetAverage(parseFloat(e.target.value))}
                          className="w-32 bg-slate-950/50 border-slate-700"
                        />
                      </div>
                      <Button 
                        onClick={() => calculateWhatIf()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <FlaskConical className="w-4 h-4 mr-2" />
                        Calculer Notes Examen
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Button 
                    id="saveBtn"
                    onClick={() => saveGrades()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button 
                    onClick={() => loadGrades()}
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Charger
                  </Button>
                  <Button 
                    onClick={() => clearGrades()}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Effacer
                  </Button>
                  <Button 
                    onClick={() => calculateOverallAverage()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculer
                  </Button>
                </div>

                {/* Results Section */}
                {overallAverage !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12"
                  >
                    <Card className={`border-none shadow-xl backdrop-blur-sm ${
                      isValidated 
                        ? 'bg-green-950/20 text-green-400' 
                        : hasEliminations 
                          ? 'bg-red-950/20 text-red-400'
                          : 'bg-slate-800/50'
                    }`}>
                      <CardHeader>
                        <CardTitle className="text-center text-2xl">Moyenne Générale</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-5xl font-bold mb-6 font-mono">
                          {overallAverage.toFixed(2)}/20
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full mb-4">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              isValidated ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(overallAverage / 20) * 100}%` }}
                          />
                        </div>
                        <div className="text-lg font-medium mb-4">
                          {isValidated ? 'Semestre Validé' : hasEliminations ? 'Semestre Non Validé (Élimination)' : 'Semestre Non Validé'}
                        </div>
                        <div className="flex justify-center gap-8 text-sm">
                          <div>
                            <span className="block text-slate-400">Crédits Semestre</span>
                            <span className="text-lg font-bold">{totalCredits}</span>
                          </div>
                          <div>
                            <span className="block text-slate-400">Crédits Validés</span>
                            <span className="text-lg font-bold">{creditsValidated}</span>
                          </div>
                        </div>

                        <a
                          href="https://www.instagram.com/spot_campuselkseur/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Instagram className="w-5 h-5" />
                          Suivre Spot Campus El Kseur
                        </a>
                      </CardContent>
                    </Card>

                    {/* Guidance Section */}
                    {showGuidance && (
                      <Card className={`mt-8 border-l-4 ${
                        guidanceType === 'success' ? 'border-l-green-500 bg-green-950/20' :
                        guidanceType === 'warning' ? 'border-l-yellow-500 bg-yellow-950/20' :
                        'border-l-red-500 bg-red-950/20'
                      }`}>
                        <CardHeader>
                          <CardTitle className={
                            guidanceType === 'success' ? 'text-green-400' :
                            guidanceType === 'warning' ? 'text-yellow-400' :
                            'text-red-400'
                          }>{guidanceTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-300">{guidanceText}</p>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    Chargement...
                  </div>
                ) : (
                  <p>{error || "Sélectionnez une année, spécialité et semestre pour commencer"}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalculatorPage; 