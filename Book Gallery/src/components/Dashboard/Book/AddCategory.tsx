import { useEffect, useState } from "react";
import ApiClient from "../../../services/ApiClient";
import { Category } from "../../../types/Book";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Modal from "../../Models/Model";

export const schema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
});

type BookFormData = z.infer<typeof schema>;
const AddCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [id, setId] = useState(-1);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState(-1);
  const handleModalClose = () => {
    setShowModal(false);
  };

  function getCategory() {
    ApiClient.get<Category[]>("/Category")
      .then((response) => {
        console.log(response.data);
        setCategorys(response.data);
      })
      .catch((error) => {
        console.error("Error calling Categories:", error);
      });
  }

  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    setTimeout(() => {
      setIsLoadingDelete(false);
      setShowModal(false);
      console.log("submit");
      handleDelete(id);
      toast.success("Category has been Deleted successfully");
    }, 1500);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({ resolver: zodResolver(schema) });

  const handleAddCategory = (data: BookFormData) => {
    ApiClient.post("/Category", { id: 0, name: data.category }).then(
      (response) => {
        console.log(response);
        getCategory();
      }
    );
    setIsLoadingAdd(true);
    setTimeout(() => {
      setIsLoadingAdd(false);
      console.log("submit");
      toast.success("Category has been Added successfully");
    }, 1500);

    reset();
  };

  useEffect(() => {
    ApiClient.get<Category[]>("/Category")
      .then((response) => {
        console.log(response.data);
        setCategorys(response.data);
        getCategory();
      })
      .catch((error) => {
        console.error("Error calling Categories:", error);
      });
  }, []);

  const handleDelete = (categoryId: number) => {
    ApiClient.delete(`/Category/${categoryId}`)
      .then(() => {
        setCategorys((prevBooks) =>
          prevBooks.filter((category) => category.id !== categoryId)
        );
      })
      .catch((error) => {
        console.error("Error deleting Category:", error);
      });
  };

  const [editingCategory, setEditingCategory] = useState("");

  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingCategory(event.target.value);
  };
  const handleSaveEdit = (CaegoryName: string) => {
    const data = categorys;
    setCategorys(
      categorys!.map((el) => {
        if (editingId === el.id) return { ...el, name: editingCategory };
        else return el;
      })
    );
    if (CaegoryName === editingCategory) {
      setEditingId(-1);
      console.log("nothing change");
    } else {
      setIsLoadingEdit(true);
      ApiClient.put(`/Category/${editingId}`, {
        name: editingCategory,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("Category edited successfully");
          getCategory();
          setIsLoadingEdit(false);
        })
        .catch((error) => {
          setCategorys(data);
          setIsLoadingEdit(false);
          console.error("Error editing Category:", error);
          toast.error("Error editing Category. Please try again later.");
        });
      setEditingId(-1);
    }
  };

  return (
    <>
      <Modal showModal={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Category</h5>
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
            <div className="card-header">Add Category</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleAddCategory)}>
                <div className="mb-4">
                  <label htmlFor="Category"> Category :</label>
                  <input
                    {...register("category")}
                    id="Category"
                    className="form-control"
                    type="text"
                  />
                  {errors.category && (
                    <span className="text-danger">
                      {errors.category.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoadingAdd}
                >
                  {isLoadingAdd ? (
                    <>
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
                <th>Category Name</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {categorys?.map((category) => (
                <tr className="table-warning" key={category.id}>
                  <th scope="col">{category.id}</th>

                  {category.id === editingId ? (
                    <>
                      <td>
                        {" "}
                        <input
                          value={editingCategory}
                          onChange={handleChangeEdit}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            handleSaveEdit(category.name);
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
                      <td>{category.name}</td>

                      <td>
                        <button
                          onClick={() => {
                            setId(category.id);
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
                            setEditingId(category.id);
                            setEditingCategory(category.name);
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

export default AddCategory;
