import React from "react";
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

const Frame = () => {
  const [isloading, setIsloading] = React.useState(true);
  const [iserror, setIserror] = React.useState(null);
  const [loadedUsers, setLoadedusers] = React.useState([]);
  const [Retry, setRetry] = React.useState(false);
  const retry = () => {
    setIsloading((prev) => true);
    setIserror((prev) => null);
  };
  React.useEffect(() => {
    const sendRequest = async () => {
      setIsloading((prev) => true);
      setIserror((prev) => null);
      try {
        const response = await fetch("http://localhost:5000/api/users/");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message);
        }
        setIsloading((prev) => false);
        setLoadedusers((prev) => resData.users);
      } catch (err) {
        if(err.message){
          if(err.message==='no user exist'){
            setIsloading((prev) => false);
            setIserror((prev)=>null)
            return;
          }
        }
        setIsloading((prev) => false);
        setIserror((prev) => {
           return err.message||'Something Went Wrong'
        });
      }
    };
    sendRequest();
  }, [Retry]);
  const users = loadedUsers;
  const { bd } = React.useContext(BdFilter);

  if (isloading) {
    return <Loader />;
  }
  if (iserror) {
    return (
      <Errmodel
        err={iserror}
        title="An Error Occured!"
        fun={retry}
        btn="Retry"
      />
      
    );
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
