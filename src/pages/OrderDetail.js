// OrderDetails.js
import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { CardBody, Badge } from "@windmill/react-ui";
import { orders, products } from "../data";

const OrderDetails = () => {
    const { id } = useParams();
    const order = orders.find((order) => order.id.toString() === id);

    if (!order) {
        return <p className="text-center text-red-500 mt-5">Order not found.</p>;
    }

    return (
        <div className="px-4 py-6">
            <PageTitle>Order Detail</PageTitle>
            {/* Breadcrumb */}
            <div className="flex text-gray-800 dark:text-gray-300 mb-6">
                <div className="flex items-center text-purple-600">
                    <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
                    <NavLink exact to="/app/dashboard" className="mx-2">
                        Dashboard
                    </NavLink>
                </div>
                {">"}
                <div className="flex items-center text-purple-600">
                    <NavLink exact to="/app/orders" className="mx-2">
                        Orders
                    </NavLink>
                </div>
                {">"}
                <p className="mx-2">Order Detail</p>
            </div>

            <div className="shadow-md bg-gray-50 rounded">
                <CardBody>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Đơn hàng : {order.id}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg">
                                    <span className="font-semibold">Tên người mua :</span> {order.customerName}
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold">Ngày mua :</span>{" "}
                                    {new Date(order.date).toLocaleDateString()}
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold">Trang thái thanh toán :</span>{" "}
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
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold">Tổng tiền :</span> ${order.totalAmount}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                                <p className="text-lg">
                                    <span className="font-semibold">Shipping Address:</span> {order.shippingAddress}
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold">Shipping Status:</span> {order.shippingStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Sản phẩm:</h3>
                        {order.products.map((product) => {
                            const productDetail = products.find((p) => p.id === product.productId);
                            const totalPrice = productDetail.price * product.qty;
                            const productStatus = productDetail.status === "Out of Stock" ? "Out of Stock" : "In Stock";
                            return (
                                <div key={product.productId} className="flex items-center mb-4">
                                    <img
                                        src={productDetail.photo}
                                        alt={productDetail.name}
                                        className="w-32 h-32 object-cover rounded-md mr-4"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{productDetail.name}</p>
                                        <p className="text-gray-500">{productDetail.description}</p>
                                        <p className="text-lg">${productDetail.price}</p>
                                        <p className="text-lg">Số Lượng : {product.qty}</p>
                                        <p className="text-lg">Tổng : ${totalPrice}</p>

                                        {productStatus === "Out of Stock" && (
                                            <p className="text-md font-medium">Status:
                                                <span className=" bg-red-600 text-white rounded-full ml-2 px-2 py-1"> {productStatus}</span>
                                            </p>
                                        )}


                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardBody>
            </div>
        </div>
    );
};

export default OrderDetails;
