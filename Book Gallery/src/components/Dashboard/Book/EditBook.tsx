import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ApiClient from "../../../services/ApiClient";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Author, Category } from "../../../types/Book";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];

const schema = z.object({
  name: z.string().nonempty({ message: "Book Name is required" }),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, { message: "at least 1 dollar" }),
  about: z.string().nonempty({ message: "About is required" }),
  publishyear: z
    .number({ invalid_type_error: "Publish year is required" })
    .min(1, { message: "Publish is required" }),
  pagecount: z
    .number({ invalid_type_error: "Page count is required" })
    .min(1, { message: "at least 1 page" }),
  ImageFile: z
    .instanceof(FileList)
    // .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => (files[0] == null ? true : files?.[0]?.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        files[0] == null
          ? true
          : ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
  CategoryId: z.string().trim().nonempty({ message: "Category is required" }),
  AuthorId: z.string().nonempty({ message: "Author is required" }),
});

type BookFormData = z.infer<typeof schema>;

const EditBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>();
  const [authors, setAuthors] = useState<Author[]>();

  const { editBookId } = useParams();
  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm<BookFormData>({ resolver: zodResolver(schema) });

  const handleEditBook = (data: BookFormData) => {
    const bookData = new FormData();

    bookData.append("Name", data.name);
    bookData.append("Price", String(data.price));
    if (data.ImageFile) bookData.append("ImageFile", data.ImageFile[0]);
    bookData.append("About", data.about);
    bookData.append("PublishYear", String(data.publishyear));
    bookData.append("PageCount", String(data.pagecount));
    bookData.append("AuthorId", data.AuthorId);
    bookData.append("PublisherId", "1");
    bookData.append("CategoryId", data.CategoryId);

    setIsLoading(true);
    ApiClient.put(`/Book/${editBookId}`, bookData).then((response) => {
      console.log(response.data);
      setIsLoading(false);
      toast.success("Book has been updated successfully");
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    ApiClient.get("/Category").then((response) => {
      setCategories(response.data);
    });
    ApiClient.get("/Author").then((response) => {
      setAuthors(response.data);
    });

    ApiClient.get(`/Book/${editBookId}`).then((response) => {
      setValue("name", response.data.name);
      setValue("price", response.data.price);
      setValue("about", response.data.about);
      setValue("publishyear", response.data.publishYear);
      setValue("pagecount", response.data.pageCount);
      setValue("pagecount", response.data.pageCount);
      setTimeout(() => {
        console.log("test");
        setValue("CategoryId", response.data.category.id);
        setValue("AuthorId", response.data.author.id);
      }, 2000);
      console.log(response.data);
    });
  }, [editBookId]);

  return (
    <div className="row mt-3 justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">Edit book</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleEditBook)}>
              <div className="mb-4">
                <label htmlFor="name">Book name :</label>
                <input
                  {...register("name")}
                  id="name"
                  className="form-control"
                  type="text"
                />
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price">price :</label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  id="price"
                  className="form-control"
                  type="number"
                  step=".01"
                />
                {errors.price && (
                  <span className="text-danger">{errors.price.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="about">About :</label>
                <textarea
                  {...register("about")}
                  name="about"
                  className="form-control"
                  id="about"
                ></textarea>
                {errors.about && (
                  <span className="text-danger">{errors.about.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="publishyear">Publish year :</label>
                <input
                  {...register("publishyear", { valueAsNumber: true })}
                  id="publishyear"
                  className="form-control"
                  type="number"
                />
                {errors.publishyear && (
                  <span className="text-danger">
                    {errors.publishyear.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="pagecount">Page count :</label>
                <input
                  {...register("pagecount", { valueAsNumber: true })}
                  id="pagecount"
                  className="form-control"
                  type="number"
                />
                {errors.pagecount && (
                  <span className="text-danger">
                    {errors.pagecount.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="ImageFile">Image :</label>
                <input
                  {...register("ImageFile")}
                  id="ImageFile"
                  className="form-control"
                  type="file"
                />
                {errors.ImageFile && (
                  <span className="text-danger">
                    {errors.ImageFile.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="CategoryId">Category :</label>
                <select className="form-control" {...register("CategoryId")}>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="AuthorId">Author :</label>
                <select className="form-control" {...register("AuthorId")}>
                  {authors?.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span className="ms-2" role="status">
                      Editing book
                    </span>
                  </>
                ) : (
                  "Edit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
