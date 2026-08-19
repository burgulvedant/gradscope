import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { PlannerPage } from './pages/PlannerPage';
import { ResultsPage } from './pages/ResultsPage';

type Page = 'landing' | 'planner' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [scholarshipPercent, setScholarshipPercent] = useState<number>(0);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleCalculate = (city: string, university: string, course: string, scholarship: number) => {
    setSelectedCity(city);
    setSelectedUniversity(university);
    setSelectedCourse(course);
    setScholarshipPercent(scholarship);
    setCurrentPage('results');
  };

  return (
    <div className="bg-bg-light-warm text-text-charcoal min-h-screen font-sans flex flex-col justify-between selection:bg-brand-teal/20 selection:text-brand-teal-dark">
      
      {/* Dynamic Navbar */}
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Main Pages View Wrapper */}
      <main className="flex-grow">
        {currentPage === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'planner' && (
          <PlannerPage 
            onCalculate={handleCalculate} 
            onBackToHome={() => handleNavigate('landing')} 
          />
        )}
        
        {currentPage === 'results' && (
          <ResultsPage
            city={selectedCity}
            university={selectedUniversity}
            course={selectedCourse}
            scholarshipPercent={scholarshipPercent}
            onBackToPlanner={() => setCurrentPage('planner')}
          />
        )}
      </main>

      {/* Common Footer */}
      {currentPage === 'landing' && <Footer />}
    </div>
  );
}

export default App;
