import { useState, useEffect } from 'react';
import { ref, get, update, remove } from 'firebase/database';
import { database } from '../firebaseConfig';

const useOrders = (adminId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = ref(database, 'orders');
        const snapshot = await get(ordersRef);
        if (snapshot.exists()) {
          const ordersData = snapshot.val();
          const filteredOrders = getOrdersByStoreId(ordersData, adminId);
          setOrders(filteredOrders);
        } else {
          setOrders([]);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [adminId]);

  const getOrdersByStoreId = (ordersData, adminId) => {
    const filteredOrders = [];

    Object.keys(ordersData).forEach(userId => {
      const userOrders = ordersData[userId];
      Object.keys(userOrders).forEach(orderId => {
        const orderDetails = userOrders[orderId];
        if (orderDetails.cart && orderDetails.cart.length > 0) {
          const cartItem = orderDetails.cart.find(item => item.storeId === adminId);
          if (cartItem) {
            filteredOrders.push({ orderId, ...orderDetails });
          }
        }
      });
    });

    return filteredOrders;
  };
  
  const updateOrderStatus = async (userId, orderId, newStatus) => {
    setLoading(true);
    try {
      await update(ref(database, `orders/${userId}/${orderId}`), { status: newStatus });
      setOrders(prevOrders =>
        prevOrders.map(order => (order.orderId === orderId ? { ...order, shippingStatus: newStatus } : order))
      );
    } catch (error) {
      setError(error.message);
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteOrder = async (orderId) => {
    setLoading(true);
    try {
      await remove(ref(database, `orders/${orderId}`));
      setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
    } catch (error) {
      setError(error.message);
      console.error("Error deleting order:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
    deleteOrder,
  };
};

export default useOrders;
