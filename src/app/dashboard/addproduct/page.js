"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
const AddProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    images: [],
    discount: 0,
    category: "",
    stock: 0,
  });
  const [previews, setPreviews] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const files = Array.from(e.target.files);
      setForm({
        ...form,
        [name]: files,
      });
      setPreviews(files.map((file) => URL.createObjectURL(file)));
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("discount", form.discount);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i]);
    }

    const res = await fetch(
      "https://e-commerce-backend-dvaf.onrender.com/api/products",
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      router.push("/"); // Redirect to the homepage or product list

      toast.success("Product added successfully");
    } else {
      console.error("Failed to add product");

      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 m-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
        <div className=" col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className=" col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="  col-span-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="col-span-4">
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>

          <label className=" my-2 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              name="images"
              multiple
              required
              onChange={handleChange}
            />
          </label>
          <div className="mt-4 grid grid-cols-3 gap-4 p-2 border border-gray-200">
            {previews.map((preview, index) => (
              <Image
                key={index}
                width={200}
                height={200}
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Discount
          </label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="col-span-4 flex justify-center">
          <button
            type="submit"
            className="block  mx-auto  w-full mt-4 justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
