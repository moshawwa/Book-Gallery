import { Link } from "react-router-dom";
import ApiClient, { baseUrl } from "../../services/ApiClient";
import { useEffect, useState } from "react";
import { Book } from "../../types/Book";

const BookCard = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    ApiClient.get<Book[]>("/Book").then((response) => {
      console.log(response.data);
      setBooks(response.data);
    });
  }, []);
  return (
    <>
      <div className="row">
        {books.map((book) => {
          return (
            <div key={book.id} className="col-md-4">
              <div
                className="card"
                style={{ backgroundColor: "#f0f0f0", padding: "10px" }}
              >
                <img
                  src={`${baseUrl}/images/thumbs/med/${book.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <Link
                    style={{ textDecoration: "none", color: "blue" }}
                    to={`/Books/${book.id}`}
                  >
                    {book.name}
                  </Link>
                  <p className="card-text" style={{ color: "green" }}>
                    {book.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookCard;
