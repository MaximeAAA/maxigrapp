import React from "react";
import { Button } from "react-native";
import { StackNavigator } from "react-navigation";
import TakePhotoScreen from "../screens/TakePhotoScreen";
import TabsNavigation from "./TabsNavigation";
import UploadPhotoScreen from "../screens/UploadPhotoScreen";
import AddPhotoNavigation from "./AddPhotoNavigation";

// TakePhoto: TakePhotoScreen을 리턴시 <View>때문에 props전달이 안되어 navigation을 지정
const RootNavigator = StackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: {
        header: null
      }
    },
    TakePhoto: {
      screen: AddPhotoNavigation,
      navigationOptions: {
        header: null
      }
    },
    UploadPhoto: {
        screen: UploadPhotoScreen,
        // Navigation customizing
        navigationOptions: ({navigation}) => ({
          title: "Upload Photo",
          headerLeft: <Button title={"Cancel"} color={"black"} onPress={() => navigation.goBack(null)} />
        })
    }
  },
  {
    mode: "modal"
  }
);

export default RootNavigator;