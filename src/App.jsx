import './App.css'
import { useState } from 'react';
import LandingPage from './home.jsx';
import AssignmentMarketplace from './chore.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'chore') {
    return <AssignmentMarketplace initialView="signup" />;
  }

  return <LandingPage onGetStarted={() => setCurrentPage('chore')} />;
}

export default App;

