import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { seller, products } from "../data";

const Profile = () => {
  return (
    <div className="container mx-auto p-6">
      <PageTitle>Manage your Profile</PageTitle>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="personal-info mb-6">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <img className="w-32 h-32 rounded-full mb-4" src={seller.personalInfo.photo} alt="Profile" />
          <p>Name: {seller.personalInfo.firstName} {seller.personalInfo.lastName}</p>
          <p>Date of Birth: {seller.personalInfo.dateOfBirth}</p>
          <p>Gender: {seller.personalInfo.gender}</p>
          <p>Nationality: {seller.personalInfo.nationality}</p>
        </div>
        
        <div className="contact-info mb-6">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <p>Email: {seller.contactInfo.email}</p>
          <p>Phone: {seller.contactInfo.phone}</p>
          <p>Address: {seller.contactInfo.address.street}, {seller.contactInfo.address.city}, {seller.contactInfo.address.state} {seller.contactInfo.address.postalCode}, {seller.contactInfo.address.country}</p>
          <p>Facebook: <a className="text-blue-500" href={seller.contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer">{seller.contactInfo.socialMedia.facebook}</a></p>
          <p>Twitter: <a className="text-blue-500" href={seller.contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer">{seller.contactInfo.socialMedia.twitter}</a></p>
          <p>LinkedIn: <a className="text-blue-500" href={seller.contactInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">{seller.contactInfo.socialMedia.linkedin}</a></p>
        </div>
        
        <div className="business-info mb-6">
          <h2 className="text-xl font-bold mb-4">Business Information</h2>
          <p>Company Name: {seller.businessInfo.companyName}</p>
          <p>Business Type: {seller.businessInfo.businessType}</p>
          <p>Registration Number: {seller.businessInfo.registrationNumber}</p>
          <p>Tax ID: {seller.businessInfo.taxID}</p>
          <p>Years in Business: {seller.businessInfo.yearsInBusiness}</p>
          <p>Business Address: {seller.businessInfo.businessAddress.street}, {seller.businessInfo.businessAddress.city}, {seller.businessInfo.businessAddress.state} {seller.businessInfo.businessAddress.postalCode}, {seller.businessInfo.businessAddress.country}</p>
        </div>
        
        <div className="products-info mb-6">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seller.productIds.map(productId => {
              const product = products.find(p => p.id === productId);
              return (
                <li key={product.id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <img className="w-full h-32 object-cover rounded mb-4" src={product.photo} alt={product.name} />
                  <p className="font-bold">{product.name}</p>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Status: {product.status}</p>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="ratings-info mb-6">
          <h2 className="text-xl font-bold mb-4">Ratings</h2>
          <p>Average Rating: {seller.ratings.averageRating}</p>
          <ul className="space-y-4">
            {seller.ratings.reviews.map((review, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="font-bold">{review.reviewer}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <p>Date: {review.date}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="policies-info mb-6">
          <h2 className="text-xl font-bold mb-4">Policies</h2>
          <p>Return Policy: {seller.policies.returnPolicy}</p>
          <p>Shipping Policy: {seller.policies.shippingPolicy}</p>
          <p>Privacy Policy: {seller.policies.privacyPolicy}</p>
        </div>
        
        <div className="support-info">
          <h2 className="text-xl font-bold mb-4">Customer Support</h2>
          <p>Customer Service Email: {seller.supportInfo.customerServiceEmail}</p>
          <p>Customer Service Phone: {seller.supportInfo.customerServicePhone}</p>
          <p>Support Hours: {seller.supportInfo.supportHours}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
