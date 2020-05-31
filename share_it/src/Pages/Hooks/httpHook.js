import React from "react";

export const useHttpHook = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, seterror] = React.useState(null);

  const senRequest = async (url, method = "GET", body = null, headers = {}) => {
      setLoading((prev)=>true);
      setLoading((prev)=>null)
    try {
      const response=await fetch(url, {
        method,
        body,
        headers,
      });
    const responseData=await response.json();
    if(!response.ok){
        throw new Error(responseData.message)
    }

    setLoading((prev)=>false);
    return responseData;
    } catch (err) {
    setLoading((prev)=>false);
    seterror((prev=>err.message||'something went wrong'));
    }
  };

  return {isLoading,error,senRequest};
};
