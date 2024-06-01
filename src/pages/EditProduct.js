import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { products } from "../data";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";

const EditProductPage = ({ updateProduct }) => {
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        const foundProduct = products.find((product) => product.id.toString() === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setName(foundProduct.name);
            setPrice(foundProduct.price);
            setDescription(foundProduct.description);
            setStatus(foundProduct.status); // Initialize status
            setPhoto(foundProduct.photo);
        } else {
            // Redirect or display a message if the product is not found
            history.push("/not-found");
        }
    }, [id, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = { ...product, name, price, description, status, photo };
        updateProduct(updatedProduct);
        history.push(`/products/${id}`);
    };

    return (
        <div>
            <PageTitle>Edit Product</PageTitle>

            {/* Breadcum */}
            <div className="flex text-gray-800 dark:text-gray-300">
                <div className="flex items-center text-purple-600">
                    <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
                    <NavLink exact to="/app/all-products" className="mx-2">
                        All Products
                    </NavLink>
                </div>
                {">"}
                <p className="mx-2">Edit Product</p>
            </div>
            <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 bg-gray-50 p-4 ">
                {product ? (
                    <form onSubmit={handleSubmit} className=" text-gray-700 w-full">
                        <div>
                            <label className="block mb-1">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Price:</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-32 border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Status:</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                                {/* Thêm các option khác nếu cần */}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1">Photo:</label>
                            <img src={photo} alt="d" />
                            {/* <input
                                type="text"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            /> */}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Save
                        </button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </div>
    );
};

export default EditProductPage;
