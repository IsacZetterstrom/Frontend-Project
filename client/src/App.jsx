import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import cacheService from "./service/CacheService";
import fetchService from "./service/FetchService";

function App() {
  /**
   * @author Niklas Nguyen
   * @discription everytime the url changes it checks if there is a token i localstorage if it has it checks if the token is still valid
   * and send out a boolen data to check if a user is logged in with a valid token
   */
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    (async function () {
      const hasToken = cacheService.isLoggedIn();
      if (hasToken) {
        const res = await fetchService.fetchRes("/profile/user", "GET");
        if (res.status >= 400) {
          setIsLoggedIn(false);
          cacheService.removeLocalValue("token");
        } else {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, [isLoggedIn, useLocation().pathname]);

  return (
    <>
      <Navbar {...{ isLoggedIn, setIsLoggedIn }} />
      <main>
        <Outlet context={{ setIsLoggedIn, isLoggedIn }} />
      </main>
      <Footer />
    </>
  );
}

export default App;
