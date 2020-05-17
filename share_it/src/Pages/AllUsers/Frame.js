import React from "react";
import "./styles/frame.scss";
import Card from "./components/card";
import Notfound from '../NotFound/notFound';
import {usersdata} from './components/userdata';
import {Link} from 'react-router-dom';
import Backdrop from '../Backdop/backdrop';
import Sidedrawer from '../Backdop/Sidedrawer';
import { BdFilter } from '../../Usercontext';

const Frame = () => {
    const users=usersdata;
    const {bd}=React.useContext(BdFilter);
    if(users.length===0){
       return (
        <>
       <section className="not-found"><Notfound text="No User Registered"/></section>
       {bd?<Backdrop />:null};
       <Sidedrawer />
       </>
       )
    }
  return (
    <>
    <div className="container">
      <div className="child-container">
          {users.map((user,index)=><Link to={`/${user.id}/places`} style={{textDecoration:"none"}} key={user.id}><Card source={user.image} name={user.name} count={user.count}/></Link>)}
      </div>
    </div>
    {bd?<Backdrop />:null};
    <Sidedrawer />;
    </>
  );
};
export default Frame;
