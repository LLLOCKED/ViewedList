import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import List from "./pages/List/List";
import Rec from "./pages/Rec/Rec";
import Card from "./pages/Card/Card";

function App() {
  return (
    <div className="container px-2 mx-auto sm:px-6 lg:px-20 xl:px-28">
      <AuthContextProvider>
        <Navbar />
        <main className="p-4 mb-4 bg-gray-50 rounded-xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/recommendations" element={<Rec />} />
            <Route path="/recommendations/:card" element={<Card />} />
          </Routes>
        </main>
      </AuthContextProvider>
    </div>
  );
}

export default App;
