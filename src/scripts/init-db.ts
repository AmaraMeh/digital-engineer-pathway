import { initializeYears } from '../lib/init-data.ts';

const initializeDatabase = async () => {
  try {
    await initializeYears();
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Run the initialization
initializeDatabase(); 