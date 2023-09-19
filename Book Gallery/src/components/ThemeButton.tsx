// import { CiDark, CiLight } from "react-icons/ci";
// import { useTheme } from "../context/ThemeContext";

// const ThemeButton = () => {
//   const { theme, toggleTheme } = useTheme();

//   const handleToggleClick = () => {
//     toggleTheme();
//   };
//   // const toggleDarkMode = () => {
//   //   document.body.classList.toggle("dark-mode");
//   //   if (document.body.classList.contains("dark-mode")) {
//   //     localStorage.setItem("darkMode", "enabled");
//   //   } else {
//   //     localStorage.setItem("darkMode", "disabled");
//   //   }
//   // };
//   const toggleDarkMode = () => {
//     document.body.classList.toggle("dark-mode");
//   };

//   const toggleLightMode = () => {
//     document.body.classList.remove("dark-mode");
//   };

//   return (
//     <button
//       className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`}
//       onClick={"dark-mode" ? toggleDarkMode : toggleLightMode}
//     >
//       {theme === "dark" ? <CiLight /> : <CiDark />}
//     </button>
//   );
// };

// export default ThemeButton;
