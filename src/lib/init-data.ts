import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

const years = [
  {
    id: 'l1',
    name: 'Licence 1',
    order: 1
  },
  {
    id: 'l2',
    name: 'Licence 2',
    order: 2
  },
  {
    id: 'l3',
    name: 'Licence 3',
    order: 3
  },
  {
    id: 'm1',
    name: 'Master 1',
    order: 4
  },
  {
    id: 'm2',
    name: 'Master 2',
    order: 5
  }
];

export const initializeYears = async () => {
  try {
    const yearsCollection = collection(firestore, 'years');
    
    for (const year of years) {
      await setDoc(doc(yearsCollection, year.id), year);
    }
    
    console.log('Years data initialized successfully');
  } catch (error) {
    console.error('Error initializing years data:', error);
  }
}; 