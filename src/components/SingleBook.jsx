import { useState, useEffect } from "react";
import { fetchSingleBook } from "../API";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleBook({bookId}) {
  const [book, setBook] = useState([]);
  let {id} = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await fetchSingleBook(bookId || id);
        console.log('data.book ', data)
        setBook(data.book);
      } catch (error) {
        console.error(error);
      }
    }
    getBook();
  }, []);

  return (
    <>
      {
        id ? (
          <div>
            <h1>{book.title}</h1>
            <button onClick={() => navigate('/')}>Go Back</button>
          </div>
        ) : (
          <button onClick={()=> navigate(`/books/${bookId}`)}>See Details</button>
        )
      }
    </>
  )
}