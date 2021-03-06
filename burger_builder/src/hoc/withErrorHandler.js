import React, { Component } from 'react';
import Modal from '../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        
        state = {
            error: null
        }

        componentWillMount(){
            this.requestInterceptor = axiosInstance.interceptors.request.use(
                request => {
                    // reset error on retry
                    this.setState({error: null})
                    console.log(request)
                    return request;
                }, 
                error => {
                    console.log(error);
                    this.setState({error: error})
                    return Promise.reject(error);
                }
            )

            this.responseInterceptor = axiosInstance.interceptors.response.use(
                response => {
                    console.log(response)
                    return response
                }, 
                error => {
                    console.log(error);
                    this.setState({error: error})
                    return Promise.reject(error);
                }
            )
        }

        componentWillUnmount(){
            // Otherwise the interceptors are never cleaned up and if we use this hoc in 
            // components that get often deleted, the interceptor will not be released and it 
            // will create memory leak.
            axiosInstance.interceptors.request.eject(this.requestInterceptor);
            axiosInstance.interceptors.response.eject(this.responseInterceptor);
        }

        closeErrorMessage = () =>{
            this.setState({error: null});
        }

        render() {
            let message = "";
            if (this.state.error !== null) 
                message = this.state.error.message;
    
            return (
                <>
                    <Modal 
                        show={this.state.error !== null}
                        backdropClicked={this.closeErrorMessage}
                    >
                        {message}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </>
            );
        }
    }
}

export default withErrorHandler;