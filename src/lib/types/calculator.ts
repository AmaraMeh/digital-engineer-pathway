export interface Year {
  id: string;
  name: string;
  order: number;
}

export interface Specialty {
  id: string;
  name: string;
  yearId: string;
}

export interface Module {
  id: string;
  name: string;
  coefficient: number;
  credits: number;
  noteEliminatoire?: number;
  evaluations: string[];
  specialtyId: string;
  semesterKey: string;
}

export interface Grade {
  td?: string;
  tp?: string;
  examen?: string;
}

export interface ModuleGrades {
  [moduleId: string]: Grade;
}

export interface CalculationResult {
  average: number | null;
  isEliminated: boolean;
  isValid: boolean;
  grades: ModuleGrades;
}

export interface OverallResults {
  moyenneFinale: number;
  isValidated: boolean;
  hasEliminations: boolean;
  totalCreditsAttempted: number;
  totalCreditsValidatedFinal: number;
  isValidatedByAverage: boolean;
} 