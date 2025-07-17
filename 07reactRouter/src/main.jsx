import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import './index.css'
import Layout from './components/Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import User from './components/User/User'
import Github, { githubInfoLoader } from './components/Github/Github'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Layout/>}>
      <Route path = "" element = {<Home/>}/>
      <Route path = "about" element = {<About/>}/>
      <Route path = "contact" element = {<Contact/>}/>
      <Route path = "user" element = {<User/>}/>
      <Route path = "user/:userid" element = {<User/>}/>
      <Route
        loader = {githubInfoLoader}
        path = "github" element = {<Github/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  
  </StrictMode>,
)
