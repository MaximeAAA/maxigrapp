import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import LogInScreen from "./presenter";

class Container extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Log In",
    header: null
  });

  static propTypes = {
    login: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired
  }
  
  state = {
    username: "",
    password: "",
    isSubmitting: false
  }

  _changeUsername = text => {
    this.setState({
      username: text
    })
  }

  _changePassword = text => {
    this.setState({
      password: text
    })
  }

  _submit = async() => {
    const { username, password, isSubmitting } = this.state;
    const { login } = this.props;
    if(!isSubmitting) {
      if(username && password) {
        // submit
        this.setState({
          isSubmitting: true
        });
        const loginResult = await login(username, password);
        if(!loginResult){
          Alert.alert("Something went wrong, try agian");
          this.setState({ isSubmitting: false });
        }
      } else {
        Alert.alert("All fields are required");
      }
    }
  }

  _handleFBLogin = async () => {
    const { fbLogin } = this.props;
    this.setState({isSubmitting: true});
    const facebookResult = await fbLogin();
    if(!facebookResult){
      this.setState({isSubmitting: false});
    }
  }

  render() {
    return (
      <LogInScreen 
        {...this.state} 
        changeUsername={this._changeUsername} 
        changePassword={this._changePassword} 
        submit={this._submit}
        fbLogin={this._handleFBLogin}
      />
    )
  }
}

export default Container;