import { useState } from 'react'
import bookLogo from './assets/books.png'
import { Routes, Route } from 'react-router-dom'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Register from './components/Register'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
    <Routes>
      <Route path='/' element={<Books />} />
      <Route path='/books/:id' element={<SingleBook />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </>
  )
}

export default App
