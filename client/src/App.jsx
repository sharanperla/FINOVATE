import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";


function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<HomePage />} />
        {/*<Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
