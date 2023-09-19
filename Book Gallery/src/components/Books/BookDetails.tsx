import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiClient from "../../services/ApiClient";
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
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {isLoading ? (
              <p>Loading book..</p>
            ) : (
              <>
                <div>
                  {book.name}
                  {book.author.name}
                  {book.category.name}
                  {book.about}
                  {book.price}
                  {book.publishYear}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
