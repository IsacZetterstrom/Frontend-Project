import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Navbar {...{ isLoggedIn, setIsLoggedIn }} />
      <main>
        <Outlet context={[isLoggedIn, setIsLoggedIn]} />
      </main>
      <Footer />
    </>
  );
}

export default App;
