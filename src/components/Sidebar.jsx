import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const searchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/search-user`,
          { search }
        );
        setSearchUser(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    searchUser();
  }, [search]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div className="w-full h-screen bg-white shadow-lg flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 ">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-28" />

        {/* Avatar & Logout */}
        <div className="flex items-center gap-4">
          <Avatar
            width={30}
            height={30}
            name={user?.name}
            imageUrl={user?.profile_pic}
            userId={user?._id}

          />
          <button
            title="Logout"
            className="w-10 h-10 flex justify-center items-center bg-white text-red-600 rounded-full shadow hover:bg-red-100"
            onClick={handleLogout}
          >
            <BiLogOut size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="bg-gray-100 rounded-full shadow flex items-center h-10">
            <div className="p-3">
            <IoSearchOutline size={25} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-transparent outline-none py-2 px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1 p-2 pt-0">
        {searchUser.length === 0 && !loading ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          searchUser.map((user) => (
            <Link
              key={user._id}
              to={`/chat/${user?._id}`}
              className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg"
            >
              <Avatar
                width={40}
                height={40}
                name={user?.name}
                userId={user?._id}
                imageUrl={user?.profile_pic}
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{user?.name}</div>
                <p className="text-sm text-gray-500 truncate">
            {user?.email}
          </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
