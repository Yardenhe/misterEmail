import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { AboutUs } from "./pages/AboutUs";
import { Home } from "./pages/Home";
import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";
import { AboutVision } from "./cmps/AboutVision";
import { AboutTeam } from "./cmps/AboutTeam";
import { EmailIndex } from "./pages/EmailIndex";
import EmailDetails from "./pages/EmailDetails";

export function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="container">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AboutUs />} path="/about">
              <Route path="/about/team" element={<AboutTeam />} />
              <Route path="/about/vision" element={<AboutVision />} />
            </Route>
            <Route path="/Email" element={<EmailIndex />} />
            <Route path="/Email/details/:emailId" element={<EmailDetails />} />
          </Routes>
        </main>

        <AppFooter />
      </section>
    </Router>
  );
}
