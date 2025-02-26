import { Link } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function Navigations() {
  const {token} = useAuth();

  return (
    <>
      <div id="navBar">
        { token ? (
          <div>
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/logout">Logout</Link>
            </div>
          ) : (
            <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </div>
          )
        }
      </div>
    </>
  )
}