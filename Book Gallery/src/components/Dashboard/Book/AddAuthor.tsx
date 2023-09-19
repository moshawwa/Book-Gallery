import { useEffect, useState } from "react";
import ApiClient from "../../../services/ApiClient";
import { Author } from "../../../types/Book";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Modal from "../../Models/Model";

export const schema = z.object({
  author: z.string().min(1, { message: "Author is required" }),
});

type BookFormData = z.infer<typeof schema>;

const AddAuthor = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const [authors, setAuthors] = useState<Author[]>([]);
  const [id, setId] = useState(-1);
  const [editingId, setEditingId] = useState(-1);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    setTimeout(() => {
      setIsLoadingDelete(false);
      setShowModal(false);
      console.log("submit");
      handleDelete(id);
      toast.success("Author has been Deleted successfully");
    }, 1500);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({ resolver: zodResolver(schema) });

  const handleAddAuthor = (data: BookFormData) => {
    ApiClient.post("/Author", { id: 0, name: data.author }).then((response) => {
      console.log(response);
      getAuthors();
    });
    setIsLoadingAdd(true);
    setTimeout(() => {
      setIsLoadingAdd(false);
      console.log("submit");
      toast.success("Author has been Added successfully");
    }, 1500);

    reset();
  };

  function getAuthors() {
    ApiClient.get<Author[]>("/Author")
      .then((response) => {
        console.log(response.data);
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error calling Categories:", error);
      });
  }

  useEffect(() => {
    getAuthors();
  }, []);

  const handleDelete = (authorId: number) => {
    ApiClient.delete(`/Author/${authorId}`)
      .then(() => {
        setAuthors((prevBooks) =>
          prevBooks.filter((author) => author.id !== authorId)
        );
      })
      .catch((error) => {
        console.error("Error deleting Author:", error);
      });
  };

  const [editingAuthor, setEditingAuthor] = useState("");

  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingAuthor(event.target.value);
  };
  const handleSaveEdit = (NameAuthor: string) => {
    const data = authors;
    setAuthors(
      authors!.map((el) => {
        if (editingId === el.id) return { ...el, name: editingAuthor };
        else return el;
      })
    );
    if (NameAuthor === editingAuthor) {
      setEditingId(-1);
      console.log("nothing change");
    } else {
      setIsLoadingEdit(true);
      ApiClient.put(`/Author/${editingId}`, {
        name: editingAuthor,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("Author edited successfully");
          getAuthors();
          setIsLoadingEdit(false);
        })
        .catch((error) => {
          setAuthors(data);
          setIsLoadingEdit(false);
          console.error("Error editing Author:", error);
          toast.error("Error editing Author. Please try again later.");
        });
      setEditingId(-1);
    }
  };

  return (
    <>
      <Modal showModal={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Author</h5>
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
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
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
      <div className="row mt-3 justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Add Author</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleAddAuthor)}>
                <div className="mb-4">
                  <label htmlFor="author"> Author :</label>
                  <input
                    {...register("author")}
                    id="author"
                    className="form-control"
                    type="text"
                  />
                  {errors.author && (
                    <span className="text-danger">{errors.author.message}</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoadingAdd}
                >
                  {isLoadingAdd ? (
                    <>
                      {" "}
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                      <span role="status">Loading...</span>
                    </>
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr className="table-primary">
                <th>ID</th>
                <th>Author Name</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {authors?.map((author) => (
                <tr className="table-warning" key={author.id}>
                  <th scope="col">{author.id}</th>

                  {author.id === editingId ? (
                    <>
                      <td>
                        {" "}
                        <input
                          value={editingAuthor}
                          onChange={handleChangeEdit}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            handleSaveEdit(author.name);
                          }}
                          style={{ display: "initial" }}
                          className="btn btn-outline-success"
                        >
                          {isLoadingEdit ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              ></span>
                              <span role="status">Loading...</span>
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{author.name}</td>

                      <td>
                        <button
                          onClick={() => {
                            setId(author.id);
                            setShowModal(!showModal);
                          }}
                          className="  btn btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setEditingId(author.id);
                            setEditingAuthor(author.name);
                          }}
                          className="btn btn-outline-primary"
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddAuthor;
