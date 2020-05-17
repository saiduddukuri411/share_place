import React from "react";
import "./styles/frame.scss";
import { IoMdShareAlt } from "react-icons/io";
import Links from "./components/link";
import { links } from "./components/data";
import { Link} from "react-router-dom";
import {AiOutlineMenuFold} from 'react-icons/ai';
import {BdFilter} from '../../Usercontext';

const Frame = () => {
  const {setbd,setsd}=React.useContext(BdFilter);
  console.log('header.js')
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
          {links.map((link, index) => (
            <Links key={index} text={link.name} link={link.link}/>
          ))}
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
