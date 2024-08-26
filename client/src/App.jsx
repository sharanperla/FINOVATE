import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import {persistor, store} from './redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile/Profile";

function Main() {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Conditionally render DesktopNav based on the route */}
      {/* {location.pathname !== "/"  && <DesktopNav />} */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
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
       <PersistGate laoding={null} persistor={persistor}>
    <Router>
    <Main />
  </Router>
  </PersistGate>
   </Provider>
  );
}

export default App;
