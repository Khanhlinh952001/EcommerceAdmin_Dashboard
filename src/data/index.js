const products = [
  {
    id: 1,
    name: "Nồi cơm nắp gài BlueStone 1.8 lít RCB-5520",
    description: "Nồi cơm điện nắp gài BlueStone 1.8 lít RCB-5520 trang bị công nghệ 1D nấu cơm chín nhanh, lòng nồi hợp kim nhôm phủ chống dính bền tốt, điều chỉnh bằng nút gạt dễ sử dụng,... là sản phẩm tiện lợi hỗ trợ chế biến những bữa cơm thơm ngon cho gia đình.",
    price: 19.99,
    qty:2,
    status: "In Stock",
    reviews: [
      { id: 1, rating: 4, comment: "Great product!" },
      { id: 2, rating: 5, comment: "Highly recommended!" },
    ],
    photo: "https://cdn.tgdd.vn/Products/Images/1922/189688/Slider/vi-vn-bluestone-rcb-5520-1.jpg",
  },
  {
    id: 2,
    name: "Nồi cơm nắp gài Sunhouse 1.2 lít SHD8217W",
    description: "Nồi cơm nắp gài Sunhouse 1.2 lít SHD8217W thiết kế gọn nhẹ, điều chỉnh bằng nút gạt đơn giản, công nghệ 1D nấu cơm chín nhanh, giúp phục vụ những bữa cơm nóng hổi cho gia đình.",
    price: 29.99,
    qty:5,
    rating:2,
    reviews: [
      { id: 3, rating: 3, comment: "Good product, but could be better." },
      { id: 4, rating: 4, comment: "Nice design!" },
    ],
    status: "Out of Stock",
    photo: "https://cdn.tgdd.vn/Products/Images/1922/275584/Slider/vi-vn-sunhouse-12-lit-shd8217w-1.jpg",
  },
  {
    id: 3,
    name: "Nồi cơm điện Cao tần áp suất Cuckoo CRP-CHSS1009FN (màu bạc) 1.8L",
    description: "Nồi cơm điện cao tần Cuckoo CRP- CHSS1009FN 1.8L nhập khẩu Hàn quốc",
    price: 39.99,
    reviews: [
      { id: 3, rating: 3, comment: "Good product, but could be better." },
      { id: 4, rating: 4, comment: "Nice design!" },
    ],
    status: "In Stock",
    photo: "https://cuckoo.vn/wp-content/swift-ai/images/wp-content/uploads/2022/08/chss-1009fn-500x500-jpg.webp",
  },
  {
    id: 4,
    name: "Máy xay sinh tố Philips HR3573/90 ",
    description: "Công nghệ ProBlend Crush kết hợp hiệu quả cùng lưỡi dao sắc bén và công suất cao để đẩy nhanh hiệu quả xay nhuyễn mọi loại nguyên liệu, mang đến những ly sinh tố thơm ngon, sánh mịn.Máy xay đến từ hãng Philips mang thương hiệu của Hà Lan uy tín, cung cấp những sản phẩm được thị trường tin dùng với chất lượng tốt.",
    price: 49.99,
    reviews: [
      { id: 3, rating: 3, comment: "Good product, but could be better." },
      { id: 4, rating: 4, comment: "Nice design!" },
    ],
    status: "In Stock",
    photo: "https://cdn.tgdd.vn/Products/Images/1985/239285/Slider/philips-hr3573-90638189779287127761.jpg",
  },
  {
    id: 5,
    name: "Loa kéo karaoke Dalton TS-12G350N 350W",
    description: "Loa kéo karaoke Dalton TS-12G350N 350W",
    price: 59.99,
    rating:4,
    status: "Discontinued",
    photo: "https://cdn.tgdd.vn/Products/Images/2162/306932/Slider/vi-vn-loa-keo-karaoke-dalton-ts-12g350n-1.jpg",
  },
  {
    id: 6,
    name: "Nồi chiên không dầu AVA KDF-593D 7.5 lít ",
    description: "Nồi chiên không dầu dung tích tổng 8 lít, dung tích sử dụng 7.5 lít phục vụ tốt cho gia đình 5 – 7 người",
    price: 69.99,
    rating:4.5,
    status: "In Stock",
    photo: "https://cdn.tgdd.vn/Products/Images/9418/240313/Slider/ava-kdf-593d-1-1020x570.jpg",
  },
  {
    id: 7,
    name: "Product 7",
    rating:4.5,
    description: "This is the description for product 7.",
    price: 79.99,
    status: "Out of Stock",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Product 8",
    rating:4.5,
    description: "This is the description for product 8.",
    price: 89.99,
    status: "In Stock",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "Product 9",
    rating:4.5,
    description: "This is the description for product 9.",
    price: 99.99,
    status: "In Stock",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    name: "Product 10",
    description: "This is the description for product 10.",
    price: 109.99,
    rating:4.5,
    status: "Discontinued",
    photo: "https://via.placeholder.com/150",
  },
];

const reviews = [
  { product_id: 1, customer_id: 1, rating: 4, comment: "Great product!" },
  { product_id: 1, customer_id: 2, rating: 5, comment: "Highly recommended!" },
  { product_id: 2, customer_id: 1, rating: 3, comment: "Good product, but could be better." },
  { product_id: 2, customer_id: 2, rating: 4, comment: "Nice design!" },
  { product_id: 3, customer_id: 1, rating: 4, comment: "Good quality." },
  { product_id: 3, customer_id: 2, rating: 5, comment: "Amazing!" },
  { product_id: 3, customer_id: 3, rating: 5, comment: "Amazing!" },
  // Thêm các review cho các sản phẩm khác tại đây
];

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar_url:"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA"
    },
    orders: [
      { orderId: 101, date: "2024-05-15", total: 150 },
      { orderId: 102, date: "2024-05-20", total: 200 },
      { orderId: 103, date: "2024-05-25", total: 100 }
    ],
    phone: "123-456-7890"
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    avatar_url:"https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
    address: {
      street: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA"
    },
    orders: [
      { orderId: 201, date: "2024-06-05", total: 120 },
      { orderId: 202, date: "2024-06-10", total: 180 }
    ],
    phone: "456-789-0123"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    address: {
      street: "789 Oak St",
      city: "Chicago",
      state: "IL",
      zip: "60001",
      country: "USA"
    },
    orders: [
      { orderId: 301, date: "2024-06-15", total: 250 }
    ],
    phone: "789-012-3456"
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    address: {
      street: "987 Pine St",
      city: "San Francisco",
      state: "CA",
      zip: "94101",
      country: "USA"
    },
    orders: [
      { orderId: 401, date: "2024-06-20", total: 300 },
      { orderId: 402, date: "2024-06-25", total: 220 }
    ],
    phone: "012-345-6789"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    address: {
      street: "246 Maple St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA"
    },
    orders: [
      { orderId: 501, date: "2024-06-30", total: 180 },
      { orderId: 502, date: "2024-07-05", total: 200 },
      { orderId: 503, date: "2024-07-10", total: 150 }
    ],
    phone: "345-678-9012"
  }
];

// data.js
const orders = [
  {
    id: 1212,
    customersId: 1,
    customerName: "John Doe",
    date: "2023-05-01",
    status: "Paid",
    shippingStatus: "Preparing",
    shippingAddress: "123 Main St, Anytown, USA",
    paymentMethod: "Credit Card",
    products: [
      { productId: 1, qty: 1 },
      { productId: 2, qty: 3 },
    ],
  },
  {
    id: 22121,
    customersId: 1,
    customerName: "Jane Smith",
    date: "2023-05-02",
    status: "Un-paid",
    shippingStatus: "Preparing",
    shippingAddress: "456 Elm St, Othertown, USA",
    paymentMethod: "PayPal",
    products: [
      { productId: 3, qty: 1 },
    ],
  },
  {
    id: 32121,
    customersId: 1,
    customerName: "Emily Johnson",
    date: "2023-05-03",
    status: "Completed",
    shippingStatus: "Shipping",
    shippingAddress: "789 Oak St, Anycity, USA",
    paymentMethod: "Credit Card",
    products: [
      { productId: 4, qty: 3 },
    ],
  },
  {
    id: 421212,
    customersId: 1,
    customerName: "Michael Brown",
    date: "2023-05-04",
    status: "Paid",
    shippingStatus: "Shipped",
    shippingAddress: "101 Maple St, Newtown, USA",
    paymentMethod: "Debit Card",
    products: [
      { productId: 5, qty: 2 },
    ],
  },
  {
    id: 54214,
    customersId: 4,
    customerName: "Jessica Wilson",
    date: "2023-05-05",
    status: "Paid",
    shippingStatus: "Shipped",
    shippingAddress: "202 Birch St, Oldtown, USA",
    paymentMethod: "Bank Transfer",
    products: [
      { productId: 6, qty: 1 },
    ],
  },
];

  
  // Calculate total amount for each order
  orders.forEach(order => {
    order.totalAmount = order.products.reduce((total, product) => {
      const productPrice = products.find(p => p.id === product.productId).price;
      return total + (productPrice * product.qty);
    }, 0);
  });
  const seller = {
    id: 1,
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1985-01-15",
        gender: "Male",
      
        photo: "https://www.jollyboxdesign.com/wp-content/uploads/2021/08/Administrator.png",
    },
    contactInfo: {
        email: "john.doe@example.com",
        phone: "+1-555-555-5555",
        address: {
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            postalCode: "62701",
            country: "USA",
        },
        socialMedia: {
            facebook: "https://facebook.com/johndoe",
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe",
        },
    },
    businessInfo: {
        companyName: "Doe Enterprises",
        businessType: "Retail",
        registrationNumber: "123456789",
        taxID: "98-7654321",
        yearsInBusiness: 10,
        businessAddress: {
            street: "456 Business Rd",
            city: "Springfield",
            state: "IL",
            postalCode: "62702",
            country: "USA",
        },
    },
    productIds: [1, 2, 3],
    ratings: {
        averageRating: 4.5,
        reviews: [
            {
                reviewer: "Jane Smith",
                rating: 5,
                comment: "Great seller, fast shipping!",
                date: "2023-05-15",
            },
            {
                reviewer: "Bob Johnson",
                rating: 4,
                comment: "Product as described, will buy again.",
                date: "2023-05-20",
            },
        ],
    },
    paymentMethods: ["Credit Card", "PayPal", "Bank Transfer"],
    policies: {
        returnPolicy: "30 days return policy.",
        shippingPolicy: "Free shipping on orders over $50.",
        privacyPolicy: "We respect your privacy and do not share your information.",
    },
    supportInfo: {
        customerServiceEmail: "support@example.com",
        customerServicePhone: "+1-555-555-1234",
        supportHours: "Mon-Fri 9am-5pm",
    },
};


 
  
 
  export {orders,products,seller,reviews,customers};
  