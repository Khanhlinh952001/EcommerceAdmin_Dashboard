import React from "react";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import { Link } from "react-router-dom";
import RoundIcon from "../components/RoundIcon";
import { orders, products, seller, reviews, customers } from '../data';
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";
import OrdersTable from "../components/OrdersTable";

function Dashboard() {

  // Tính tổng số tiền mà seller đã bán
  const sellerProductIds = seller.productIds;
  let totalSales = 0;
  let totalOrders = 0;

  orders.forEach(order => {
    order.products.forEach(product => {
      if (sellerProductIds.includes(product.productId)) {
        const productPrice = products.find(p => p.id === product.productId).price;
        totalSales += productPrice * product.qty;
        totalOrders += 1;
      }
    });
  });

  // Tính số lượng tin nhắn (bình luận) về sản phẩm của seller
  let totalReviews = 0;
  sellerProductIds.forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (product && product.reviews) {
      totalReviews += product.reviews.length;
    }
  });
  console.log(`Tổng số tiền mà seller đã bán: $${totalSales.toFixed(2)}`);
  console.log(`Tổng số lượng đơn hàng mà seller đã bán: ${totalOrders}`);
  console.log(`Tổng số lượng tin nhắn (bình luận) về sản phẩm của seller: ${totalReviews}`);
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total customers" value="765">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total income" value={`$${totalSales.toFixed(2)}`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <Link to={'/app/orders'}>
          <InfoCard title="New Orders" value={`${totalOrders}`}>
            <RoundIcon
              icon={CartIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        </Link>
 
        <Link to={'/app/chats'}> <InfoCard title="Unread Chats" value={`${totalReviews}`}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
        </Link>

      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="User Analytics">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>
      </div>

      <PageTitle>Orders</PageTitle>
      <OrdersTable resultsPerPage={10} />
    </>
  );
}

export default Dashboard;
