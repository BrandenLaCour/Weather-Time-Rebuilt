import LandingPage from "views/LandingPage/LandingPage.jsx";
import About from "views/About/About.jsx";

var indexRoutes = [
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/about", name: "about", component: About },
  { path: "/", name: "Landing Page", component: LandingPage }
];

export default indexRoutes;
