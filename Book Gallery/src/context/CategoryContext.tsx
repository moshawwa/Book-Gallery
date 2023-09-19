import { createContext, useState } from "react";
import { Category } from "../types/Book";

type CategoryContextProps = {
  categories: Category[];
  showEditForm: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);
type CategoryProviderProps = {
  children: React.ReactNode;
};

export default function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const showEditForm = (id: number) => {
    const newCategries = categories.map((element) => {
      if (element.id == id) {
        return { ...element, isEditing: true };
      }

      return element;
    });

    setCategories(newCategries);
  };

  const onEdit = (id: number, newTitle: string) => {
    const newCategories = categories.map((el) => {
      if (el.id == id) {
        return { ...el, isEditing: false, title: newTitle };
      }
      return el;
    });

    setCategories(newCategories);
  };

  return (
    <CategoryContext.Provider
      value={{ categories, showEditForm, onEdit, setCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
