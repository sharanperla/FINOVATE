import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import DesktopNav from "./components/navigation/DesktopNav"
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  return (
    <Router>
       <div className="app-container">
       <DesktopNav/>
       <div className="page-content">
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/transactions" element={<Transactions/>} />
        {/*<Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
