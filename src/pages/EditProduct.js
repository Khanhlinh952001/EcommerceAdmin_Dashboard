import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";
import useProducts from "../hooks/useProducts";
import { findProductById } from "../utils/findById";
import { GrLanguage } from "react-icons/gr";
import translate from 'translate';

translate.engine = 'libre';

const EditProductPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [photo, setPhoto] = useState("");
    // const [translatedText, setTranslatedText] = useState('');
    const currentUser = 'vokhanhlinh952001';
    const { products, loading, error, updateProduct } = useProducts(currentUser);

    useEffect(() => {
        const foundProduct = findProductById(products, id);
        if (foundProduct) {
            setProduct(foundProduct);
            setName(foundProduct.name || "");
            setPrice(foundProduct.price || 0);
            setDescription(foundProduct.description || "");
            setStatus(foundProduct.status || "");
            setPhoto(foundProduct.img && Array.isArray(foundProduct.img) && foundProduct.img.length > 0
                ? foundProduct.img[0].url
                : ""); // Extract URL from the first image object
        } else {
            // history.push("/not-found");
        }
    }, [id, products, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = { ...product, name, price, description, status, photo };

        // Ensure all fields are defined
        const validProduct = Object.fromEntries(
            Object.entries(updatedProduct).filter(([_, value]) => value !== undefined)
        );

        await updateProduct(validProduct);
        // history.push(`/products/${id}`);
    };

    // const handleKoreaToVietNam = async (text) => {
    //     try {
    //         const translated = await translate(text, { from: 'ko', to: 'vi' });
    //         setTranslatedText(translated);
    //         console.log(translated);
    //     } catch (error) {
    //         console.error('Error translating text:', error);
    //     }
    // }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <PageTitle>Edit Product</PageTitle>

            {/* Breadcrumb */}
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
            <div className="w-full mt-8 grid gap-4 grid-cols-1 bg-gray-50 p-4">
                {product ? (
                    <form onSubmit={handleSubmit} className="text-gray-700 w-full">
                        <div className="flex items-center mb-4">
                            <label className="block mb-1 mr-2">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {/* <button
                                type="button"
                                className="bg-gray-500 px-2 rounded ml-2"
                                onClick={() => handleKoreaToVietNam(name)}
                            >
                                <GrLanguage className="text-xl text-white" />
                            </button> */}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Price:</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-32 border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Status:</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Photo:</label>
                            {photo && <img src={photo} alt={name} className="w-80 h-auto mb-2" />}
                           
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
