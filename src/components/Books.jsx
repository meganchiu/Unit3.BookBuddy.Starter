import { useState, useEffect } from "react";
import SingleBook from "./SingleBook.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Books() {
  const BOOKS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchText, setSearchText] = useState(""); // Track search text
  const defaultImg = "https://static.wikia.nocookie.net/gijoe/images/b/bf/Default_book_cover.jpg/revision/latest?cb=20240508080922";

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(BOOKS_API_URL);
        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(data.books); // Initially, filteredBooks should have all books
      } catch (error) {
        console.error("Error fetching all books.", error);
      }
    };
    getBooks();
  }, []);

  const handleSearch = (query) => {
    setSearchText(query);
    if (query === "") {
      setFilteredBooks(books); // Show all books if search is empty
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="bookContainer">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} id={book.id} className="bookCard">
              <h4><b>Title: </b>{book.title}</h4>
              <h4><b>Author: </b>{book.author}</h4>
              <img
                src={book.coverimage}
                alt={book.title}
                className="bookCardImg"
                onError={(e) => {
                  e.target.src = defaultImg;
                }}
              />
              <br />
              <SingleBook bookId={book.id} />
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </>
  );
}
