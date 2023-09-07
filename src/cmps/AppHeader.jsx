import { Link, NavLink } from "react-router-dom";
import imgUrl from "../assets/imgs/gmail-logo.png";

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="container">
        <h1>Gmail</h1>
        <img className="logo-header" src={imgUrl} alt="" />

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/Email">Email</NavLink>
        </nav>
      </section>
    </header>
  );
}
