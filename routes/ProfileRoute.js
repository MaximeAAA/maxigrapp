import { StackNavigator } from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const ProfileRoute = StackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      // (props) => props.screenProps
      navigationOptions: ({ screenProps }) => ({
        headerTitle: screenProps.username
      })
    },
    ...sharedRoutes
  },
  {
    ...sharedOptions
  }
);

export default ProfileRoute;