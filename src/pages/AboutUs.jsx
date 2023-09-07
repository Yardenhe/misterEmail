import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function AboutUs() {
  return (
    <section className="home">
      <h1> About Gmail</h1>
      <Outlet />
      <nav>
        <Link to="/about/vision">Vision</Link>
        <Link to="/about/team">Team</Link>
      </nav>
    </section>
  );
}
