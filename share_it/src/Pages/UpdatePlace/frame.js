import React from "react";
import { Places } from "../UserPlace/components/userPlacedata";
import { Link } from "react-router-dom";
import Notfound from "../NotFound/notFound";
import "./styles/frame.scss";
import { useForm } from "./components/formHook.js";
import Input from "./components/ownInput";
import { BdFilter } from "../../Usercontext";
import Sidedrawer from "../Backdop/Sidedrawer";
import Backdrop from "../Backdop/backdrop";

const Frame = (props) => {
  const { bd } = React.useContext(BdFilter);
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
  const exact_list = Places.find((item) => item.id === place_id);
  const title_setter = exact_list === undefined ? "" : exact_list.title;
  const description_setter =
    exact_list === undefined ? "" : exact_list.description;
  const [state, handler] = useForm({
    title: title_setter,
    desc: description_setter,
  });

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
      <form className="form">
        <Input
          label="Title"
          category="input"
          error="Title required"
          placeholder="Enter place name"
          handler={handler}
          name="title"
          value={state["title"]}
          validations={[{ type: "REQUIRED" }]}
          validhandler={totalValidation}
        />
        <Input
          label="Description"
          category="text_area"
          error="Describe in 20 to 350 letters"
          placeholder="Say about place"
          name="desc"
          handler={handler}
          value={state["desc"]}
          validhandler={totalValidation}
          validations={[
            { type: "MIN_LENGTH", min: 20 },
            { type: "MAX_LENGTH", max: 350 },
          ]}
        />
        <div className="button_cover">
          <div
            className={
              check_validity() ? "form_submit" : "form_submit display_none"
            }
          >
            <h3>UPDATE</h3>
          </div>
          <Link
            to={`/${exact_list.owner}/places`}
            style={{ textDecoration: "none" }}
          >
            <div className="back_button">
              <h3>BACK</h3>
            </div>
          </Link>
        </div>
      </form>
    </div>
    {bd?<Backdrop />:null};
       <Sidedrawer />
    </>
  );
};

export default Frame;
