import React from 'react';
import useOrders from '../hooks/useOrders';
import { MdDelete } from 'react-icons/md';

const AdminOrders = () => {
  const { orders, loading, error, updateOrderStatus, deleteOrder } = useOrders();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Items</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customerName}</td>
                <td className="border px-4 py-2">{order.items.map(item => item.name).join(', ')}</td>
                <td className="border px-4 py-2">${order.total}</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
