// Import: Functionality
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import: Pages
import HomePage from "./pages/HomePage";
import PlannerPage from './pages/PlannerPage';

// Import: CSS
import './App.css'

function App() {
  return (
    <Router>
      <div className='app-container'>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/portal" element={<PlannerPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;