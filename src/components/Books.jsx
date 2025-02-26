import { useState, useEffect } from "react"
import SingleBook from "./SingleBook.jsx";
export default function Books() {
  const BOOKS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
  const [books, setBooks] = useState([]);
  const defaultImg = "https://static.wikia.nocookie.net/gijoe/images/b/bf/Default_book_cover.jpg/revision/latest?cb=20240508080922"

  useEffect(() => {
    const getBooks = async () => {
        try {
          const response = await fetch(BOOKS_API_URL)
          const data = await response.json();
          setBooks(data.books);
        } catch (error) {
          console.error("Error fetching all books.", error)
        }
      }
    getBooks();
  }, []);

  return (
    <>
      <div className="bookContainer">
        {books.map((book) => (
          <div key={book.id} id={book.id} className="bookCard">
            <h4><b>Title: </b>{book.title}</h4>
            <h4><b>Author: </b>{book.author}</h4>
            <img src={book.coverimage} alt={book.title} className="bookCardImg" 
              onError={(e) => {
                e.target.src = defaultImg;
              }}/>
            <br/>
            <SingleBook bookId={book.id} />
          </div>
        ))}
      </div>
    </>
  )
};