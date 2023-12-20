import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";

import BreakPage from "./pages/Break";
import DecodePage from "./pages/Decode";
import EncodePage from "./pages/Encode";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='break' element={<BreakPage />} />
        <Route path='decode' element={<DecodePage />} />
        <Route path='encode' element={<EncodePage />} />

        <Route path='*' element={<Navigate to='/encode' />} />
      </Routes>
    </Router>
  );
}

export default App;
