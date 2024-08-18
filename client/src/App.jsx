import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from "./pages/NotFoundPage/NotFound";


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
         {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
