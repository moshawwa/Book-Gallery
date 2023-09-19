import { Book } from "../../types/Book";
import ApiClient from "../../services/ApiClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../Models/Model";

const DashboardHome = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(-1);
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      console.log("submit");
      handleDelete(id);
      toast.success("Book has been Deleted successfully");
    }, 1500);
  };

  useEffect(() => {
    ApiClient.get<Book[]>("/Book")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error calling books:", error);
      });
  }, []);

  const handleDelete = (bookId: number) => {
    ApiClient.delete(`/Book/${bookId}`)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const navigate = useNavigate();

  const handleEdit = (editBookId: number) => {
    navigate(`/Dashboard/Book/${editBookId}`, { replace: true });
  };
  return (
    <>
      <Modal showModal={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Book</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleModalClose}
          ></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to Delete?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleModalClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleModalSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </Modal>
      <div className="row">
        <div className="col-md-12">
          <h1>Home Panel </h1>
          <table className="table">
            <thead>
              <tr className="table-primary">
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Category Name</th>
                <th>Price</th>
                <th>Publish Year</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr className="table-warning" key={index}>
                  <td>{book.name}</td>
                  <td>{book.author.name}</td>
                  <td>{book.category.name}</td>
                  <td>{book.price}</td>
                  <td>{book.publishYear}</td>
                  <td>
                    <button
                      onClick={() => {
                        setShowModal(!showModal);
                        setId(book.id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="btn btn-outline-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
