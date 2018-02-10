import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "../../redux/modules/photos";

const mapStateToProps = (state, ownProps) => {
    const { photos: { photo } } = state;
    return {
        photo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPhoto: (photoId) => {
            dispatch(photoActions.getPhoto(photoId));
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);