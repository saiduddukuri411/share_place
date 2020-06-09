import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import allUsers from "./Pages/AllUsers/Frame";
import addPlaces from "./Pages/AddPlace/frame";
import Header from "./Pages/Header/frame";
import { BdFilter, MdFilter } from "./Usercontext";
import Userplaces from "./Pages/UserPlace/frame";
import Updatedplace from "./Pages/UpdatePlace/frame";
import Login from "./Pages/Login/frame";
import Myplaces from "./Pages/Myplaces/frame";
let logoutTimer;

const App = () => {
  // const bool=React.useContext(BdFilter);
  // console.log(bool);

  const [bd, setbd] = React.useState(false); //backdrop
  const [sd, setsd] = React.useState(false); //side drawer
  const [md, setmd] = React.useState(false); //model
  const [ti, setti] = React.useState(""); //title
  const [mp, setmp] = React.useState(false); //map
  const [de, setde] = React.useState(false); //setting delete card
  const [details, setdetails] = React.useState({
    description: "",
    lat: "",
    long: "",
    id: "",
  });
  const [li, setli] = React.useState(false); //authentication
  const [uid, setuid] = React.useState(null); //userid after logging in
  const [token, setToken] = React.useState(null); //userid after logging in
  const [tokenExp,setTokenExp]=React.useState(null);
  React.useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      setli((prev) => true);
      setuid((prev) => storedData.userId);
      setToken((prev) => storedData.token);
      setTokenExp((prev)=>storedData.expiration);
    }
  }, []);
  React.useEffect(() => {
    
    if (token && tokenExp) {
      const remainingTime=new Date(tokenExp).getTime()-new Date().getTime();
      logoutTimer=setTimeout((remainingTime) => {
        setli((prev) => false);
        setToken((preb) => null);
        setuid((prev) => null);
        setTokenExp((prev)=>null);
        localStorage.removeItem("userData");
      }, remainingTime );
    }else{
      clearTimeout(logoutTimer);
    }
  }, [token,tokenExp]);
  return (
    <>
      <Router>
        <BdFilter.Provider
          value={{
            bd,
            setbd,
            sd,
            setsd,
            li,
            setli,
            uid,
            setuid,
            token,
            setToken,
            setTokenExp
          }}
        >
          <Header />
          <Switch>
            <Route path="/" component={allUsers} exact={true} />
            {li ? (
              <Route path="/places/new" component={addPlaces} exact={true} />
            ) : null}

            {li ? (
              <Route
                path="/places/:placeId"
                component={Updatedplace}
                exact={true}
              />
            ) : null}

            <Route path="/auth/login" component={Login} exact={true} />
            <MdFilter.Provider
              value={{
                md,
                setmd,
                ti,
                setti,
                mp,
                setmp,
                details,
                setdetails,
                de,
                setde,
              }}
            >
              <Switch>
                <Route
                  path="/:userId/places"
                  component={Userplaces}
                  exact={true}
                />
                {uid ? (
                  <Route path="/myplaces" component={Myplaces} exact={true} />
                ) : null}
                <Redirect to="/" />
              </Switch>
            </MdFilter.Provider>
            {/* <Redirect to="/" /> */}
          </Switch>
        </BdFilter.Provider>
      </Router>
    </>
  );
};

export default App;
