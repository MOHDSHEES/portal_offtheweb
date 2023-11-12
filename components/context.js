import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useSession } from "next-auth/react";

// Create the context
const MyContext = createContext();

// Create a provider component
const MyProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isAuth, setIsAuth] = useState(false);
  // const [data, setData] = useState(null);
  async function getUser() {
    // console.log("in");
    const { data: da } = await axios.post("/api/getEmployee", {
      email: data.user.email,
    });
    if (da) setUser(da);
  }

  const { data } = useSession();
  useEffect(() => {
    if (data && data.user && !user) {
      setLoading(true);
      setUser(data.user);
      getUser();
      setLoading(false);
    }
  }, [data, user]);

  // useEffect(() => {
  //   if (!user && data) ;
  // }, [data, user]);
  // console.log(user);
  return (
    <MyContext.Provider value={{ messageApi, user, setUser, loading }}>
      {contextHolder} {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
