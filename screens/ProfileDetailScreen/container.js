import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";

class Container extends Component {
    static navigationOptions = ( { navigation } ) => ({
        title: navigation.state.params.user.username
    });

    constructor(props) {
        super(props);
        const { navigation : { state : { params : { user } } } } = props;
        this.state = {
            profileObject: user
        }
    }

    componentDidMount = () => {
        this._getProfile();
    }
    
    _getProfile = async() => {
        const { getProfile } = this.props;
        const { profileObject : { username} } = this.state;
        const completeProfile = await getProfile(username);
        //console.log(completeProfile);
        if(completeProfile.username){
            this.setState({ profileObject : completeProfile });
        }

    }

    render() {
        const { profileObject } = this.state;
        return <Profile profileObject={profileObject} refresh={this._getProfile} />;
    }
}

export default Container;