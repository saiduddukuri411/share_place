import React from "react";
import "./styles/sidedrawer.scss";
import { BdFilter } from "../../Usercontext";
import { CSSTransition } from "react-transition-group";
import { links } from "../Header/components/data";
import Card from '../Header/components/card'


const Sidedrawer = () => {
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
          {links.map((link, index) => (
            <Card key={index} text={link.name} link={link.link} />
          ))}
        </section>
      </aside>
    </CSSTransition>
  );
};
export default Sidedrawer;
