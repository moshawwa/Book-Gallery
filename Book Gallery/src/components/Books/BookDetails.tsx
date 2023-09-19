import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiClient, { baseUrl } from "../../services/ApiClient";
import { Book } from "../../types/Book";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>({} as Book);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ApiClient.get(`/Book/${bookId}`).then(({ data }) => {
      setBook(data);
      setIsLoading(false);
    });
  }, [bookId]);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Loading placeholders */}
              <div className="placeholder-container">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <span key={index} className="placeholder col-12"></span>
                ))}
                <span className="placeholder" style={{ width: 25 }}></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>Book Details</h1>
          <div className="row">
            <div className="col-lg-12 p-5">
              <div
                className="card mb-3"
                style={{ maxWidth: "1000px", height: "auto" }}
              >
                <div className="row g-0">
                  <div className="col-4 col-md-4">
                    <img
                      src={`${baseUrl}/images/thumbs/med/${book.image}`}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-8 col-md-8">
                    <div className="card-body">
                      <h5>{book.name}</h5>
                      {book.author && <h5>by {book.author.name}</h5>}
                      {book.category && (
                        <h5 className="card-title">{book.category.name}</h5>
                      )}
                      <p className="card-text"> {book.publishYear}</p>

                      <h5>${book.price}</h5>
                      <small>{book.about}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            h
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
