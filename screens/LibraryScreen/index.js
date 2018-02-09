import React, { Component } from "react";
import { CameraRoll } from "react-native";
import LibraryScreen from "./presenter";

class Container extends Component {
    state = {
        photos: null,
        pickedPhoto: null
    }

    componentWillMount = async() => {
        const { edges } = await CameraRoll.getPhotos({
            first: 2000,
            groupTypes: "SavedPhotos",
            assetType: "Photos"
        });

        this.setState({
            photos: edges,
            pickedPhoto: edges[0]
        });
    }

    _pickPhoto = (photo) => {
        this.setState({
            pickedPhoto: photo
        })
    }

    _approvePhoto = () => {
      // Navigation.js에 지정된 Screen은 navigation을 가지고 있음, 컴포넌트는 없어서 withNavigation 필요
      const { navigation : { navigate} } = this.props;
      const { pickedPhoto } = this.state;
      navigate("UploadPhoto", { url: pickedPhoto.node.image.uri });
    }

    render() {
        return <LibraryScreen {...this.state} pickPhoto={this._pickPhoto} approvePhoto={this._approvePhoto} />;
    }
}

export default Container;