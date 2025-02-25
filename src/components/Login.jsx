import { useState } from "react";
import { useAuth } from "../components/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const USER_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {token, setToken} = useAuth();
  let navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    try {
      let formData = {
        email,
        password
      }
      const response = await fetch(`${USER_API_URL}/login`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        }
      )
      const data = await response.json();
      if (data.token) {
        // Store the JWT token
        setToken(data.token);

        // Redirct to Account page after setting token and logging in
        navigate("/account");

        // Reset form after successful submission
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Failed to signup.");
      }
    } catch (error) {
      console.error
    }
  }

  return (
    <>
      <form id="loginForm" onSubmit={loginUser}>
        <label>
          Email: <input value={email} onChange={()=>{setEmail(event.target.value)}} />
        </label>
        <label>
          Password: <input type='password' value={password} onChange={()=>{setPassword(event.target.value)}} />
        </label>
        <button>Login</button>
      </form>
    </>
  )
}