
import InventoryPage from "@/pages/InventoryPage";
import LoginPage from "@/pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen flex flex-col">
        <Routes>
          <Route path="/inventory" element={<LoginPage />} />
          <Route path="/" element={<InventoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
