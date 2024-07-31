import React from 'react';
import { HomeIcon } from "../icons";
import PageTitle from '../components/Typography/PageTitle';
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { handleImageSearch, handleLinkSearch } from '../components/Search/searchHandlers';
import axios from "axios";
import { parseString } from "xml2js";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { v4 as uuidv4 } from "uuid";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { database } from '../firebaseConfig';
import { ref, set } from "firebase/database";
import LinearProgress from '@mui/material/LinearProgress';
export default function AddProduct() {
  const [search, setSearch] = useState('');
  const [json, setJson] = useState()
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  const [searchMethod, setSearchMethod] = useState('text');
  const [loading, setLoading] = useState(false);
  const [progress,setProgress] =useState(false);
  const apiKey = "23ebb9fd1b66ae392b91870ed7bb4447";
  const handleInputChange = (event) => {
    setSearch(event.target.value, apiKey);
  };
  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
       `https://app-service-nine.vercel.app/api?key=${apiKey}&apiCode=ProductSearch&keyword=${search}`
      );

      // Check if response data is undefined or empty
      if (!response.data) {
        throw new Error('Response data is empty or undefined');
      }

      // Parse the XML data
      parseString(response.data, function (err, result) {
        if (err) {
          throw new Error(`Error parsing XML: ${err.message}`);
        }
        const jsonData =
          result?.ProductSearchResponse?.Products[0]?.Product || [];
        // You can handle the parsed JSON data here
        setJson(jsonData)
        setLoading(false)
      });
      return json;

    } catch (error) {
      console.error('Error fetching/searching results:', error.message || error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  console.log(json)

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSearchMethodChange = (event) => {
    setSearchMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchMethod === 'text') {
      handleSearch(search);
    } else if (searchMethod === 'image') {
      handleImageSearch(image);
    } else if (searchMethod === 'link') {
      handleLinkSearch(link);
    }
  };
  const handleClick = (url) => () => {
    window.open(url, '_blank');
};
const handleSave = (product) => {
  
  const uniqueId = uuidv4();
 setProgress(true);
  const images = [
    { id: "image1", url: product.ProductImage300[0] },
    // Add other image objects if necessary
  ];
  const detailUrl = product.DetailPageUrl && typeof product.DetailPageUrl[0] === 'string' ? product.DetailPageUrl[0] : '';
  set(ref(database, `Products/${uniqueId}`), {
    storeId: "vokhanhlinh952001",
    name: product.ProductName[0],
    code: product.ProductCode[0],
    img: images,
    description:'',
    detailUrl:detailUrl,
    price: product.ProductPrice[0] ,
    sales: product.SalePrice[0],
    ladada:"false",
    tiki: "false",
    shoppe:"false",
    status: "false",
    rating: product.Rating[0],
  })
    .then(() => {
      NotificationManager.success(
        `Thêm ${product.ProductCode[0]} thành công`,
        "Thành công",
        3000
      );
      setProgress(false);
    })
    .catch((error) => {
      console.error("Error writing user data: ", error);
      setProgress(false);
      NotificationManager.error("Thêm không thành công", "Error", 3000);
    });
};


  return (
    <div>
      <PageTitle>Add New Product</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300 mb-4">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {'>'}
        <p className="mx-2">Add New Product</p>
      </div>

      <div className="w-full rounded">
        <div>
          {/* search */}
          <div className=" bg-gray-100  ">
            <div className="container mx-auto bg-indigo-500 rounded-lg pb-4  text-center">

              <h1 className="text-center font-bold text-white text-4xl">Tìm tên sản phẩm</h1>
              <p className="mx-auto font-normal text-sm my-6 max-w-lg">
                Chọn phương thức tìm kiếm và nhập thông tin sản phẩm
              </p>

              <div className="flex justify-center mb-6">
                <select
                  className="bg-white text-gray-700 py-2 px-4 rounded-lg"
                  value={searchMethod}
                  onChange={handleSearchMethodChange}
                >
                  <option value="text">Tìm kiếm bằng tên</option>
                  <option value="image">Tìm kiếm bằng hình ảnh</option>
                  <option value="link">Tìm kiếm bằng liên kết</option>
                </select>
              </div>

              <form onSubmit={handleSubmit}>
                {searchMethod === 'text' && (
                  <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 mx-10 py-1 justify-between">
                    <input
                      className="text-base text-gray-400 flex-grow outline-none px-2"
                      type="text"
                      placeholder="Search your product"
                      value={search}
                      onChange={handleInputChange}
                    />
                    <div className="sm:flex items-center px-2 rounded-lg space-x-4 mx-auto">
                      <button type="submit" onClick={handleSearch} className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">
                        Search
                      </button>
                    </div>
                  </div>
                )}

                {searchMethod === 'image' && (
                  <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 mx-10 py-1 justify-between">
                    <input
                      className="text-base text-gray-400 flex-grow outline-none px-2"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="sm:flex items-center px-2 rounded-lg space-x-4 mx-auto">
                      <button type="submit" className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">
                        Search by Image
                      </button>
                    </div>
                  </div>
                )}

                {searchMethod === 'link' && (
                  <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 mx-10 py-1 justify-between">
                    <input
                      className="text-base text-gray-400 flex-grow outline-none px-2"
                      type="text"
                      placeholder="Enter product link"
                      value={link}
                      onChange={handleLinkChange}
                    />
                    <div className="sm:flex items-center px-2 rounded-lg space-x-4 mx-auto">
                      <button type="submit" className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">
                        Search by Link
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
          </div>
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:py-10 lg:max-w-10xl lg:px-8">
              {
                progress ? <div > <LinearProgress color="secondary"/></div> :null
              }
              
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Kết quả tìm kiếm</h2>
                
              {
                loading ? <div className='flex justify-center items-center'>
                  <CircularProgress />
                </div> : <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {json && json.map((product) => (
                    <Card key={product.ProductCode} className="group relative m-2">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <CardMedia
                          component="img"
                          height="194"
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          image={product.ProductImage300[0]}
                          alt={product.ProductName[0]}
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <CardContent className="text-sm text-gray-700">
                            <Typography variant="subtitle2" >
                              {product.ProductName[0]}
                            </Typography>
                          </CardContent>

                          <CardContent> 
                            <Typography variant='body2'>{product.ProductCode[0]}dec</Typography></CardContent>
                        </div>
                        <CardContent className='mr-2'>
                           <Typography variant='body' className='pt-3  text-gray-600 mr-1'>  {Math.floor(product.ProductPrice[0]).toLocaleString('en')}</Typography>
                           <Typography variant='subtitle1' className='pt-3  text-red-600 mr-1' >{Math.floor(product.SalePrice[0]).toLocaleString('en')}</Typography>
                        </CardContent>
                       
                      </div>
                      <CardActions className='w-full text-end'>
                     <RemoveRedEyeIcon color="primary" onClick={handleClick(product.DetailPageUrl[0])} />
                       <AddCircleOutlineIcon color='primary' onClick={() => handleSave(product)} />
                      </CardActions>
                    </Card>
                  ))}
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
