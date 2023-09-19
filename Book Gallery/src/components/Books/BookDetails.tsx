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
            {isLoading && <p>Loading book..</p>}
            {book && <p>{book.name}</p>}
            {book && <p>{book.author.name}</p>}
            {book && <p>{book.category.name}</p>}
            {book && <p>{book.price}</p>}
            {book && <p>{book.about}</p>}
            {book && <p>{book.publishYear}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
