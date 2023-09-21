import { useEffect, useState } from "react";
import { Category } from "../../types/Book";
import ApiClient from "../../services/ApiClient";

type BookCategoryProps = {
  activeCategory: Category | undefined;
  setActiveCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
};

const BookCategory = ({
  activeCategory,
  setActiveCategory,
}: BookCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  async function getCategories() {
    const allCategory: Category = {
      id: 1000,
      name: "All",
    };

    try {
      const response = await ApiClient.get<Category[]>("/Category");
      //   const newCategories = [allCategory, ...response.data];
      //   setCategories(newCategories);
      //   setActiveCategory(newCategories[0]);
      setCategories([allCategory, ...response.data]);
      setActiveCategory(allCategory);
    } catch (error) {
      console.error("Error calling Categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="nav">
        <ul className="nav nav-tabs">
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                className="nav-item"
                onClick={() => {
                  setActiveCategory(category);
                }}
              >
                <a
                  className={`nav-link ${
                    activeCategory?.name === category.name ? "active" : null
                  } `}
                  aria-current="page"
                  href="#"
                >
                  {category.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default BookCategory;
