import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    
    render() {
        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={cssClasses.Input} type='text' name='name' placeholder='John Doe' />
                    <input className={cssClasses.Input} type='email' name='email' placeholder='ty@com' />
                    <input className={cssClasses.Input} type='text' name='street' placeholder='Street' />
                    <input className={cssClasses.Input} type='text' name='postal' placeholder='564655' />
                    <Button buttonType='Success'>Submit</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;