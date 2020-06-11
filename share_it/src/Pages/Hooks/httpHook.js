import React from "react";

export const useHttpHook = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, seterror] = React.useState(null);
  const activeHttpRequests=React.useRef([]);
 

  const senRequest = React.useCallback(async (url, method = "GET", body = null, headers = {}) => {
      setLoading((prev)=>true);
      seterror((prev)=>null)
      const httpAbortCtrl= new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
    try {
      const response=await fetch(url, {
        method,
        body,
        headers,
        signal:httpAbortCtrl.signal,
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
  },[]);

  const clearError=React.useCallback(()=>{
    seterror((prev)=>null)
  },[])
  //  React.useEffect=(()=>{
  //   return ()=>{
  //      activeHttpRequests.current.forEach(abort=>abort.abort());
  //   }
  // },[]);
  

  return {isLoading,error,senRequest,clearError};
};
