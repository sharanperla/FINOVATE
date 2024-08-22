import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import DesktopNav from "./components/navigation/DesktopNav"
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import store from './redux/Store'
import { Provider } from 'react-redux'
import PrivateRoute from "./components/PrivateRoute";

function Main() {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Conditionally render DesktopNav based on the route */}
      {location.pathname !== "/"  && <DesktopNav />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}


function App() {
  return (
    <Provider store={store}>
    <Router>
    <Main />
  </Router>
   </Provider>
  );
}

export default App;
