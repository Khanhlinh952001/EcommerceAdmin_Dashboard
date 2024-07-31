import React from 'react';
import useOrders from '../hooks/useOrders';
import useProducts from '../hooks/useProducts';
import { MdDelete } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import { getProductById } from '../utils/getProductById';
import { formatNumber } from '../utils/formatNumber';
import Loading from './Loading';
import useCustomer from '../hooks/useCustomer';
const AdminOrders = () => {
  const adminId = 'vokhanhlinh952001';
  const { orders, loading, error, updateOrderStatus, deleteOrder } = useOrders(adminId);
  const { products } = useProducts(adminId);
  const { customers } = useCustomer();
  console.log(orders
  )
  const handleStatusChange = (userId, orderId, newStatus) => {
    updateOrderStatus(userId, orderId, newStatus);
  };

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
  };

  const handleClick = (url) => {
    if (!url) {
      alert("URL is not available");
      return;
    }
    window.open(url, '_blank');
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Items</th>
              <th className="py-3 px-6 text-left">Calculate</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className={`border-b rounded ${order.status === 'Cancelled' ? 'opacity-50 bg-gray-500' : ''} `}>
                <td className="py-2 px-2">{order.orderId}</td>
                <td className="py-2 px-2">{order.billing?.name}</td>
                <td className="py-2 px-2">{order.billing?.address}</td>
                <td className="py-2 px-2">
                  <div className="flex flex-col max-h-32 overflow-y-auto">
                    <h1 className='text-sm '>{order.cart.length}  </h1>
                    {order.cart.map((item, idx) => {
                      const product = products.find(product => product.id == item.id);

                      if (!product) return null;

                      return (
                        <div key={idx} className={`flex items-center mb-2 h-16 shadow my-1 px-2 ${order.status === 'Cancelled' ? 'opacity-50 bg-gray-500' : ''}`}>
                          <img src={product.img[0].url} alt={product.name} className="w-12 h-14 object-cover rounded mr-2" />
                          <div>
                            <p className="text-xs truncate overflow-hidden overflow-ellipsis w-40">{product.name}</p>
                            <p className="text-xs font text-gray-600">{item.quantity} x {product.sales}</p>
                            <button
                              onClick={() => handleClick(product.detailUrl)}
                              className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                            >
                              <FaArrowRight />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="py-2 font-semibold p-6">


                  <div>
                    {order.calculate ? (
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-red-100 bg-red-700 border border-red-700">
                        <div className="text-xs font-normal leading-none max-w-full flex-initial">{order.calculate}</div>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-red-100 bg-red-700 border border-red-700">
                        <div className="text-xs font-normal leading-none max-w-full flex-initial">Outstanding</div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-2 font-semibold p-6">{formatNumber(order.total)}</td>
                <td className="py-2 px-6">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.userId, order.orderId, e.target.value)}
                    className="border rounded px-3 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-2 px-6">
                  <button
                    onClick={() => handleDelete(order.orderId)}
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
