import { TabNavigator } from "react-navigation";
import CameraScreen from "../screens/CameraScreen";
import LibraryScreen from "../screens/LibraryScreen";

const AddPhotoNavigations = TabNavigator(
    {
        Camera: {
            screen: CameraScreen,
            navigationOptions:{
                tabBarLable: "Photo"
            }
        },
        Library: {
            screen: LibraryScreen,
            navigationOptions:{
                tabBarLable: "Library"
            }
        }
    },
    {
        tabBarPosition: "top",
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            showLabel: true,
            upperCaseLabel: true,
            activeTintColor: "black",
            inactiveTintColor: "#bbb",
            style: {
                backgroundColor: "white",
                alignItems: "center"
            },
            labelStyle: {
                fontSize: 14,
                fontWeight: "600"
            },
            showIcon: false
        }
    }
);

export default AddPhotoNavigations;