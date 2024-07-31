import { useState, useEffect } from "react";
import { ref, child, get, update } from 'firebase/database';
import { database } from "../firebaseConfig";
import {
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const useProducts = (currentUser) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'Products'));

        if (snapshot.exists()) {
          const productsData = snapshot.val();

          // Convert the products object into an array
          const productsArray = Object.entries(productsData).map(([productId, productData]) => ({
            id: productId,
            ...productData,
          }));

          // Filter products based on matching StoreId with auth.uid
          const filteredProducts = productsArray.filter(product => currentUser === product.storeId);

          setProducts(filteredProducts);
          setError(null);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const updateProduct = async (updatedProduct) => {
    try {
      // Ensure that no properties are undefined
      const validProduct = Object.fromEntries(
        Object.entries(updatedProduct).filter(([_, value]) => value !== undefined)
      );

      const productRef = ref(database, `Products/${updatedProduct.id}`);
      await update(productRef, validProduct);

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      // Show success notification
      NotificationManager.success('Product updated successfully', 'Success');
    } catch (error) {
      console.error("Error updating product:", error);
      setError(error.message);
      NotificationManager.error('Failed to update product', 'Error');
    }
  };

  return { products, loading, error, setProducts, updateProduct };
};

export default useProducts;
