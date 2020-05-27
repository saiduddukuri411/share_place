import React from "react";
import "./styles/frame.scss";
import { IoMdShareAlt } from "react-icons/io";
import Links from "./components/link";
import { login_links,logout_links } from "./components/data";
import { Link} from "react-router-dom";
import {AiOutlineMenuFold} from 'react-icons/ai';
import {BdFilter} from '../../Usercontext';

const Frame = () => {
  const {setbd,setsd,li}=React.useContext(BdFilter);
  let list;
  if(li){
    list =login_links.map((link, index) => (
     <Links key={index} text={link.name} link={link.link}/>
    ))
  }else{
    list =logout_links.map((link, index) => (
      <Links key={index} text={link.name} link={link.link}/>
     )) 
  }
  return (
    <header className="header">
      <div className="content_holder">
        <Link to='/' style={{textDecoration:'none'}}>
          <h1>
            <span>
              <IoMdShareAlt className="icon" />
            </span>
            Share It
          </h1>
        </Link>
        <div className="right-div">
          {list}
        </div>
        <div className="handburger">
            <h1 onClick={(bd)=>{
              setbd((prev)=>!prev)
              setsd((prev)=>!prev)
              }}><AiOutlineMenuFold /></h1>
        </div>
      </div>
    </header>
  );
};
export default Frame;
