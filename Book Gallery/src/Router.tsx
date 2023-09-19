import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "./Root";
import DashboardHome from "./components/Dashboard/DashboardHome";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./ProtectedRoute";
import AddBook from "./components/Dashboard/Book/AddBook";
import App from "./App";
import AddAuthor from "./components/Dashboard/Book/AddAuthor";
import BookDetails from "./components/Books/BookDetails";
import EditBook from "./components/Dashboard/Book/EditBook";
import AddCategory from "./components/Dashboard/Book/AddCategory";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route index path="/" element={<App />}></Route>
      <Route path="Login" element={<Login />}></Route>
      <Route path="Register" element={<Register />}></Route>
      <Route path="Books">
        <Route path=":bookId" element={<BookDetails />}></Route>
      </Route>
      <Route path="Dashboard/*" element={<ProtectedRoute />}>
        <Route index element={<DashboardHome />}></Route>
        <Route path="Book">
          <Route path="AddBook" element={<AddBook />}></Route>
          <Route path=":editBookId" element={<EditBook />}></Route>
          <Route path="AddCategory" element={<AddCategory />}></Route>
          <Route path="AddAuthor" element={<AddAuthor />}></Route>
        </Route>
      </Route>
    </Route>
  )
);
