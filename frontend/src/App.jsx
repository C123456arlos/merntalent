import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'

function App() {
const {isSignedIn} = useUser()
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/problems' element={isSignedIn ? <ProblemsPage></ProblemsPage> : <Navigate to={'/'}></Navigate>}></Route>
    </Routes>
    <Toaster toastOptions={{duration:3000}}></Toaster>
    </>
  )
}

export default App
