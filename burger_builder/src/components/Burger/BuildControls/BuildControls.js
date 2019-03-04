import React from 'react';
import cssClasses from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
import cssButtonClasses from './OrderButton.module.css'

const controls = [
    {label:"Meat", type:"meat"},
    {label:"Cheese", type:"cheese"},
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"}
]

const buildControls = (props) => {
        
        return (
        <div className={cssClasses.BuildControls}>

            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((item) => {
                return (
                    <BuildControl 
                        key={item.label} 
                        label={item.label}
                        added={() => props.ingredientAdded(item.type)}
                        removed={() => props.ingredientRemoved(item.type)}
                        disabled={props.disabledLess[item.type]}/>
                )
            })}
            <button 
                className={cssButtonClasses.OrderButton} 
                disabled={!props.enableOrderNow} 
                onClick={props.toSummary}>ADD BURGER</button>

        </div>
    );
}; 
export default buildControls;
 