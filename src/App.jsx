import { useState } from 'react'
import bookLogo from './assets/books.png'
import { Routes, Route } from 'react-router-dom'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'
import Navigations from './components/Navigations'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <Navigations />
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/books/:id' element={<SingleBook />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </>
  )
}

export default App
