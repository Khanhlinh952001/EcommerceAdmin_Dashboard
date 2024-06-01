import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import { NavLink } from "react-router-dom";
import { orders, products } from "../data"; // Make sure this file path is correct
import { EditIcon, TrashIcon, EyeIcon } from "../icons"; // Ensure these icons are imported correctly

const OrdersTable = ({ filter }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null);
  const resultsPerPage = 5; // Display 5 orders per page
  const totalResults = orders.length;

  useEffect(() => {
    let filteredOrders = orders;

    // Apply Filters
    if (filter === "paid") {
      filteredOrders = orders.filter((order) => order.status === "Paid");
    } else if (filter === "un-paid") {
      filteredOrders = orders.filter((order) => order.status === "Un-paid");
    } else if (filter === "completed") {
      filteredOrders = orders.filter((order) => order.status === "Completed");
    }

    setData(filteredOrders.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, filter]);

  const onPageChange = (p) => setPage(p);

  const openModal = (orderId) => {
    const order = data.find((order) => order.id === orderId);
    setSelectedDeleteOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                <TableCell>ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data.map((order,index) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <span className="text-sm">{index+1}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{order.id}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{order.shippingAddress}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(order.date).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        type={
                          order.status === "Un-paid"
                            ? "danger"
                            : order.status === "Paid"
                              ? "success"
                              : order.status === "Completed"
                                ? "warning"
                                : "neutral"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">${order.totalAmount}</span>
                    </TableCell>
                    <TableCell>
                      <ul className="text-sm">
                        {order.products.map((product) => {
                          const productDetail = products.find((p) => p.id === product.productId);
                          const totalPrice = productDetail.price * product.qty;
                          return (
                            <li key={product.productId} className="flex">
                               <img src={productDetail.photo} alt={productDetail.name} className="h-10 w-10 p-1"/> <p className="ml-2 text-md font-bold">(x{product.qty}) - ${totalPrice}</p> 
                            </li>
                          );
                        })}

                      </ul>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <NavLink to={`/app/order-detail/${order.id}`}>
                          <Button icon={EyeIcon} layout="link" aria-label="View" />
                        </NavLink>
                        <Button icon={EditIcon} layout="link" aria-label="Edit" />
                        <Button
                          icon={TrashIcon}
                          layout="link"
                          aria-label="Delete"
                          onClick={() => openModal(order.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
              />
            </TableFooter>
          </TableContainer>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Delete Order</ModalHeader>
        <ModalBody>
          Are you sure you want to delete order{' '}
          {selectedDeleteOrder && selectedDeleteOrder.id}?
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OrdersTable;
