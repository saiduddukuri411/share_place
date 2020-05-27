import React from "react";
import "./styles/sidedrawer.scss";
import { BdFilter } from "../../Usercontext";
import { CSSTransition } from "react-transition-group";
import { login_links,logout_links } from "../Header/components/data";
import Card from '../Header/components/card'


const Sidedrawer = () => {
  const {li}=React.useContext(BdFilter);
  let header_links;
  if(li){
   header_links=login_links.map((link, index) => (
    <Card key={index} text={link.name} link={link.link} />
  ))
  }else{
    header_links=logout_links.map((link, index) => (
      <Card key={index} text={link.name} link={link.link} />
    ))
  }
  const { sd } = React.useContext(BdFilter);
  return (
    <CSSTransition
      in={sd}
      timeout={300}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer">
        <section className="card-container">
          {header_links}
        </section>
      </aside>
    </CSSTransition>
  );
};
export default Sidedrawer;
