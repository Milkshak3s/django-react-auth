import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from './pages/Register';
import Profile from "./pages/Profile";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css';
import ZNavbar from "./components/ZNavbar";
import NewSquad from './pages/NewSquad';
import Squads from './pages/Squads';


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ZNavbar />
        <Router>
          <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><Squads /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/newSquad" element={<ProtectedRoute><NewSquad /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
