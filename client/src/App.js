import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./pages/homepage/Home";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
