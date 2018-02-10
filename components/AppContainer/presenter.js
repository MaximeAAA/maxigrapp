import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";

class AppContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired
  };

  state = {
    isInitApp: false
  }

  componentDidMount = () => {
    const { isLoggedIn, initApp } = this.props;
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      initApp();
      this.setState({ isInitApp: true});
    }
  }
  
  componentWillReceiveProps = nextProps => {
    //console.log("+++++++++++componentWillReceiveProps++++++++++++++++++", this.state.isInitApp);
    //console.log(nextProps);

  }

  render() {
    const { isLoggedIn, profile } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        {isLoggedIn && profile ? (
          <RootNavigation screenProps={{ username: profile.username }} />
        ) : (
          <LoggedOutNavigation />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

export default AppContainer;