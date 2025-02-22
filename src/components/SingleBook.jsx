import { fetchSingleBook } from "../API/index.js"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SingleBook({bookId}) {
  const [book, setBook] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => { 
    const getBook = async() => {
      try {
        const data = await fetchSingleBook(bookId || id);
        console.log('single book data => ', data.book);
        setBook(data.book);
      } catch (error) {
        console.error(error);
      }
    }
    getBook();
  }, [])

  return (
    <>
      <div>
        {id ? (
          <div>
            <h1><b>Title: </b>{book.title}</h1>
            <h1><b>Author: </b>{book.author}</h1>
            <p><b>Description: </b>{book.description}</p>
            <button onClick={() => navigate('/')}>Back to All Books</button>
          </div>
        ) : (
          <button onClick={() => navigate(`/books/${bookId}`)}>See Details</button>
        )}
      </div>
    </>
  )
}