import React from "react";
// import { Places } from "../UserPlace/components/userPlacedata";
import { Link, useHistory } from "react-router-dom";
import Notfound from "../NotFound/notFound";
import "./styles/frame.scss";
import { useForm } from "./components/formHook.js";
import Input from "./components/ownInput";
import { BdFilter } from "../../Usercontext";
import Sidedrawer from "../Backdop/Sidedrawer";
import Backdrop from "../Backdop/backdrop";
import { useHttpHook } from "../Hooks/httpHook";
import Errmodel from "../Err_model/frame";
import Loader from "../Loading/frame";

const Frame = (props) => {
  const { isLoading, error, senRequest, clearError } = useHttpHook();
  const [loadedPlace, setLoadedplace] = React.useState(undefined);
  const [dummytitle, settitle] = React.useState(null);
  const [dummydesc, setdesc] = React.useState(null);
  const [initial, setinital] = React.useState(true);
  const { bd, uid, token } = React.useContext(BdFilter);
  const history = useHistory();
  const navigatePlace = () => {
    history.push("/myplaces");
  };
  const [isValid, setValid] = React.useState({ title: true, desc: true });
  const check_validity = () => {
    return isValid.title && isValid.desc;
  };
  const totalValidation = React.useCallback((name, bool) => {
    setValid((prev) => {
      return {
        ...prev,
        [name]: bool,
      };
    });
  }, []);
  const place_id = props.match.params.placeId;
  React.useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const ResponseData = await senRequest(
          `http://localhost:5000/api/places/${place_id}`
        );
        if (ResponseData) {
          setLoadedplace(() => ResponseData.data);
          setinital((prev) => false);
          settitle((prev) => ResponseData.data.title);
          setdesc((prev) => ResponseData.data.description);
        }
      } catch (err) {}
    };
    fetchPlaces();
  }, [senRequest]);

  const Places = loadedPlace;

  const exact_list = Places;
  const title_setter = loadedPlace === undefined ? "" : loadedPlace.title;
  const description_setter =
    loadedPlace === undefined ? "" : loadedPlace.description;

  const [state, handler] = useForm({
    title: title_setter,
    desc: description_setter,
  });
  const [placeUpdated, setUpdated] = React.useState(false);
  const triggerSubmit = async () => {
    let ti = dummytitle ? dummytitle : state["title"];
    let des = dummydesc ? dummydesc : state["desc"];
    try {
      await senRequest(
        `http://localhost:5000/api/places/${place_id}`,
        "PATCH",
        JSON.stringify({
          title: ti,
          description: des,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setUpdated((prev) => true);
    } catch {}
  };

  if (error) {
    return (
      <Errmodel
        err={error}
        title="An Error Occured!"
        fun={() => {}}
        path="/myplaces"
        btn="My Places"
      />
    );
  }
  if (initial || isLoading) {
    return <Loader />;
  }
  if (exact_list === undefined) {
    return (
      <>
        <div className="not_found">
          <Notfound text="place not found" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3>>HOME</h3>
          </Link>
        </div>
        {bd ? <Backdrop /> : null};
        <Sidedrawer />
      </>
    );
  }

  return (
    <>
      <div className="form_Container">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            label="Title"
            category="input"
            error="Title required"
            placeholder="Enter place name"
            handler={handler}
            name="title"
            value={dummytitle ? dummytitle : state["title"]}
            validations={[{ type: "REQUIRED" }]}
            validhandler={totalValidation}
            executer={settitle}
          />
          <Input
            label="Description"
            category="text_area"
            error="Describe in 20 to 450 letters"
            placeholder="Say about place"
            name="desc"
            handler={handler}
            value={dummydesc ? dummydesc : state["desc"]}
            executer={setdesc}
            validhandler={totalValidation}
            validations={[
              { type: "MIN_LENGTH", min: 20 },
              { type: "MAX_LENGTH", max: 450 },
            ]}
          />
          <div className="button_cover">
            <Link
              to={`/${exact_list.owner}/places`}
              style={{ textDecoration: "none" }}
            >
              <div className="back_button">
                <h3>BACK</h3>
              </div>
            </Link>
            <div
              className={
                check_validity() ? "form_submit" : "form_submit display_none"
              }
              onClick={triggerSubmit}
            >
              <h3>UPDATE</h3>
            </div>
          </div>
        </form>
      </div>
      {bd ? <Backdrop /> : null};{isLoading ? <Loader /> : null}
      {error ? (
        <Errmodel
          err={error}
          title="An Error Occured!"
          fun={navigatePlace}
          path="/myplaces"
          btn="My Places"
        />
      ) : null}
      {placeUpdated ? (
        <Errmodel
          err="Place updated successfully"
          title="Successfullt Updated"
          fun={navigatePlace}
          path="/myplaces"
          btn="My Places"
        />
      ) : null}
      <Sidedrawer />
    </>
  );
};

export default Frame;
