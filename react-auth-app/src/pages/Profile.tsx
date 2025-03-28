import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import authSlice from "../store/slices/auth";
import useSWR from 'swr';
import type {UserResponse} from "../utils/types";
import {fetcher} from "../utils/axios";
import {RootState} from "../store";


const Profile = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = account?.user?.id;

  const user = useSWR<UserResponse>(`/api/user/${userId}/`, fetcher);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/login");
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full p-6">
        <button
          onClick={handleLogout}
          className="rounded p-2 w-32 bg-red-700 text-white"
        >
          Logout
        </button>
      </div>
        {
            user.data ?
                <div className="w-full h-full text-center items-center">
                    <p className="self-center my-auto">Welcome, {user.data?.username}</p>
                </div>
                :
                <p className="text-center items-center">Loading ...</p>
        }
    </div>
  );
};

export default Profile;
