const BOOKS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
const USER_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users"
const RESERVATIONS_API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations"

export const fetchAllBooks = async () => {
  try {
    const response = await fetch(BOOKS_API_URL)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all books.", error)
  }
}

export const fetchSingleBook = async (bookId) => {
  try {
    const response = await fetch(`${BOOKS_API_URL}/${bookId}`)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching single book.", error)
  }
}

export const registerUser = async(userObj) => {
  try {
    const response = await fetch(`${USER_API_URL}/register`,
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userObj)
      }
    )
    const data = response.json();
    console.log(data.token)
    if (data.token) {
      return data;
    } else {
      throw new Error('Failed to signup.'); 
    }
  } catch (error) {
    console.error(error);
  }
}