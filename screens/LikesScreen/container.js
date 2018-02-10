import React, { Component } from "react";
import PropTypes from "prop-types";
import LikesScreen from "./presenter";

class Container extends Component {
  static propTypes = {
    likes: PropTypes.array,
    getPhotoLikes: PropTypes.func.isRequired
  };

  static defaultProps = {
    likes: []
  };

  state = {
    isFetching: false
  };

  componentDidMount = () => {
      const { getPhotoLikes } = this.props;
      const { navigation: { state: { params: { photoId } } } } = this.props;
      getPhotoLikes(photoId);
      //console.log("componentDidMount", this.props);
    }
    
    componentWillReceiveProps = nextProps => {
        if (nextProps.likes) {
            this.setState({ isFetching: false });
        }
    };
    
    _refresh = () => {
        const { getPhotoLikes } = this.props;
        const { navigation: { state: { params: { photoId } } } } = this.props;
        this.setState({
            isFetching: true
        });
        getPhotoLikes(photoId);
  };

  render() {
    return (
      <LikesScreen
        {...this.props}
        {...this.state}
        refresh={this._refresh}
      />
    );
  }
}

export default Container;
