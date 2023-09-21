export type Book = {
  id: number;
  name: string;
  price: number;
  discount: number;
  publishYear: number;
  image: string;
  category: Category;
  author: Author;
  translator: any;
  publisher: Publisher;
  title: string;
  coverUrl: string;
  about: string;
  value: string;
};

export type Category = {
  id: number;
  name: string;
  isEditing?: boolean;
};

export type Author = {
  id: number;
  name: string;
};

export type Publisher = {
  id: number;
  name: string;
  logo: string;
};
