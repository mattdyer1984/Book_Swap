import { Link, NavLink } from "react-router-dom";
import "./nav.css";

function Nav() {
  return (
    <nav className="navBar">
      <a href="/" className="bookSwap">
        Books Swap
      </a>
      <div className="right-links">
        <NavLink to="/available/">Available books</NavLink>
        <NavLink to="/claimed/">Claimed Books</NavLink>
        <NavLink to="/add-book">Add book</NavLink>
      </div>
    </nav>
  );
}

export default Nav;
