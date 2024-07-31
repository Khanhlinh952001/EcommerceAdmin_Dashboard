
import { useState } from "react";
export const handleSearch =async (text,apiKey) => {
  
  };
  
  export const handleImageSearch = (image) => {
    // Kiểm tra nếu không có hình ảnh
    if (!image) {
      alert('Please select an image to search');
      return;
    }
  
    // Tạo đối tượng FormData để gửi hình ảnh
    const formData = new FormData();
    formData.append('image', image);
  
    // Gửi hình ảnh tới máy chủ hoặc xử lý hình ảnh tại đây
    alert(`Searching for product by image: ${image.name}`);
    // Ví dụ gửi yêu cầu bằng fetch (hoặc thư viện khác như axios)
    /*
    fetch('YOUR_IMAGE_SEARCH_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Xử lý kết quả tìm kiếm tại đây
      })
      .catch(error => {
        console.error('Error:', error);
      });
    */
  };
  
  export const handleLinkSearch = (link) => {
    // Kiểm tra nếu không có liên kết
    if (!link) {
      alert('Please enter a link to search');
      return;
    }
  
    // Gửi liên kết tới máy chủ hoặc xử lý liên kết tại đây
    alert(`Searching for product by link: ${link}`);
    // Ví dụ gửi yêu cầu bằng fetch (hoặc thư viện khác như axios)
    /*
    fetch('YOUR_LINK_SEARCH_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link: link }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Xử lý kết quả tìm kiếm tại đây
      })
      .catch(error => {
        console.error('Error:', error);
      });
    */
  };
  