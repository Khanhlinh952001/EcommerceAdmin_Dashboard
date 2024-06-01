import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
  TrashIcon,
} from "../icons";
import {
  Card,
  CardBody,
  Label,
  Select,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import Icon from "../components/Icon";
import { genRating } from "../utils/genarateRating";
import { products, seller, reviews } from "../data";
import { calculateProductStats } from "../utils/genarateRating";
const ProductsAll = () => {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalResults = products.length;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);

  useEffect(() => {
    setData(products.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage]);

  const productStats = calculateProductStats(reviews);
  console.log(productStats[1])

  const onPageChange = (p) => {
    setPage(p);
  };

  const openModal = (productId) => {
    const product = products.find((product) => product.id === productId);
    setSelectedDeleteProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeView = () => {
    setView(view === "list" ? "grid" : "list");
  };

  return (
    <div>
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Products</p>
      </div>

      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All Products
              </p>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Sort by</option>
                  <option>Asc</option>
                  <option>Desc</option>
                </Select>
              </Label>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Filter by Category</option>
                  <option>Electronics</option>
                  <option>Cloths</option>
                  <option>Mobile Accessories</option>
                </Select>
              </Label>

              <Label className="mr-8">
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Number of Results"
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                    Results on {`${view}`}
                  </div>
                </div>
              </Label>
            </div>
            <div className="">
              <Button
                icon={view === "list" ? ListViewIcon : GridViewIcon}
                className="p-2"
                aria-label="Edit"
                onClick={handleChangeView}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="flex items-center">
          <Icon className="w-6 h-6 mr-3" icon={TrashIcon} />
          Delete Product
        </ModalHeader>
        <ModalBody>
          Make sure you want to delete product{" "}
          {selectedDeleteProduct && `"${selectedDeleteProduct.name}"`}
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button>Delete</Button>
        </ModalFooter>
      </Modal>

      {view === "list" ? (
        <>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>QTY</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {seller.productIds.map((productId) => {
                  const product = products.find((p) => p.id === productId);

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Avatar
                            className="hidden mr-4 md:block"
                            src={product.photo}
                            alt="Product image"
                          />
                          <div>
                            <p className="font-semibold">{product.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge type={product.qty > 0 ? "success" : "danger"}>
                          {product.qty > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {productStats[product.id] ? (
                          genRating(
                            parseInt(productStats[product.id].averageRating), // Lấy averageRating từ productStats
                            productStats[product.id].reviewCount, // Lấy reviewCount từ productStats
                            4 // Số sao tối đa
                          )
                        ) : (
                          <span>No rating</span>
                        )}
                      </TableCell>

                      <TableCell className="text-sm">{product.qty}</TableCell>
                      <TableCell className="text-sm">{product.price}</TableCell>
                      <TableCell>
                        <div className="flex">
                          <Link to={`/app/product/${product.id}`}>
                            <Button
                              icon={EyeIcon}
                              className="mr-3"
                              aria-label="Preview"
                            />
                          </Link>
                          <Button
                            icon={EditIcon}
                            className="mr-3"
                            layout="outline"
                            aria-label="Edit"
                          />
                          <Button
                            icon={TrashIcon}
                            layout="outline"
                            onClick={() => openModal(product.id)}
                            aria-label="Delete"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

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
        </>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
            {seller.productIds.map((productId) => {
              const product = products.find((p) => p.id === productId);
              return (
                <div className="" key={product.id}>
                  <Card>
                    <img
                      className="object-cover w-full h-32 rounded-t"
                      src={product.photo}
                      alt="product"
                    />
                    <CardBody>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-semibold truncate text-gray-600 dark:text-gray-300">
                          {product.name}
                        </p>
                        <Badge
                          type={product.qty > 0 ? "success" : "danger"}
                          className="whitespace-nowrap"
                        >
                          <p className="break-normal">
                            {product.qty > 0 ? `In Stock` : "Out of Stock"}
                          </p>
                        </Badge>
                      </div>
                      <div className="flex justify-between"><p className="mb-2 text-purple-500 font-bold text-lg">
                        ${product.price}
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
                      </div>


                      <p className="mb-8 text-gray-600 dark:text-gray-400">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <Link to={`/app/product/${product.id}`}>
                            <Button
                              icon={EyeIcon}
                              className="mr-3"
                              aria-label="Preview"
                              size="small"
                            />
                          </Link>
                        </div>
                        <div>
                          <Link to={`/app/edit/${product.id}`}>
                            <Button
                              icon={
                                EditIcon}
                              className="mr-3"
                              layout="outline"
                              aria-label="Edit"
                              size="small"
                            />
                          </Link>
                          <Button
                            icon={TrashIcon}
                            layout="outline"
                            aria-label="Delete"
                            onClick={() => openModal(product.id)}
                            size="small"
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>

          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductsAll;
