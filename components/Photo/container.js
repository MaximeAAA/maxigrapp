import React, { Component } from "react";
import PropTypes from "prop-types";
import Photo from "./presenter";

class Container extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLiked: props.is_liked,
            likeCount: props.like_count
        }
    }

    static propTypes = {
        dispatchLike: PropTypes.func.isRequired
    };

    // async, await 사용시 조금느려서 제거
    _handlePress = () => {
        const { dispatchLike } = this.props;
        const { isLiked } = this.state;
        const result = dispatchLike(isLiked);
        if(result){
            if(isLiked){ // 좋아요->싫어요
                this.setState(prevState => {
                    return {
                        isLiked: false,
                        likeCount: prevState.likeCount - 1
                    };
                });
            } else { // 싫어요->좋아요
                this.setState(prevState => {
                    return {
                        isLiked: true,
                        likeCount: prevState.likeCount + 1
                    };
                });
            }

        } 

    };

    render () {
        //console.log(this.props);
        return <Photo handlePress={this._handlePress} {...this.props} {...this.state} />;
    }
}

export default Container;