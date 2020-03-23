import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Wrapper from "../Wrapper";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };
      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
      this.reqInterceptors = axios.interceptors.request.use(
        req => {
          this.setState({ error: null });
          return req;
        },
        err => {
          this.setState({ error: err });
        }
      );
    }

    componentWillUnmount() {
      console.log(
        "Will unmount this shit",
        this.resInterceptors,
        this.reqInterceptors
      );
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Wrapper>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Wrapper>
      );
    }
  };
};

export default withErrorHandler;
