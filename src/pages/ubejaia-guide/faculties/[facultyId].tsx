import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Book, GraduationCap, Building2, Users, Calendar,
  BookOpen, FileText, Library, MapPin, HelpCircle, ChevronLeft,
  Microscope, Calculator, Code, Briefcase, Globe,
  Stethoscope, ChevronRight, Phone, Mail, Clock, LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  courses?: string[];
}

interface Program {
  code: string;
  specialties: string[];
}

interface SpecialProgram {
  name: string;
  code: string;
  description: string;
  type: string;
}

interface Programs {
  licenses: Record<string, Program>;
  masters: {
    academic: Record<string, string[]>;
    professional?: Record<string, string[]>;
  };
}

interface FacultyStats {
  students: number;
  teachers: number;
  staff: number;
  postGrad?: number;
  residents?: number;
}

interface Facility {
  name: string;
  type?: string;
  description?: string;
  services?: string[];
  location?: string;
  count?: number;
}

interface FacultyContacts {
  phone: string;
  email?: string;
  address?: string;
  website: string;
  location: string;
}

interface Faculty {
  id: string;
  name: string;
  description: string;
  icon: any;
  departments: Department[];
  facilities: Facility[];
  contacts: FacultyContacts;
  stats: FacultyStats;
  programs?: Programs;
  stats_details?: Record<string, string>;
  specialPrograms?: SpecialProgram[];
}

export const facultiesData: Record<string, Faculty> = {
  medecine: {
    id: "medecine",
    name: "Faculté de Médecine",
    description: "La Faculté de Médecine a été créée par le décret exécutif n° 07-271 du 11 septembre 2007 modifiant et complétant le décret exécutif n° 98-218 du 07 juillet 1998 portant création de l'Université de Béjaïa.",
    icon: Stethoscope,
    stats: {
      students: 1207,
      teachers: 82,
      staff: 50,
      residents: 339
    },
    departments: [
      {
        name: "Médecine",
        code: "P01ML01",
        description: "Formation de docteurs en médecine",
        courses: [
          "Anatomie",
          "Physiologie",
          "Biochimie",
          "Histologie",
          "Pathologie"
        ],
        id: "medecine"
      },
      {
        name: "Pharmacie",
        code: "P02ML01",
        description: "Formation de spécialistes en pharmacie",
        courses: [
          "Chimie pharmaceutique",
          "Pharmacologie",
          "Galénique",
          "Toxicologie",
          "Biologie"
        ],
        id: "pharmacie"
      }
    ],
    specialPrograms: [
      {
        name: "Médecine + Intelligence Artificielle",
        code: "PCOLAN05",
        description: "Double diplôme en médecine et IA",
        type: "Double diplomation"
      }
    ],
    facilities: [
      {
        name: "CHU de Béjaïa",
        type: "Hôpital universitaire",
        services: ["Cardiologie", "Chirurgie", "Pédiatrie"],
        location: "Campus Aboudaou"
      },
      {
        name: "Laboratoires de recherche",
        type: "Recherche",
        services: ["Biologie moléculaire", "Imagerie médicale"],
        location: "Campus Targa Ouzemmour"
      }
    ],
    contacts: {
      phone: "034 81 68 31",
      email: "contact@fac-medecine.univ-bejaia.dz",
      address: "Campus Aboudaou",
      website: "https://www.univ-bejaia.dz/Fac_Medecine/",
      location: "Campus Aboudaou"
    }
  },
  technology: {
    id: "technology",
    name: "Faculté de Technologie",
    icon: Code,
    description: "La Faculté de Technologie est issue de la restructuration de la Faculté des Sciences et des Sciences de l'Ingénieur, scindée en deux en vertu du décret exécutif 07-271 du 11/09/2007.",
    stats: {
      students: 8558,
      postGrad: 330,
      teachers: 456,
      staff: 141
    },
    departments: [
      {
        id: "tech-gen",
        name: "Technologie",
        code: "A00TCL02",
        description: "Sciences et technologies fondamentales"
      },
      {
        id: "genie-procedes",
        name: "Génie des procédés",
        code: "A03TCL01",
        description: "Formation en génie des procédés et chimie"
      },
      {
        id: "genie-electrique",
        name: "Génie électrique",
        code: "A19TCL01",
        description: "Formation en électricité et électronique"
      },
      {
        id: "genie-mecanique",
        name: "Génie mécanique",
        code: "A19TCL01",
        description: "Formation en mécanique et productique"
      },
      {
        id: "genie-civil",
        name: "Génie civil",
        code: "A05TCL01",
        description: "Formation en construction et travaux publics"
      },
      {
        id: "hydraulique",
        name: "Hydraulique",
        code: "A12LAL01",
        description: "Formation en hydraulique et aménagements"
      },
      {
        id: "mines-geologie",
        name: "Mines et géologie",
        code: "A08TCL01",
        description: "Formation en exploitation minière et géologie"
      },
      {
        id: "architecture",
        name: "Architecture",
        code: "N05LAL01",
        description: "Formation en architecture et urbanisme"
      },
      {
        id: "automatique",
        name: "Automatique, télécommunication et électronique",
        code: "A15TCL01",
        description: "Formation en systèmes automatiques et télécommunications"
      }
    ],
    programs: {
      licenses: {
        "Sciences et Technologies": {
          code: "A00LAL01",
          specialties: [
            "Génie des Procédés",
            "Génie Civil",
            "Électronique",
            "Électromécanique",
            "Électrotechnique"
          ]
        },
        "Hydraulique": {
          code: "A12LAL01",
          specialties: [
            "Hydraulique urbaine",
            "Ouvrages et aménagements hydrauliques"
          ]
        },
        "Architecture": {
          code: "N05LAL01",
          specialties: [
            "Architecture",
            "Architecture + Sociologie"
          ]
        }
      },
      masters: {
        academic: {
          "Génie des Procédés": [
            "Génie alimentaire",
            "Génie des matériaux",
            "Génie des polymères",
            "Génie des procédés des matériaux",
            "Génie pharmaceutique",
            "Génie des procédés de l'environnement"
          ],
          "Génie Mécanique": [
            "Construction mécanique",
            "Énergétique",
            "Fabrication mécanique et productique",
            "Génie des matériaux",
            "Installations énergétiques et turbomachines",
            "Ingénierie des matériaux et des surfaces",
            "Énergies renouvelables en mécanique"
          ],
          "Électrotechnique": [
            "Commandes électriques",
            "Électrotechnique industrielle",
            "Machines électriques",
            "Réseaux électriques",
            "Énergies renouvelables en électrotechnique"
          ],
          "Automatique": [
            "Automatisation et informatique industrielle",
            "Automatique et systèmes"
          ],
          "Télécommunication": [
            "Réseaux et télécommunications",
            "Systèmes des télécommunications"
          ],
          "Génie Civil": [
            "Structures",
            "Constructions métalliques et mixtes",
            "Géotechnique"
          ],
          "Génie Minier": [
            "Valorisation des ressources minérales",
            "Exploitation des mines"
          ],
          "Électromécanique": [
            "Maintenance industrielle",
            "Électromécanique"
          ],
          "Hydraulique": [
            "Hydraulique urbaine",
            "Ouvrages et aménagements hydrauliques"
          ]
        }
      }
    },
    contacts: {
      phone: "034 81 37 13",
      email: "contact.technologie@univ-bejaia.dz",
      location: "Campus Targa Ouzemour",
      address: "Route de Targa Ouzemour, 06000",
      website: "www.univ-bejaia.dz/Fac_Technologie/"
    },
    facilities: [
      {
        name: "Laboratoires de recherche",
        count: 12,
        description: "Contribuent de manière significative à la promotion de la recherche"
      }
    ],
    stats_details: {
      "Étudiants en graduation": "8558",
      "Étudiants en post-graduation": "330",
      "Enseignants": "456",
      "Personnel ATS": "141",
      "Spécialités en Licence": "15",
      "Spécialités en Master": "34",
      "Ingénieur d'État": "5",
      "Architecte": "1",
      "Double diplomation": "1"
    }
  },
  sciences_nature: {
    id: "sciences_nature",
    name: "Faculté des Sciences de la Nature et de la Vie",
    icon: Microscope,
    description: "La Faculté des Sciences de la Nature et de la Vie a été créée le 18 septembre 2001 par le décret exécutif N°01-268.",
    stats: {
      students: 3393,
      postGrad: 274,
      teachers: 262,
      staff: 106
    },
    departments: [
      {
        id: "tronc-commun",
        name: "Tronc commun des sciences de la nature et de la vie",
        code: "D00LAL01",
        description: "Formation fondamentale en sciences de la nature"
      },
      {
        id: "sciences-biologiques",
        name: "Sciences biologiques de l'environnement",
        code: "D00LAL01",
        description: "Sciences de la Nature et de la Vie"
      },
      {
        id: "biologie-physico",
        name: "Biologie physico-chimique",
        code: "D00LAL01",
        description: "Étude des aspects physico-chimiques de la biologie"
      },
      {
        id: "microbiologie",
        name: "Microbiologie",
        code: "D00LAL01",
        description: "Étude des micro-organismes"
      },
      {
        id: "sciences-alimentaires",
        name: "Sciences alimentaires",
        code: "D00LAL01",
        description: "Sciences et technologies alimentaires"
      }
    ],
    programs: {
      licenses: {
        "Sciences biologiques": {
          code: "D00LAL01",
          specialties: [
            "Biochimie",
            "Microbiologie",
            "Biologie et physiologie animale",
            "Biologie et physiologie végétale",
            "Toxicologie",
            "Génétique"
          ]
        },
        "Hydrobiologie marine et continentale": {
          code: "D00LAL01",
          specialties: [
            "Aquaculture et pisciculture"
          ]
        },
        "Sciences alimentaires": {
          code: "D07IAN01",
          specialties: [
            "Contrôle de qualité et analyse des aliments",
            "Sciences des corps gras",
            "Conservation des aliments et emballage",
            "Technologie agro-alimentaire"
          ]
        }
      },
      masters: {
        academic: {
          "Sciences biologiques": [
            "Biochimie appliquée",
            "Biochimie fondamentale",
            "Pharmacotoxicologie",
            "Génétique fondamentale et appliquée",
            "Microbiologie appliquée",
            "Microbiologie fondamentale",
            "Physiologie",
            "Biologie de la conservation"
          ],
          "Écologie et environnement": [
            "Écologie microbienne",
            "Biodiversité et sécurité alimentaire",
            "Écologie",
            "Toxicologie industrielle et environnementale"
          ],
          "Biotechnologies": [
            "Biotechnologie microbienne",
            "Biotechnologie et valorisation des plantes",
            "Biotechnologie santé"
          ]
        }
      }
    },
    contacts: {
      phone: "034 81 37 10",
      email: "contact.snv@univ-bejaia.dz",
      location: "Campus Targa Ouzemour",
      address: "Route de Targa Ouzemour, 06000",
      website: "www.univ-bejaia.dz/Fac_Sciences_Nature_Vie/"
    },
    facilities: [
      {
        name: "Laboratoires de recherche",
        count: 8,
        description: "Laboratoires spécialisés en sciences biologiques et biotechnologie"
      }
    ],
    stats_details: {
      "Étudiants en graduation": "3393",
      "Étudiants en post-graduation": "274",
      "Enseignants": "262",
      "Personnel ATS": "106",
      "Spécialités en Licence": "12",
      "Spécialités en Master": "22",
      "MCIL": "1"
    }
  },
  sciences_exactes: {
    id: "sciences_exactes",
    name: "Faculté des Sciences Exactes",
    icon: Calculator,
    description: "La Faculté des Sciences Exactes offre des formations conduisant aux diplômes de Licence, Master et Doctorat dans les domaines des Sciences de la Matière et des Mathématiques et Informatique.",
    stats: {
      students: 3221,
      teachers: 220,
      staff: 91
    },
    departments: [
      {
        id: "mathematiques",
        name: "Mathématiques",
        code: "C02LAL01",
        description: "Formation en mathématiques fondamentales et appliquées"
      },
      {
        id: "informatique",
        name: "Informatique",
        code: "C01LAL01",
        description: "Formation en systèmes informatiques et développement"
      },
      {
        id: "recherche-op",
        name: "Recherche opérationnelle",
        code: "C02LAL01",
        description: "Optimisation et aide à la décision"
      },
      {
        id: "chimie",
        name: "Chimie",
        code: "B00LAL01",
        description: "Formation en chimie fondamentale et appliquée"
      },
      {
        id: "physique",
        name: "Physique",
        code: "B00LAL01",
        description: "Formation en physique fondamentale et appliquée"
      }
    ],
    programs: {
      licenses: {
        "Sciences de la Matière": {
          code: "B00LAL01",
          specialties: [
            "Chimie fondamentale",
            "Physique fondamentale"
          ]
        },
        "Mathématiques": {
          code: "C02LAL01",
          specialties: [
            "Mathématiques",
            "Mathématiques appliquées"
          ]
        },
        "Informatique": {
          code: "C01LAL01",
          specialties: [
            "Systèmes informatiques"
          ]
        }
      },
      masters: {
        academic: {
          "Chimie": [
            "Chimie analytique",
            "Chimie des matériaux"
          ],
          "Physique": [
            "Physique théorique",
            "Physique des matériaux",
            "Dynamique des fluides et énergétique",
            "Astrophysique",
            "Nanophysique"
          ],
          "Mathématiques": [
            "Analyse mathématique",
            "Probabilités Statistiques et applications",
            "Mathématiques et Intelligence artificielle"
          ],
          "Informatique": [
            "Réseaux et systèmes distribués",
            "Intelligence artificielle",
            "Réseaux et sécurité",
            "Systèmes d'informations avancées"
          ]
        }
      }
    },
    facilities: [
      {
        name: "Laboratoires de recherche",
        count: 5,
        description: "Laboratoires de recherche régionaux travaillant sur des projets nationaux et internationaux"
      }
    ],
    contacts: {
      phone: "034 81 37 21",
      email: "contact.sciences-exactes@univ-bejaia.dz",
      location: "Campus Targa Ouzemour",
      address: "Route de Targa Ouzemour, 06000",
      website: "www.univ-bejaia.dz/Fac_Sciences_Exactes"
    },
    stats_details: {
      "Étudiants en graduation": "3221",
      "Étudiants en post-graduation": "277",
      "Enseignants": "220",
      "Personnel ATS": "91",
      "Spécialités en Licence": "6",
      "Spécialités en Master": "20",
      "Ingénieur d'État": "1",
      "Double diplomation": "1"
    }
  },
  droit: {
    id: "droit",
    name: "Faculté de Droit et des Sciences Politiques",
    description: "La Faculté de Droit et des Sciences Politiques est relativement récente, créée par le décret exécutif N° 07/271 du 11/09/2007 portant Amendement du Décret exécutif N° 98/218 du 07/07/1998, relatif à la création de l'université de Béjaïa.",
    icon: Library,
    stats: {
      students: 4638,
      postGrad: 120,
      teachers: 168,
      staff: 52
    },
    departments: [
      {
        id: "base-droit",
        name: "Enseignements de base en droit",
        code: "G02LAL01",
        description: "Formation fondamentale en droit"
      },
      {
        id: "droit-prive",
        name: "Droit privé",
        code: "G02LAL01",
        description: "Formation en droit privé et affaires"
      },
      {
        id: "droit-public",
        name: "Droit public",
        code: "G02LAL01",
        description: "Formation en droit public et administratif"
      }
    ],
    programs: {
      licenses: {
        "Droit": {
          code: "G02LAL01",
          specialties: [
            "Droit privé",
            "Droit public"
          ]
        }
      },
      masters: {
        academic: {
          "Droit": [
            "Droit administratif",
            "Droit pénal et sciences criminelles",
            "Droit international public",
            "Droit public économique",
            "Droit privé"
          ]
        },
        professional: {
          "Droit": [
            "Professions juridique et judiciaire"
          ]
        }
      }
    },
    facilities: [
      {
        name: "Bibliothèque de droit",
        type: "Bibliothèque",
        description: "Bibliothèque spécialisée en sciences juridiques",
        location: "Campus Aboudaou"
      },
      {
        name: "Salles de conférence",
        type: "Enseignement",
        count: 2,
        description: "Salles dédiées aux conférences et séminaires"
      }
    ],
    contacts: {
      phone: "034 81 68 34",
      location: "Campus Aboudaou",
      website: "www.univ-bejaia.dz/Fac_Droit_Sciences_Politiques/",
      address: "Campus Aboudaou"
    },
    stats_details: {
      "Étudiants en graduation": "4638",
      "Étudiants en post-graduation": "120",
      "Enseignants": "168",
      "Personnel ATS": "52",
      "Spécialités en Licence": "2",
      "Spécialités en Master": "6"
    }
  },
  sciences_eco: {
    id: "sciences_eco",
    name: "Faculté des Sciences Économiques, Commerciales et des Sciences de Gestion",
    icon: LineChart,
    description: "La Faculté des Sciences Économiques, Commerciales et des Sciences de Gestion a été créée le 09/12/2010 par le décret exécutif N°10-309 modifiant et complétant le décret exécutif N° 98-218 portant création de l'Université de Béjaïa.",
    stats: {
      students: 6326,
      teachers: 240,
      staff: 78,
      postGrad: 153
    },
    departments: [
      {
        id: "base-segc",
        name: "Enseignements de base du domaine SEGC",
        code: "F02LAL02",
        description: "Formation fondamentale en sciences économiques et gestion"
      },
      {
        id: "sciences-gestion",
        name: "Sciences de gestion",
        code: "F02LAL02",
        description: "Formation en management et gestion des organisations"
      },
      {
        id: "sciences-eco",
        name: "Sciences économiques",
        code: "F02LAL02",
        description: "Formation en économie et finance"
      },
      {
        id: "sciences-commerciales",
        name: "Sciences commerciales",
        code: "F02LAL02",
        description: "Formation en commerce et marketing"
      },
      {
        id: "sciences-financieres",
        name: "Sciences financières et comptabilité",
        code: "F02LAL02",
        description: "Formation en finance et comptabilité"
      }
    ],
    programs: {
      licenses: {
        "Sciences de gestion": {
          code: "F02LAL02",
          specialties: [
            "Management",
            "Gestion des ressources humaines",
            "Entreprenariat"
          ]
        },
        "Sciences économiques": {
          code: "F02LAL02",
          specialties: [
            "Économie monétaire et financière",
            "Économie des affaires",
            "Économie quantitative"
          ]
        },
        "Sciences Commerciales": {
          code: "F02LAL02",
          specialties: [
            "Finance et commerce international",
            "Marketing"
          ]
        },
        "Sciences financières et comptabilité": {
          code: "F02LAL02",
          specialties: [
            "Comptabilité"
          ]
        }
      },
      masters: {
        academic: {
          "Sciences de gestion": [
            "Entreprenariat",
            "Management des ressources humaines",
            "Management"
          ],
          "Sciences économiques": [
            "Économie des affaires",
            "Économie monétaire et financière",
            "Économie quantitative"
          ],
          "Sciences Commerciales": [
            "Finance et commerce international",
            "Marketing des services",
            "Marketing"
          ],
          "Sciences financières et comptabilité": [
            "Comptabilité et audit",
            "Finance d'entreprise"
          ]
        },
        professional: {
          "Sciences de gestion": [
            "Management des établissements de santé",
            "Management des Établissements Hôteliers"
          ]
        }
      }
    },
    facilities: [
      {
        name: "Laboratoires de recherche",
        count: 2,
        description: "Laboratoire d'Économie et Développement et le laboratoire Recherche en Management et Techniques quantitatives"
      }
    ],
    contacts: {
      phone: "034 81 68 27",
      email: "contact.segc@univ-bejaia.dz",
      location: "Campus Aboudaou",
      website: "www.univ-bejaia.dz/Fac_Sciences_Economiques_Commerciales_Science_Gestion",
      address: "Campus Aboudaou"
    },
    stats_details: {
      "Étudiants en graduation": "6326",
      "Étudiants en post-graduation": "153",
      "Enseignants": "240",
      "Personnel ATS": "78",
      "Spécialités en Licence": "9",
      "Spécialités en Master": "13"
    }
  },
  lettres_langues: {
    id: "lettres_langues",
    name: "Faculté des Lettres et des Langues",
    description: "Avec plus de 3000 étudiants, la Faculté des Lettres et des Langues est l'une des plus grandes facultés de l'Université de Béjaïa. Elle offre une grande variété de formations diplômantes (français, anglais, tamazight et arabe), allant des Licences aux Masters en sciences du langage, littérature et civilisation, didactique, anthropologie du monde amazigh, etc.",
    icon: Book,
    stats: {
      students: 3260,
      postGrad: 171,
      teachers: 228,
      staff: 76
    },
    departments: [
      {
        id: "arabe",
        name: "Langue et littérature arabes",
        code: "L00LAL01",
        description: "Formation en langue et littérature arabes"
      },
      {
        id: "francais",
        name: "Langue et littérature françaises",
        code: "H01LAL01",
        description: "Formation en langue et littérature françaises"
      },
      {
        id: "anglais",
        name: "Langue et littérature anglaises",
        code: "H06LAL01",
        description: "Formation en langue et littérature anglaises"
      },
      {
        id: "amazigh",
        name: "Langue et culture amazighes",
        code: "M00LAL01",
        description: "Formation en langue et culture amazighes"
      },
      {
        id: "traduction",
        name: "Traduction et interprétariat",
        code: "H03IAN01",
        description: "Formation en traduction et interprétariat"
      }
    ],
    programs: {
      licenses: {
        "Langue Française": {
          code: "H01LAL01",
          specialties: [
            "Langue française"
          ]
        },
        "Langue Anglaise": {
          code: "H06LAL01",
          specialties: [
            "Langue anglaise"
          ]
        },
        "Langue et Littérature Arabes": {
          code: "L00LAL01",
          specialties: [
            "Linguistique générale",
            "Littérature arabe"
          ]
        },
        "Langue et Culture Amazighes": {
          code: "M00LAL01",
          specialties: [
            "Langue et civilisation",
            "Langue et littérature",
            "Linguistique et didactique"
          ]
        },
        "Traduction": {
          code: "H03IAN01",
          specialties: [
            "Traduction/Interprétariat Arabe-Français-Amazighe"
          ]
        }
      },
      masters: {
        academic: {
          "Langue française": [
            "Didactique des langues étrangères",
            "Linguistique et langues appliquées",
            "Littérature et approches interdisciplinaires",
            "Littérature et civilisation",
            "Sciences du langage"
          ],
          "Langue anglaise": [
            "Didactique des langues étrangères",
            "Linguistique",
            "Littérature et civilisation"
          ],
          "Études linguistiques": [
            "Linguistique",
            "Littérature arabe moderne et contemporaine"
          ],
          "Langue et civilisation amazighes": [
            "Anthropologie du monde amazigh",
            "Littérature d'expression amazighe",
            "Didactique de la langue amazighe",
            "Langue, variation et aménagement"
          ]
        }
      }
    },
    facilities: [
      {
        name: "Laboratoires de recherche",
        count: 4,
        description: "Laboratoires spécialisés en sciences du langage et littérature"
      },
      {
        name: "Bibliothèque des langues",
        type: "Bibliothèque",
        description: "Bibliothèque spécialisée en langues et littérature",
        location: "Campus Aboudaou"
      }
    ],
    contacts: {
      phone: "034 81 68 24",
      location: "Campus Aboudaou",
      website: "www.univ-bejaia.dz/Fac_Lettres_Langues/",
      address: "Campus Aboudaou"
    },
    stats_details: {
      "Étudiants en graduation": "3260",
      "Étudiants en post-graduation": "171",
      "Enseignants": "228",
      "Personnel ATS": "76",
      "Spécialités en Licence": "7",
      "Spécialités en Master": "14",
      "MCIL": "1"
    }
  }
};

const FacultyPage = () => {
  const { facultyId } = useParams();
  const navigate = useNavigate();
  const faculty = facultiesData[facultyId as keyof typeof facultiesData];

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Faculté non trouvée</p>
            <Button onClick={() => navigate("/ubejaia-guide")} className="mt-4">
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isMedicalFaculty = 'residents' in faculty.stats;
  const isTechnologyFaculty = 'postGrad' in faculty.stats;

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
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <faculty.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {faculty.name}
              </h1>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  {faculty.stats.students} étudiants
                </Badge>
                <Badge variant="secondary">
                  {faculty.stats.teachers} enseignants
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            {faculty.description}
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="departments" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="departments">
              <Building2 className="w-4 h-4 mr-2" />
              Départements
            </TabsTrigger>
            <TabsTrigger value="facilities">
              <MapPin className="w-4 h-4 mr-2" />
              Installations
            </TabsTrigger>
            <TabsTrigger value="info">
              <HelpCircle className="w-4 h-4 mr-2" />
              Informations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="departments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faculty.departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/ubejaia-guide/faculties/${facultyId}/departments/${dept.id}`}
                    className="block h-full transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Card className="h-full hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{dept.name}</CardTitle>
                            <Badge className="mt-2">{dept.code}</Badge>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {dept.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}

              {'specialPrograms' in faculty && faculty.specialPrograms && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-2"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Programmes Spéciaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {faculty.specialPrograms.map((program) => (
                          <Card key={program.code}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{program.name}</CardTitle>
                                <Badge>{program.type}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">
                                {program.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="facilities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faculty.facilities.map((facility, index) => (
                <motion.div
                  key={facility.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{facility.name}</CardTitle>
                      {facility.type && (
                        <Badge variant="outline">{facility.type}</Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      {facility.description && (
                        <p className="text-muted-foreground mb-4">
                          {facility.description}
                        </p>
                      )}
                      {facility.services && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Services</h4>
                          <div className="flex flex-wrap gap-2">
                            {facility.services.map((service) => (
                              <Badge key={service} variant="secondary">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {facility.location && (
                        <p className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {facility.location}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-primary">
                          {faculty.stats.students}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Étudiants en graduation
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-primary">
                          {faculty.stats.teachers}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Enseignants
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-primary">
                          {faculty.stats.staff}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Personnel ATS
                        </p>
                      </div>
                      {'residents' in faculty.stats && (
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-primary">
                            {faculty.stats.residents}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Résidents
                          </p>
                        </div>
                      )}
                      {'postGrad' in faculty.stats && (
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-primary">
                            {faculty.stats.postGrad}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Post-graduation
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p>{faculty.contacts.phone}</p>
                      </div>
                      {faculty.contacts.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <p>{faculty.contacts.email}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p>{faculty.contacts.location}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(faculty.contacts.website, '_blank')}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Visiter le site web
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyPage; 