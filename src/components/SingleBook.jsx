import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleBook({bookId}) {
  const BOOKS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
  const [book, setBook] = useState({});
  let {id} = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetch(`${BOOKS_API_URL}/${bookId || id}`)
        const data = await response.json();
        console.log(data.book)
        setBook(data.book);
      } catch (error) {
        console.error("Error fetching single book.", error)
      }
    }
    getBook();
  }, []);

  return (
    <>
      {
        id ? (
          <div>
            <h2>Title: {book.title}</h2>
            <h2>Author: {book.author}</h2>
            <p><b>Description: </b>{book.description}</p>
            <button onClick={() => navigate('/')}>Go Back</button>
          </div>
        ) : (
          <button onClick={()=> navigate(`/books/${bookId}`)}>See Details</button>
        )
      }
    </>
  )
}