import { useState, useEffect } from "react"
import { useAuth } from "../components/AuthContext.jsx"

export default function Account() {
  const USER_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users"
  const [user, setUser] = useState({});
  const {token, setToken} = useAuth();

  useEffect(() => {
    const getUser = async () => {
        try {
          const response = await fetch(`${USER_API_URL}/me`, 
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          const data = await response.json();
          console.log('user => ', data)
          setUser(data)
        } catch (error) {
          console.error("Error fetching info for user.", error)
        }
      }
    getUser();
  }, []);
  return (
    <>
      <div>
        <h1>First Name: {user.firstname}</h1>
        <h1>Last Name: {user.lastname}</h1>
        <h1>Email: {user.email}</h1>
        { user.books ? 
        (
          <h2>User has no books checked out</h2>
        ) :
        (
          <h2>{user.books}</h2>
        )
        }
      </div>
    </>
  )
}