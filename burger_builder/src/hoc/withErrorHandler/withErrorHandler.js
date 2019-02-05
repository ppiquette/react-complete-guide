import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        
        state = {
            error: null
        }

        componentDidMount(){
            axiosInstance.interceptors.request.use(
                request => {
                    // reset error on retry
                    this.setState({error: null})
                    return request;
                }, 
                error => {
                    console.log(error);
                    this.setState({error: error})
                    return Promise.reject(error);
                }
            )

            axiosInstance.interceptors.response.use(
                response => response, 
                error => {
                    console.log(error);
                    this.setState({error: error})
                    return Promise.reject(error);
                }
            )
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
                    <WrappedComponent/>
                </>
            );
        }
    }
}

export default withErrorHandler;