import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";

const Root = () => {
  return (
    <>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Root;
