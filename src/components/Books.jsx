import { useState, useEffect } from "react"
import { fetchAllBooks } from "../API";
import SingleBook from "./SingleBook.jsx";
export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
        try {
        const data = await fetchAllBooks();
        console.log('books data => ', data.books)
        setBooks(data.books);
        } catch (error) {
          console.error(error);
        }
      }
    getBooks();
  }, []);

  return (
    <>
      <div>
        {books.map((book) => (
          <div key={book.id} id={book.id} className="bookCard">
            <h4><b>Title: </b>{book.title}</h4>
            <h4><b>Author: </b>{book.author}</h4>
            <img src={book.coverimage} alt={book.title} />
            <SingleBook bookId={book.id} />
          </div>
        ))}
      </div>
    </>
  )
};