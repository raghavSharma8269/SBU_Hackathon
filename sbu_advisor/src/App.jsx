import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
