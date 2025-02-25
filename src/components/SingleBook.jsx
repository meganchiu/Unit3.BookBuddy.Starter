import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
export default function SingleBook({bookId}) {
  const BOOKS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
  const [book, setBook] = useState({});
  const {token, setToken} = useAuth();

  let {id} = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetch(`${BOOKS_API_URL}/${bookId || id}`)
        const data = await response.json();
        setBook(data.book);
      } catch (error) {
        console.error("Error fetching single book.", error)
      }
    }
    getBook();
  }, []);

  async function reserveBook() {
        try {
          const response = await fetch(`${BOOKS_API_URL}/${bookId || id}`,
            {
              method: "PATCH",
              body: JSON.stringify({available: false}),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          const data = response.json();
        } catch (error) {
          console.error(error);
        }
  }
  return (
    <>
      {
        id ? (
          <div>
            <h2>Title: {book.title}</h2>
            <h2>Author: {book.author}</h2>
            <p><b>Description: </b>{book.description}</p>
            {
              token ? 
                (<button onClick={reserveBook}>Check Out Book</button>) :
                (<h1>Not Logged In</h1>)
            } 
            <br/>
            <br/>
            <button onClick={() => navigate('/')}>Go Back</button>
          </div>
        ) : (
          <button onClick={()=> navigate(`/books/${bookId}`)}>See Details</button>
        )
      }
    </>
  )
}