import { useState, useEffect } from "react"
import { useAuth } from "../components/AuthContext.jsx"
import { useNavigate } from "react-router-dom";

export default function Account() {
  const USER_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users"
  const RESERVATIONS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations"
  const [user, setUser] = useState({});
  const {token, setToken} = useAuth();
  let navigate = useNavigate();

  async function returnBook(bookId) {
    try {
      const response = await fetch(`${RESERVATIONS_API_URL}/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      )
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

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
          setUser(data)
        } catch (error) {
          console.error("Error fetching info for user.", error)
        }
      }
    getUser();
  }, []);

  let userBooksArr = user.books;

  return (
    <>
      <div>
        <h1>First Name: {user.firstname}</h1>
        <h1>Last Name: {user.lastname}</h1>
        <h1>Email: {user.email}</h1>
        {userBooksArr && userBooksArr.length > 0 ? (
            userBooksArr.map((book) => (
            <div key={book.id} className="userCheckedOutBook">
              <h4>Title: {book.title}</h4>
              <h4>Author: {book.author}</h4>
              <button onClick={()=>returnBook(book.id)}>Return Book</button>
            </div>
            ))
          ) : (
          <h2>User has no books checked out</h2>
      )}
      </div>
    </>
  )
}