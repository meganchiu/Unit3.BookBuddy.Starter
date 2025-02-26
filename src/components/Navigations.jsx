/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

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