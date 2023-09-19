import { useEffect } from "react";
import "./App.css";
import { Book } from "./types/Book";
import ApiClient from "./services/ApiClient";
import BookCard from "./components/Books/BookCard";

function App() {
  useEffect(() => {
    ApiClient.get<Book[]>("/Book").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="container">
      {/* <BookCategory
        selectedCategory={""}
        onCategoryChange={function (): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      <div className="row">
        <div className="col-md-12">
          <BookCard />
        </div>
      </div>
    </div>
  );
}

export default App;
