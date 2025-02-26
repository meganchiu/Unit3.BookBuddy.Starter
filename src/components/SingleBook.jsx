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
          if (response.ok) {
            setBook((prevBook) => ({ ...prevBook, available: false })); // Update local state
          }
        } catch (error) {
          console.error(error);
        }
  }
  return (
    <>
      {
        id ? (
          <div className="singleBookDetailsCard">
            <div>
              <h2>Title: {book.title}</h2>
              <h2>Author: {book.author}</h2>
              <p><b>Description: </b>{book.description}</p>
              <br/>
              {
                token ? 
                  (<button onClick={reserveBook} disabled={!book.available}>
                    {book.available ? "Check Out Book" : "Checked Out" }
                  </button>) :
                  (<p><b>You must have an account to reserve books.</b></p>)
              } 
              <br/>
              <br/>
              <button onClick={() => navigate('/')}>Go Back</button>
            </div>
          </div>
        ) : (
          <button className="seeDetailsBtn" onClick={()=> navigate(`/books/${bookId}`)}>See Details</button>
        )
      }
    </>
  )
}