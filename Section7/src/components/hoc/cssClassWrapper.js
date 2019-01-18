import React, { Component } from 'react'
// import React from 'react'

// just a simple javascript function that returned another function (that return the div and its content). 
// const compWrapperWithClass = (WrappedComponent, className) => {
//     return (props) => {
//         return (
//             <div className={className}>
//                 <WrappedComponent {...props} />
//             </div>
//         )
//     }
// }

// The previous returned function could also have been a returned class (with no name)
// The firts parameter is what makes the component different. That way, it is intended 
// to be used in the "export" statement
const cssClassWrapper = (WrappedComponent, className) => {

    // The returned value is now stored in a var (F) so it can be used for ref forwarding
    const F = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }
    // The forwardRef function creates one more layer of component named "ForwardRef" that enable us to tunnel through 
    // an underlying high level components
    return React.forwardRef((props, ref) => {
        return <F {...props} forwardedRef={ref}/>;
    })
}

export default cssClassWrapper