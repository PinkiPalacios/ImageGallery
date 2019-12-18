import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import List from '../views/List'
import ImageView from '../views/Image'
import { heightPercentageToDP } from 'react-native-responsive-screen';




const mainStack = createStackNavigator(
    {
        List: {
            screen: List,
            navigationOptions: {
                title: 'Gallery App'
            }
        },
        ImageView: {
            screen: ImageView
        }
    })


export const RootNavigator = createAppContainer(mainStack)