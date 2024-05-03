import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import CreatePost from './components/CreatePost'
import ViewPost from './components/ViewPost'
function App() {

  return (
    <>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path={"/"} element={<CreatePost/>}/>
        <Route path={"/all"} element={<ViewPost/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
