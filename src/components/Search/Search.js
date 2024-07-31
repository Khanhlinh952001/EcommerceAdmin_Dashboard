import React, { useState } from 'react';
import { handleSearch, handleImageSearch, handleLinkSearch } from './searchHandlers';
import axios from "axios";
import { parseString } from "xml2js";
export default function SearchApp() {
  const [search, setSearch] = useState('');
  const[json,setJson]= useState()
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  const [searchMethod, setSearchMethod] = useState('text');
  const apiKey = "23ebb9fd1b66ae392b91870ed7bb4447"
  const handleInputChange = (event) => {
    setSearch(event.target.value,apiKey);
    
  };
  const handleSearch = async() => {
    try {
      alert("oh")
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
      });
      return json;
      
    } catch (error) {
      console.error('Error fetching/searching results:', error.message || error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }

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

  return (
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
  );
}
