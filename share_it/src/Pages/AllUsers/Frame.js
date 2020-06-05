import React,{useEffect} from "react";
import "./styles/frame.scss";
import Card from "./components/card";
import Notfound from "../NotFound/notFound";
import { usersdata } from "./components/userdata";
import { Link } from "react-router-dom";
import Backdrop from "../Backdop/backdrop";
import Sidedrawer from "../Backdop/Sidedrawer";
import { BdFilter } from "../../Usercontext";
import Loader from "../Loading/frame";
import Errmodel from "../Err_model/frame";
import { useHttpHook } from "../Hooks/httpHook";

const Frame = () => {
  
  const { isLoading, error, senRequest, clearError } = useHttpHook();

  const [loadedUsers, setLoadedusers] = React.useState('Loading');

  React.useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const response = await senRequest("http://localhost:5000/api/users/");
        if(response){
          setLoadedusers((prev)=>response.users)
        }
        
      } catch (err) {
      }
    }
    fetchUsers();
  }, [senRequest]);
  
  const { bd,setbd } = React.useContext(BdFilter);
  React.useEffect(()=>{
   setbd((pre)=>false)
  },[])

  if (isLoading) {
    return <Loader />;
  }
  if (error!==null) {
    return (
      <Errmodel err={error} title="An Error Occured!" fun={clearError} btn="Reload" />
    );
  }
  const users = loadedUsers;
  if(users==='Loading'){
    return <Loader />;
  }
  if (users.length === 0) {
    return (
      <>
        <section className="not-found">
          <Notfound text="No Users Registered" />
        </section>
        {bd ? <Backdrop /> : null};
        <Sidedrawer />
      </>
    );
  }
  return (
    <>
      <div className="container">
        <div className="child-container">
          {users.map((user, index) => (
            <Link
              to={`/${user.id}/places`}
              style={{ textDecoration: "none" }}
              key={user.id}
            >
              <Card
                source={user.image}
                name={user.name}
                count={user.places.length}
              />
            </Link>
          ))}
        </div>
      </div>
      {bd ? <Backdrop /> : null};
      <Sidedrawer />;
    </>
  );
};
export default Frame;
