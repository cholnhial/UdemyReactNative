import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button} from 'react-native';
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavouritesScreen from "./screens/FavouritesScreen";
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

//import FavouritesContextProvider from "./store/context/favourites-context";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (<Drawer.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#351401',
        },
        headerTintColor: "white",
        sceneContainerStyle: {
            backgroundColor: '#3f2f25'
        },
        drawerContentStyle: {
            backgroundColor: '#351401',
        },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#3f2f25',
        drawerActiveBackgroundColor: '#e4baa1'
    }}>
            <Drawer.Screen name="Categories" options={{
                title: 'All Categories',
                drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name='list' />
            }} component={CategoriesScreen}/>
            <Drawer.Screen options={{
                drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name='star' />
            }} name="Favourites" component={FavouritesScreen} />
    </Drawer.Navigator>)
}
export default function App() {
  return (
      <>
        <StatusBar style="light"/>
          {/*<FavouritesContextProvider>*/}
          <Provider store={store}>
              <NavigationContainer>
                  <Stack.Navigator screenOptions={{
                      headerStyle: {
                          backgroundColor: '#351401',
                      },
                      headerTintColor: "white",
                      contentStyle: {
                          backgroundColor: '#3f2f25'
                      }
                  }}>
                      <Stack.Screen name="Drawer"
                                    component={DrawerNavigator}
                                    options={{
                                        headerShown: false
                                    }}
                      />
                      <Stack.Screen name="MealsOverview"
                                    component={MealsOverviewScreen}
                                    options={({route, navigation}) => {
                                        /* const catId = route.params.categoryId;
                                         return {
                                             title:
                                         }*/
                                    }}/>
                      <Stack.Screen name="MealDetail"
                                    options={{
                                        title: 'About the Meal'
                                    }}
                                    component={MealDetailScreen}
                      />
                  </Stack.Navigator>
              </NavigationContainer>
          </Provider>
          {/*</FavouritesContextProvider>*/}
      </>

  );
}

const styles = StyleSheet.create({
  container: {
  },
});
