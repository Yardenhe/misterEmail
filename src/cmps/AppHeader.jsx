import { Link, NavLink } from "react-router-dom"
import imgUrl from "../assets/imgs/gmail-logo.png"

export function AppHeader() {
  return (
    <header className="app-header">



      <nav>
        <NavLink to="/"><span>Home</span></NavLink>
        <NavLink to="/about"><span>About</span></NavLink>
        <NavLink to="/email"><span>Email</span></NavLink>
      </nav>
      <Link to="/email/compose?to=help@gmail.com&subject=Help">
        <h1>help ?</h1>
      </Link>
    </header>
  );
}
