import { Link } from "react-router-dom";
import ApiClient, { baseUrl } from "../../services/ApiClient";
import { useEffect, useState } from "react";
import { Book } from "../../types/Book";

const BookCard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookIsLoading, setBookIsLoading] = useState(false);

  useEffect(() => {
    ApiClient.get<Book[]>("/Book").then((response) => {
      console.log(response.data);
      // setBookIsLoading(false);
      setBooks(response.data);
      setBookIsLoading(false);
    });
    setBookIsLoading(true);
  }, []);
  return (
    <>
      {bookIsLoading ? (
        <>
          <div className="card" aria-hidden="true">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a
                className="btn btn-primary disabled placeholder col-6"
                aria-disabled="true"
              ></a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            {books.map((book) => {
              return (
                <div key={book.id} className="col-md-3">
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
      )}
    </>
  );
};

export default BookCard;
