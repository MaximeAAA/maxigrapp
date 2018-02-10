import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import PhotoScreen from "./presenter";
import Photo from "../../components/Photo";

class Container extends Component {

    static propTypes = {
        getPhoto: PropTypes.func.isRequired
    };    

    state = {
        isFetching: false
    };

    componentDidMount = () => {
        const { getPhoto } = this.props;
        const { navigation : { state : { params : { photoId }} }} = this.props;
        getPhoto(photoId);
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.photo) {
            this.setState({
                isFetching: false
            });
        }
        //console.log(nextProps.photo);
    };    
    
    render() {
        return <PhotoScreen {...this.state} {...this.props} refresh={this._refresh} />;
       
    }

    _refresh = () => {
        this.setState({ isFetching: true });
        const { getPhoto } = this.props;
        const { navigation: { state: { params: { photoId } } } } = this.props;
        getPhoto(photoId);
    }
}

export default Container;