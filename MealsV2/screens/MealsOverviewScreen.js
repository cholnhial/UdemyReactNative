import React, {useEffect, useLayoutEffect} from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MEALS, CATEGORIES } from '../data/dummy-data';
import MealItem from "../components/MealItem";

function MealsOverviewScreen({ route, navigation}) {
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(c => c.id === catId).title;
        navigation.setOptions({
            title: categoryTitle
        });

    }, [catId, navigation]);

    function renderMealItem(itemData) {
        const mealItemProps = {
            id: itemData.item.id,
            title: itemData.item.title,
            imageUrl: itemData.item.imageUrl,
            duration: itemData.item.duration,
            complexity: itemData.item.complexity,
            affordability: itemData.item.affordability
        };

        return <MealItem {...mealItemProps} />
    }

    return  <View style={styles.container}>
        <FlatList renderItem={renderMealItem} data={displayedMeals} keyExtractor={(item) => item.id} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});

export default MealsOverviewScreen;

