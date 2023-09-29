import { Link, NavLink } from "react-router-dom"
import imgUrl from "../assets/imgs/gmail-logo.png"

export function AppHeader() {
  return (
    <header className="app-header">



      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/email">Email</NavLink>
      </nav>

    </header>
  );
}
