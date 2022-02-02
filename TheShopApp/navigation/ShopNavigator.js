import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";
import { Platform } from 'react-native';
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import { createDrawerNavigator } from 'react-navigation-drawer';
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import CustomDrawerContentComponent from '../components/UI/CustomDrawerContentComponent';
import UserProductsScreen from "../screens/user/UserProductsScreen";

const defaultNavOptions =  {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator({
    ProductsOverView: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,

}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons color={drawerConfig.tintColor} size={23} name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} />
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
      drawerIcon: drawerConfig => <Ionicons color={drawerConfig.tintColor} size={23} name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons color={drawerConfig.tintColor} size={23} name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const shopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: CustomDrawerContentComponent
});
export default createAppContainer(shopNavigator);
