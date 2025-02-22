const cohortName = "2410-ftb-et-web-am";
const BOOKS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
const USER_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users"
const RESERVATIONS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations"

const state = {
  books: [],
}

export const fetchAllBooks = async() => {
  try {
    const response = await fetch(BOOKS_API_URL);
    const data= response.json();
    console.log(data)
    state.books = data;
    return state.books;

  } catch (error) {
    console.error("Error fetching all books!", error)
  }
};

export const fetchSingleBook = async(bookId) => {
  try {
    const response = await fetch(`${BOOKS_API_URL}/${bookId}`);
    const data = await response.json();
    console.log('book details => ', data)
    return data;
  } catch (error) {
    console.error("Error fetching single book", error)
  }
}