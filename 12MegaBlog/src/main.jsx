import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import {
  AuthLayout,
  Login,
} from "./components/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="/all-posts"
        element={
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        }
      />
      <Route
        path="/add-post"
        element={
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <AuthLayout authentication={true}>
            <EditPost />{" "}
          </AuthLayout>
        }
      />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
