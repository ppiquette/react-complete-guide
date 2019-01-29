import React from "react";
import Aux from './../../hoc/Aux'
import cssClasses from './layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;