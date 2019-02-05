import React, { Component } from 'react';
import cssClasses from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

class Modal extends Component {

    shouldComponentUpdate(nextprops) {
        return (this.props.show !== nextprops.show) || (nextprops.children !== this.props.children);
    }

    render() {
        return (
            <Aux>
                <Backdrop 
                    show={this.props.show} 
                    backdropClicked={this.props.backdropClicked}
                />
                <div 
                    className={cssClasses.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
};

export default Modal;