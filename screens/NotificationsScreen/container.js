import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationsScreen from "./presenter";

class Container extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    getNotifications: PropTypes.func.isRequired
  };

  static defaultProps = {
    notifications: []
  };

  state = {
    isFetching: false
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.notifications) {
      this.setState({ isFetching: false });
    }
  };

  _refresh = () => {
    const { getNotifications } = this.props;
    this.setState({
      isFetching: true
    });
    getNotifications();
  };

  render() {
    return (
      <NotificationsScreen
        {...this.props}
        {...this.state}
        refresh={this._refresh}
      />
    );
  }
}

export default Container;
