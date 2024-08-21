import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import DesktopNav from "./components/navigation/DesktopNav"
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";

function Main() {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Conditionally render DesktopNav based on the route */}
      {location.pathname !== "/" && <DesktopNav />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
    <Main />
  </Router>
  );
}

export default App;
