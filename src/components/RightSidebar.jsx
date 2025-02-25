import React, {useState} from "react";
import Avatar from "./Avatar";
import { IoClose } from "react-icons/io5"; // React Icon for close

const Sidebar = ({ isOpen, onClose, user, messages }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed right-0 top-0 h-[100%] w-64 bg-white shadow-lg mt-5 mr-5 z-50">
      <button onClick={onClose} className="text-gray-500 text-lg font-bold">
        <IoClose size={24} />
      </button>
      <div className="flex flex-col items-center mt-4">
        <Avatar
          width={50}
          height={50}
          imageUrl={user?.profile_pic}
          name={user?.name}
          userId={user?._id}
        />
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-600">{user?.email}</p>
        <p className="text-sm text-gray-600">{user?.contactNumber}</p>
      </div>

    
    </div>
  );
};

export default Sidebar;
