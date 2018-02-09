import { StackNavigator } from "react-navigation";
import LogInScreen from "../screens/LogInScreen";

const LoggedOutNavigation = StackNavigator({
    LogIn: {
        screen: LogInScreen
        /*
        navigationOptions: {
            title: "Log In",
            header: null
        }
        */
    }
});

export default LoggedOutNavigation;