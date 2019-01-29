import React from "react";
import Aux from './../../hoc/Aux'
import cssClasses from './layout.module.css'

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer</div>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;