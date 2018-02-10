import { connect } from "react-redux";
import AppContainer from "./presenter";
import { actionCreators as photoActions } from "../../redux/modules/photos";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    //console.log("user:",user);
    return {
        isLoggedIn: user.isLoggedIn,
        profile: user.profile
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initApp: () => {
            console.log("init start");
            dispatch(photoActions.getFeed());
            dispatch(photoActions.getSearch());
            dispatch(userActions.getNotifications());
            dispatch(userActions.getOwnProfile());
            console.log("init end");
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);