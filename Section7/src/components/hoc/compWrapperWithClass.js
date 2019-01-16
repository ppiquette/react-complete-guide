import React, { Component } from 'react'

// just a simple javascript function that returned another function (that return the div and its content). 
const compWrapperWithClass = (WrappedComponent, className) => {
    return (props) => {
        return (
            <div className={className}>
                <WrappedComponent {...props} />
            </div>
        )
    }
}

// The previous returned function could also have been a returned class (with no name)
// The following can be uncomment instead of the previous
// const compWrapperWithClass = (WrappedComponent, className) => {
//     return class extends Component {
//         render() {
//             return (
//                 <div className={className}>
//                     <WrappedComponent {...this.props} />
//                 </div>
//             )
// 
//         }
//     }
// }

export default compWrapperWithClass