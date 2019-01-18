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
// The previous can be uncomment instead of the following
const compWrapperWithClass = (WrappedComponent, className) => {

    // The returned value is now stored in a var (F for function) so it can be used for ref forwarding
    const F = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            )

        }
    }
    // The forwardRef function creates, I think, one more layer of component that enable us to tunnel through 
    // high level components
    return React.forwardRef((props, ref) => {
        return <F {...props} forwardedRef={ref}/>;
    })
}

export default compWrapperWithClass