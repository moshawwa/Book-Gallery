import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ApiClient from "../../../services/ApiClient";
import { useEffect, useState } from "react";
import { Author, Category } from "../../../types/Book";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];

export const schema = z.object({
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
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  CategoryId: z.string().trim().nonempty({ message: "Category is required" }),
  AuthorId: z.string().nonempty({ message: "Author is required" }),
});

type BookFormData = z.infer<typeof schema>;

const AddBook = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [authors, setAuthors] = useState<Author[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ApiClient.get("/Category").then((response) => {
      setCategories(response.data);
    });
    ApiClient.get("/Author").then((response) => {
      setAuthors(response.data);
    });
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({ resolver: zodResolver(schema) });

  const handleAddBook = (data: BookFormData) => {
    const bookData = new FormData();

    bookData.append("Name", data.name);
    bookData.append("Price", String(data.price));
    bookData.append("ImageFile", data.ImageFile[0]);
    bookData.append("About", data.about);
    bookData.append("PublishYear", String(data.publishyear));
    bookData.append("PageCount", String(data.pagecount));
    bookData.append("AuthorId", data.AuthorId);
    bookData.append("PublisherId", "1");
    bookData.append("CategoryId", data.CategoryId);

    ApiClient.post("/Book", bookData).then((response) => console.log(response));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("submit");
      toast.success("Book has been Added successfully");
    }, 1500);

    reset();
  };

  return (
    <>
      <div className="row mt-3 justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Add book</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleAddBook)}>
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
                    accept=".jpg"
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
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      {" "}
                      <span
                        className="spinner-border spinner-border-sm disabled"
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
        </div>
      </div>
    </>
  );
};

export default AddBook;
// import React, { useEffect, useState } from "react";
// import ApiClient from "../../../services/ApiClient";
// import { Author, Category } from "../../../types/Book";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import z from "zod";

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];

// export const schema = z.object({
//   name: z.string().nonempty({ message: "Book Name is required" }),
//   price: z
//     .number({ invalid_type_error: "Price is required" })
//     .min(1, { message: "at least 1 dollar" }),
//   about: z.string().nonempty({ message: "About is required" }),
//   publishyear: z
//     .number({ invalid_type_error: "Publish year is required" })
//     .min(1, { message: "Publish is required" }),
//   pagecount: z
//     .number({ invalid_type_error: "Page count is required" })
//     .min(1, { message: "at least 1 page" }),
//   ImageFile: z
//     .instanceof(FileList)
//     .refine((files) => files?.length == 1, "Image is required.")
//     .refine(
//       (files) => files?.[0]?.size <= MAX_FILE_SIZE,
//       `Max file size is 5MB.`
//     )
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//       ".jpg, .jpeg, .png and .webp files are accepted."
//     ),
//   CategoryId: z.string().trim().nonempty({ message: "Category is required" }),
//   AuthorId: z.string().nonempty({ message: "Author is required" }),
// });

// type BookFormData = z.infer<typeof schema>;

// const AddBook = () => {
//   const [categories, setCategories] = useState<Category[]>();
//   const [authors, setAuthors] = useState<Author[]>();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     ApiClient.get("/Category").then((response) => {
//       setCategories(response.data);
//     });
//     ApiClient.get("/Author").then((response) => {
//       setAuthors(response.data);
//     });
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<BookFormData>({ resolver: zodResolver(schema) });

//   const handleAddBook = (data: BookFormData) => {
//     const bookData = new FormData();

//     bookData.append("Name", data.name);
//     bookData.append("Price", String(data.price));
//     bookData.append("ImageFile", data.ImageFile[0]);
//     bookData.append("About", data.about);
//     bookData.append("PublishYear", String(data.publishyear));
//     bookData.append("PageCount", String(data.pagecount));
//     bookData.append("AuthorId", data.AuthorId);
//     bookData.append("PublisherId", "1");
//     bookData.append("CategoryId", data.CategoryId);

//     ApiClient.post("/Book", bookData)
//       .then((response) => {
//         console.log(response);
//         setIsLoading(false);
//         reset();
//         toast.success("Book has been Added successfully");
//       })
//       .catch((error) => {
//         console.error("Error adding book:", error);
//         setIsLoading(false);
//         toast.error("Error adding book");
//       });

//     setIsLoading(true);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header">Add Book</div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit(handleAddBook)}>
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">
//                     Book Name
//                   </label>
//                   <input
//                     {...register("name")}
//                     id="name"
//                     className={`form-control ${
//                       errors.name ? "is-invalid" : ""
//                     }`}
//                     type="text"
//                   />
//                   {errors.name && (
//                     <div className="invalid-feedback">
//                       {errors.name.message}
//                     </div>
//                   )}
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="price" className="form-label">
//                     Price
//                   </label>
//                   <input
//                     {...register("price", { valueAsNumber: true })}
//                     id="price"
//                     className={`form-control ${
//                       errors.price ? "is-invalid" : ""
//                     }`}
//                     type="number"
//                     step=".01"
//                   />
//                   {errors.price && (
//                     <div className="invalid-feedback">
//                       {errors.price.message}
//                     </div>
//                   )}
//                 </div>
//                 {/* Add similar styling for other form fields */}
//                 <div className="mb-3">
//                   <label htmlFor="Category" className="form-label">
//                     Category
//                   </label>
//                   <select
//                     className={`form-control ${
//                       errors.CategoryId ? "is-invalid" : ""
//                     }`}
//                     {...register("CategoryId")}
//                   >
//                     <option value="">Select a category</option>
//                     {categories?.map((category) => (
//                       <option key={category.id} value={category.id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.CategoryId && (
//                     <div className="invalid-feedback">
//                       {errors.CategoryId.message}
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <div
//                       className="spinner-border spinner-border-sm"
//                       role="status"
//                     >
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   ) : (
//                     "Add"
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddBook;
