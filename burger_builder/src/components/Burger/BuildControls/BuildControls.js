import React from 'react';
import cssClasses from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:"Meat", type:"meat"},
    {label:"Cheese", type:"cheese"},
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"}
]

const buildControls = (props) => {
        
        return (
        <div className={cssClasses.BuildControls}>
            <p>{controls.map((item, index) => {
                return (
                    <BuildControl 
                        key={item.label} 
                        label={item.label}
                        added={() => props.ingredientAdded(item.type)}
                        removed={() => props.ingredientRemoved(item.type)}
                        disabled={props.disabledInfo[item.type]}/>
                )
            })
            }</p>
        </div>
    );
}; 
export default buildControls;
 