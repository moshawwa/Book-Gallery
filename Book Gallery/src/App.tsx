import { useEffect, useState } from "react";
import "./App.css";
import { Book, Category } from "./types/Book";
import ApiClient from "./services/ApiClient";
import BookCard from "./components/Books/BookCard";
import BookCategory from "./components/Books/BookCategory";

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>();
  useEffect(() => {
    ApiClient.get<Book[]>("/Book").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="container">
      <BookCategory
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="row">
        <div className="col-md-12-mt-6">
          <BookCard activeCategory={activeCategory} />
        </div>
      </div>
    </div>
  );
}

export default App;
