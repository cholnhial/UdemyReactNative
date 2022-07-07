import {useContext } from 'react';
import MealsList from "../components/MealsList/MealsList";
import {FavouritesContext} from "../store/context/favourites-context";
import {MEALS} from "../data/dummy-data";
import { View, Text, StyleSheet } from "react-native";

function FavouritesScreen() {
    const favouriteMealsCtx = useContext(FavouritesContext);
    const favouriteMeals = MEALS.filter(meal => favouriteMealsCtx.ids.includes(meal.id));

    if (favouriteMeals.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>You have no favourite meals yet.</Text>
            </View>
        )
    }

    return <MealsList items={favouriteMeals} />
 }

export default FavouritesScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
});
