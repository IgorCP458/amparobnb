import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListingPage from './pages/ListingPage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className='w-screen overflow-x-hidden min-h-screen bg-zinc-900'>  
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/listing/:id' element={<ListingPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App
