import { useState, useEffect } from "react";
import { registerUser } from "../API/index.js";
export default function Register() {
  const [token, setToken] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function registerUser(event) {
    event.preventDefault();

    console.log({firstname});
    console.log({lastname});
    console.log({email});

    try {
      let formData = {
        firstname, 
        lastname,
        email,
        password
      };
      const response = await fetch(
        'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData) 
        }
      );
      const data = await response.json();

      console.log(data);

      if (data.token) {
        // Store the JWT token
        setToken(data.token);

        // Reset form after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Failed to signup.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form id="registerForm" onSubmit={registerUser}>
        <label>
          First Name: <input id="firstname" value={firstname} onChange={(event) => {setFirstName(event.target.value)}} />
        </label>
        <br/>
        <label>
          Last Name: <input id="lastname" value={lastname} onChange={(event) => {setLastName(event.target.value)}} />
        </label>
        <br/>
        <label>
          Email: <input id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
        </label>
        <br/>
        <label>
          Password: <input type="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
        </label>
        <br/>
        <button>Submit</button>
      </form>
    </>
  );
}