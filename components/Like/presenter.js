import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import FadeIn from "react-native-fade-in-image";
import { withNavigation } from "react-navigation";

const { width, height } = Dimensions.get("window");

const Like = props => (
  <View style={styles.container}>
    <TouchableOpacity
      onPressOut={() =>
        props.navigation.navigate("ProfileDetail", {
          user: props
        })
      }
    >
      <FadeIn>
        <Image
          source={
            props.profile_image
              ? {
                  uri: props.profile_image
                }
              : require("../../assets/images/noPhoto.jpg")
          }
          style={styles.avatar}
          defaultSource={require("../../assets/images/noPhoto.jpg")}
        />
      </FadeIn>
    </TouchableOpacity>
    <View style={styles.centerText}>
      <Text style={styles.username}>{props.username}</Text>
      <Text style={styles.name}>{props.name}</Text>
    </View>
    {!props.is_self && 
      <TouchableOpacity
          onPressOut={props.handleFollowPress}
          style={styles.touchable}
      >
          <View style={styles.button}>
            <Text style={styles.btnText}>
              {props.isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </View>
      </TouchableOpacity>
    }
  
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  username: {
    fontWeight: "600"
  },
  name: {
    fontWeight: "600",
    fontSize: 12,
    color: "#bbb"
  },
  centerText: {
    marginRight: "auto",
    width: width / 2.5,
  },
  payload: {
    width: 50,
    height: 50
  },
  touchable: {
    borderRadius: 3,
    backgroundColor: "#3e99ee"
  },
  button: {
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: "hidden"
  },
  btnText: {
    fontWeight: "600",
    textAlign: "center",
    color: "white"
  }
});

Like.propTypes = {
  bio: PropTypes.string,
  followers_count: PropTypes.number.isRequired,
  following: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  post_count: PropTypes.number.isRequired,
  profile_image: PropTypes.string,
  username: PropTypes.string.isRequired,
  website: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  handleFollowPress: PropTypes.func.isRequired
};

export default withNavigation(Like);
