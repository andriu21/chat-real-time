import React, {  useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../src/page/Auth/index.jsx";
import Chat from "../src/page/Chat/index.jsx";
import Profile from "../src/page/Profile/index.jsx";
import { useAppStore } from "./store/index.js";
import { apiClient } from "./lib/api-client.js";
import { GET_USER_INFO } from "./utils/constants.js";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthnticated = !!userInfo;
  return isAuthnticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthnticated = !!userInfo;
  return isAuthnticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo,setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
   const getUserData = async()=>{
    try {
      const response = await apiClient.get(GET_USER_INFO,{
        withCredentials : true,
      })

      console.log({response})
    } catch (error) {
      console.log(error)
    }
   };
   if(!userInfo){
    getUserData();
   }else{
    setLoading(false)
   }

  },[userInfo,setUserInfo])

  if(loading){
    return <div>Loading....</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
