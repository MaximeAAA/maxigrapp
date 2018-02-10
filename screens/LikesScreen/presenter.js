import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions
} from "react-native";
import Like from "../../components/Like";

const { width } = Dimensions.get("window");

const LikesScreen = props => (
  <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={props.isFetching}
        onRefresh={props.refresh}
        tintColor={"black"}
      />
    }
  >
    <View style={styles.container}>
      {props.likes.length === 0 ? (
        <Text style={styles.notFound}>
          No likes yet!! Come back sooon!
        </Text>
      ) : (
        props.likes.map(like => (
          <Like key={like.id} {...like} />  
        ))
      )}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  notFound: {
    color: "#bbb",
    fontWeight: "600",
    alignSelf: "center",
    textAlign: "center",
    width,
    marginTop: 20
  }
});

LikesScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  likes: PropTypes.array.isRequired
};

export default LikesScreen;
