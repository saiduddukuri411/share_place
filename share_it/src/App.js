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
import { BdFilter,MdFilter } from "./Usercontext";
import Userplaces from './Pages/UserPlace/frame';
import Updatedplace from './Pages/UpdatePlace/frame';
import Login from './Pages/Login/frame';

const App = () => {
  // const bool=React.useContext(BdFilter);
  // console.log(bool);
  
  const [bd,setbd]=React.useState(false);  //backdrop
  const [sd,setsd]=React.useState(false);  //side drawer
  const [md,setmd]=React.useState(false);  //model
  const [ti,setti]=React.useState('');   //title
  const [mp,setmp]=React.useState(false)  //map
  const [de,setde]=React.useState(false);  //setting delete card
  const [details,setdetails]=React.useState({description:'',lat:'',long:'',id:''})
  const [li,setli]=React.useState(false) //authentication
  const [uid,setuid]=React.useState(null)//userid after logging in
  return (
    <>
      <Router>
      <BdFilter.Provider value={{bd,setbd,sd,setsd,li,setli,uid,setuid}}>
        <Header />
        <Switch>
          <Route path="/" component={allUsers} exact={true} />
          <Route path="/places/new" component={addPlaces} exact={true} />
          <Route path="/auth/login" component={Login} exact={true}/>
          <Route path="/places/:placeId" component={Updatedplace} exact={true}/>
          <MdFilter.Provider value={{md,setmd,ti,setti,mp,setmp,details,setdetails,de,setde}}>
            <Switch>
          <Route path="/:userId/places" component={Userplaces} exact={true} />
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
