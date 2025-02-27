import Navbar from "@/pages/Navbar";
import LoginPage from "@/pages/LoginPage";
import InventoryPage from "@/pages/InventoryPage";
import ProfilePage from "@/pages/ProfilePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen flex flex-col">
        <Routes>
          {/* Default route for login */}
          <Route path="/" element={<LoginPage />} />

          {/* Navbar as a layout wrapper */}
          <Route path="/navbar" element={<Navbar />}>
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
