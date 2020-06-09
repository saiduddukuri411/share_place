import React from "react";
import Notfound from "../NotFound/notFound";
import { Link, useHistory } from "react-router-dom";
import ImgCard from "../UserPlace/components/imageCard";
import { BdFilter, MdFilter } from "../../Usercontext";
import Backdrop from "../Backdop/backdrop";
import Sidedrawer from "../Backdop/Sidedrawer";
import Model from "../Backdop/model";
import { useHttpHook } from "../Hooks/httpHook";
import Errmodel from "../Err_model/frame.js";
import Loader from "../Loading/frame";

const MyPlaceFrame = () => {
  const { bd, li, uid,setbd } = React.useContext(BdFilter);
  const { md,setmd } = React.useContext(MdFilter);
  const [loadeddata, setdata] = React.useState("loading");
  const { isLoading, error, senRequest, clearError } = useHttpHook();
  const history = useHistory();
  const navigate = () => {
    history.push("/");
  };
  React.useEffect(()=>{
    setbd((prev)=>false)
    setmd((prev)=>false)
 },[])
  const id = uid;
  React.useEffect(() => {
    console.log("sai");
    const fetchPlaces = async () => {
      try {
        const ResponseData = await senRequest(
          process.env.REACT_APP_BACKEND_URL+`/places/${id}/places`
        );
        if (ResponseData) {
          setdata(() => ResponseData.data);
        }
      } catch (err) {}
    };
    fetchPlaces();
  }, [senRequest, id]);
  const data = loadeddata;
  if (error) {
    return (
      <Errmodel
        err={error}
        title="An Error Occured!"
        fun={navigate}
        btn="Home"
      />
    );
  }
  if (data === "loading") {
    return <Loader />;
  }
  const deletePlaceHandler=(placeId)=>{
    setdata(data.filter(place=>place.id!==placeId));
    setmd((prev)=>false)
    setbd((prev)=>false)
  }
  if (data.length === 0) {
    return (
      <>
        <div className="not-found">
          <Notfound text="PLACES NOT FOUND" />
          <Link to="/places/new" style={{ textDecoration: "none" }}>
            {li && uid === id ? <h3>+ADD ONE</h3> : null}
          </Link>
        </div>
        {bd ? <Backdrop /> : null};
        <Sidedrawer />;
      </>
    );
  }
  return (
    <>
      <section className="frame">
        <div className="frame-container">
          {data.map((place) => {
            return (
              <ImgCard
                key={place.id}
                url={place.image}
                name={place.title}
                details={{description:place.description,lat:place.location.lat,lng:place.location.lng,id:place.id}}
                user={id}
                afterDelete={deletePlaceHandler}
              />
            );
          })}
        </div>
      </section>
      {bd ? <Backdrop /> : null};{md ? <Model /> : null};
      {isLoading?<Loader />:null}
      {loadeddata==='loading'?<Loader />:null}
      {error?<Errmodel err={error} title="An Error Occured!" fun={navigate} btn="Home"/>:null}

      <Sidedrawer />
    </>
  );
};

export default MyPlaceFrame;
