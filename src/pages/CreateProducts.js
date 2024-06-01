import React from 'react'
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../icons";
import PageTitle from '../components/Typography/PageTitle';
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};
export default function CreateCreateProducts() {
  return (
    <div>
     <PageTitle>Add New Product</PageTitle>

         {/* Breadcum */}
         <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Create new Product</p>
      </div>



      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
          
      </div>
    </div>
  )
}
