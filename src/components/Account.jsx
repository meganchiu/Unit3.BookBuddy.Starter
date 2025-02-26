import { useState, useEffect } from "react"
import { useAuth } from "../components/AuthContext.jsx"
import { useNavigate } from "react-router-dom";

export default function Account() {
  const USER_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users"
  const RESERVATIONS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations"
  const [user, setUser] = useState({});
  const {token, setToken} = useAuth();
  let navigate = useNavigate();
  const [userBooksArr, setUserBooksArr] = useState([]);

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
      getReservations();
    } catch (error) {
      console.error(error);
    }
  }

  async function getReservations() {
    try {
      const response = await fetch(`${RESERVATIONS_API_URL}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      )
      const data = await response.json();
      setUserBooksArr(data.reservation);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getUser = async () => {
        try {
          if (token) {
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
            getReservations();
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error("Error fetching info for user.", error)
        }
      }
    getUser();
  }, []);

  return (
    <>
      <div id="accountContainer">
        <div id="userAccountInfo">
          <h1>Account Info</h1>
          <p><b>First Name: </b>{user.firstname}</p>
          <p><b>Last Name: </b>{user.lastname}</p>
          <p><b>Email: </b>{user.email}</p>
        </div>
        <div id='checkedOutBooks'>
          {userBooksArr && userBooksArr.length > 0 ? (<h1>Checked Out Books</h1>) : (<h1></h1>)}
          { userBooksArr && userBooksArr.length > 0 ? (
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
      </div>
    </>
  )
}