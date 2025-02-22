import { useState } from 'react'
import bookLogo from './assets/books.png'
import { Routes, Route } from 'react-router-dom'
import Books from './components/Books'
import SingleBook from './components/SingleBook'

function App() {
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState([])

  return (
    <>
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/books/:id' element={<SingleBook />} />
      </Routes>
    </>
  )
}

export default App
