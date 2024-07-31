export function findProductById(products, id) {
    return products.find((product) => product.id == id);
}
