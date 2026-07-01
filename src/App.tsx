import { useEffect, useState } from "react";
import { LandingApp } from "./landing/LandingApp";
import { CloudPhoneLoader } from "./landing/shared/CloudPhoneLoader";

const getRoute = () => window.location.hash.replace(/^#\/?/, "");

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "cloud-phone") return <CloudPhoneLoader />;
  return <LandingApp />;
}

export default App;
