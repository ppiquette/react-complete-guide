import React from 'react';

const Order = (props) => {
    return (
        <div>
            {props.item.customer.name}
        </div>
    );
};

export default Order;