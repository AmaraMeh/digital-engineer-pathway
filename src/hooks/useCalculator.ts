import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import type { Year, Specialty, Module, ModuleGrades, Grade, CalculationResult } from '@/lib/types/calculator';

export function useCalculator() {
  const [years, setYears] = useState<Year[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchModules = async (specialtyId: string) => {
    try {
      setLoading(true);
      setError(null);

      const modulesQuery = query(
        collection(firestore, 'modules'),
        where('specialtyId', '==', specialtyId)
      );
      const modulesSnapshot = await getDocs(modulesQuery);
      const modulesData = modulesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Module));

      setModules(modulesData);
      return modulesData;
    } catch (err) {
      console.error('Error fetching modules:', err);
      setError('Error loading modules. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const calculateModuleAverage = (module: Module, grades: ModuleGrades): CalculationResult => {
    const moduleGrades = grades[module.id] || {} as Grade;
    
    if (!moduleGrades) {
      return {
        average: null,
        isEliminated: false,
        isValid: false,
        grades: {}
      };
    }

    let sum = 0;
    let weightSum = 0;

    const hasTD = module.evaluations.includes('td');
    const hasTP = module.evaluations.includes('tp');
    const hasExam = module.evaluations.includes('examen');

    // Calculate weighted average based on evaluation types
    if (hasTD && hasTP && hasExam && moduleGrades.td && moduleGrades.tp && moduleGrades.examen) {
      sum = parseFloat(moduleGrades.td) * 0.2 + 
            parseFloat(moduleGrades.tp) * 0.2 + 
            parseFloat(moduleGrades.examen) * 0.6;
      weightSum = 1;
    } else if (hasTD && hasExam && moduleGrades.td && moduleGrades.examen) {
      sum = parseFloat(moduleGrades.td) * 0.4 + 
            parseFloat(moduleGrades.examen) * 0.6;
      weightSum = 1;
    } else if (hasTP && hasExam && moduleGrades.tp && moduleGrades.examen) {
      sum = parseFloat(moduleGrades.tp) * 0.4 + 
            parseFloat(moduleGrades.examen) * 0.6;
      weightSum = 1;
    } else if (hasExam && moduleGrades.examen) {
      sum = parseFloat(moduleGrades.examen);
      weightSum = 1;
    }

    if (weightSum === 0) {
      return {
        average: null,
        isEliminated: false,
        isValid: false,
        grades: { [module.id]: moduleGrades }
      };
    }

    const average = sum / weightSum;
    const isEliminated = module.noteEliminatoire !== undefined && average < module.noteEliminatoire;

    return {
      average,
      isEliminated,
      isValid: true,
      grades: { [module.id]: moduleGrades }
    };
  };

  return {
    years,
    specialties,
    modules,
    loading,
    error,
    fetchModules,
    calculateModuleAverage
  };
}

export function validateGrade(value: string): { isValid: boolean; value: string } {
  if (!value.trim()) {
    return { isValid: true, value: '' };
  }

  const cleaned = value.replace(',', '.').replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  const formatted = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleaned;
  
  const num = parseFloat(formatted);
  const isValid = !isNaN(num) && num >= 0 && num <= 20;

  return {
    isValid,
    value: formatted
  };
} 