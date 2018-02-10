import React, { Component } from "react";
import PropTypes from "prop-types";
import Like from "./presenter";

class Container extends Component {
  // Optimistic update 구현을 위해 following을 state에 먼저 저장
  // follow/unfollowUser 실행후 state를 변경, 리로딩하지 않고 변경된것을 구현
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: props.following
    };
  }

  static propTypes = {
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    console.log(this.state);
  }

  render() {
    return (
      <Like
        handleFollowPress={this._handleFollowPress}
        {...this.props}
        {...this.state}
      />
    );
  }

  _handleFollowPress = () => {
    const { isFollowing } = this.state;
    const { followUser, unfollowUser } = this.props;
    if (isFollowing) {
      unfollowUser();
      this.setState({ isFollowing: false });
    } else {
      followUser();
      this.setState({ isFollowing: true });
    }
  };
}

export default Container;
