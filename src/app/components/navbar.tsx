import "../assets/scss/navbar.scss"
import { SearchInput } from "./s-components/search-input"
import { Link } from "react-router-dom"
export function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to={'/'} className="brand-icon"></Link>
        <SearchInput />
      </div>
    </div>
  )
}
