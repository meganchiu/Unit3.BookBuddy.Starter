import { useState } from "react";
import { useAuth } from "../components/AuthContext.jsx"
import { useNavigate } from "react-router-dom";

export default function Register() {
  const USER_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users"
  const {token, setToken} = useAuth();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const [error, setError] = useState('');

  async function registerUser(event) {
    event.preventDefault();

    try {
      let formData = {
        firstname, 
        lastname,
        email,
        password
      };
      const response = await fetch(
        `${USER_API_URL}/register`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData) 
        }
      );
      const data = await response.json();

      if (data.token) {
        // Store the JWT token
        setToken(data.token);

        // Redirct to Account page after setting token and logging in
        navigate("/account");

        // Reset form after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div id="registerContainer">
        <form id="registerForm" onSubmit={registerUser}>
          <label class="registerLabel">
            First Name: <input class="registerInput" id="firstname" value={firstname} onChange={(event) => {setFirstName(event.target.value)}} required/>
          </label>
          <br/>
          <label class="registerLabel">
            Last Name: <input class="registerInput" id="lastname" value={lastname} onChange={(event) => {setLastName(event.target.value)}} required/>
          </label>
          <br/>
          <label class="registerLabel">
            Email: <input class="registerInput" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} required/>
          </label>
          <br/>
          <label class="registerLabel">
            Password:<input class="registerInput" type="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} required/>
          </label>
          <br/>
          <button id="registerBtn">Submit</button>
        </form>
      </div>
      <div id="errorContainer">
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </>
  );
}