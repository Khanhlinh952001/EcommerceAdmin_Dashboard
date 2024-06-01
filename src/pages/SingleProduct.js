import React, { useState, useEffect } from "react";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { Card, CardBody, Button, Avatar, Badge } from "@windmill/react-ui"; // Import Button and Avatar
import { genRating } from "../utils/genarateRating";
import { calculateProductStats } from "../utils/genarateRating";
import { products, reviews, customers } from "../data";

const SingleProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [tabView, setTabView] = useState("reviews");
  const productStats = calculateProductStats(reviews);

  const productReviews = reviews.filter(review => review.product_id == id);
  const usersWithComments = customers.filter(user => productReviews.some(review => review.customer_id === user.id));

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id.toString() === id
    );
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      history.push("/not-found");
    }
  }, [id, history]);

  const handleTabView = (viewName) => setTabView(viewName);

  return (
    <div>
      {product && (
        <>
          <PageTitle>Product Details</PageTitle>
          {/* Breadcum */}
          <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-purple-600">
              <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
              <NavLink exact to="/app/dashboard" className="mx-2">
                Dashboard
              </NavLink>
            </div>
            {">"}
            <NavLink
              exact
              to="/app/all-products"
              className="mx-2 text-purple-600"
            >
              All Products
            </NavLink>
            {">"}
            <p className="mx-2">{product.name}</p>
          </div>

          {/* Product overview  */}
          <Card className="my-8 shadow-md">
            <CardBody>
              <div className="grid grid-col items-center md:grid-cols-2 lg:grid-cols-2">
                <div>
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="mx-8 pt-5 md:pt-0">
                  <h1 className="text-3xl mb-4 font-semibold text-gray-700 dark:text-gray-200">
                    {product?.name}
                  </h1>

                  <Badge
                    type={product?.qty > 0 ? "success" : "danger"}
                    className="mb-2"
                  >
                    <p className="break-normal">
                      {product?.qty > 0 ? `In Stock` : "Out of Stock"}
                    </p>
                  </Badge>

                  <p className="mb-2 text-sm text-gray-800 dark:text-gray-300">
                    {product?.shortDescription}
                  </p>
                  <p className="mb-3 text-sm text-gray-800 dark:text-gray-300">
                    {product?.featureDescription}
                  </p>

                  <p className="text-sm text-gray-900 dark:text-gray-400">
                    Product Rating
                  </p>
                  <div>
                    <p className="text-sm pt-1">
                      {productStats[product.id] ? (
                        genRating(
                          parseInt(productStats[product.id].averageRating), // Lấy averageRating từ productStats
                          productStats[product.id].reviewCount, // Lấy reviewCount từ productStats
                          4 // Số sao tối đa
                        )
                      ) : (
                        <span>No rating</span>
                      )}
                    </p>
                  </div>

                  <h4 className="mt-4 text-purple-600 text-2xl font-semibold">
                    {product?.price}
                  </h4>
                  <p className="text-sm text-gray-900 dark:text-gray-400">
                    Product Quantity : {product?.qty}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Product Reviews and Description */}
          <Card className="my-8 shadow-md">
            <CardBody>
              {/* Navigation Area */}
              <div className="flex items-center">
                <Button
                  className="mx-5"
                  layout="link"
                  onClick={() => handleTabView("reviews")}
                >{`Reviews (${product.reviews ? product.reviews.length : 0})`}</Button>
                <Button layout="link" onClick={() => handleTabView("description")}>
                  Description
                </Button>
                <Button layout="link" onClick={() => handleTabView("faq")}>
                  FAQ
                </Button>
              </div>

              {/* Divider */}
              <hr className="mx-3 my-2 customeDivider" />

              {/* Component area */}
              <div className="mx-3 mt-4">
                {tabView === "reviews" ? (
                  <>
                    <p className="text-5xl text-gray-700 dark:text-gray-200">
                      {parseInt(productStats[product.id].averageRating) ? parseInt(productStats[product.id].averageRating).toFixed(1) : "0.0"}
                    </p>
                    <p className="text-sm pt-1">
                      {productStats[product.id] ? (
                        genRating(
                          parseInt(productStats[product.id].averageRating), // Lấy averageRating từ productStats
                          productStats[product.id].reviewCount, // Lấy reviewCount từ productStats
                          4 // Số sao tối đa
                        )
                      ) : (
                        <span>No rating</span>
                      )}
                    </p>

                    <div className="mt-4">
                      {usersWithComments.map((user, i) => (
                        <div className="flex py-3" key={i}>
                          <Avatar
                            className="hidden mr-3 md:block"
                            size="large"
                            src={user.avatar_url}
                            alt="User image"
                          />
                          <div>
                            <p className="font-medium text-lg text-gray-800 dark:text-gray-300">
                              {user.username}
                            </p>
                            {productReviews
                              .filter(review => review.customer_id === user.id)
                              .map((review, j) => (
                                <div key={j} className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                                  {review.comment}
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : tabView === "description" ? (
                  <>
                    <div className="px-3">
                      <p className="text-sm text-gray-800 dark:text-gray-300">
                        {product.londDescription}
                      </p>
                    </div>
                  </>
                ) : tabView === "faq" ? (
                  <>faq</>
                ) : (
                  <></>
                )}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default SingleProduct;

