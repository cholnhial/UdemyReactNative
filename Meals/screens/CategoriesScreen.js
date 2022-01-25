import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Platform } from 'react-native';
import { CATEGORIES} from "../data/dummy-data";
import Colors from "../constants/Colors";
import CategoryGridTile from "../components/CategoryGridTile";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const CategoriesScreen = props => {

    const renderGridItem = itemData => {
        return (
            <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onSelect={() => {
                props.navigation.navigate({routeName: 'CategoryMeals',
                    params: {categoryId: itemData.item.id, }})
            }} />
         )
    }

    return (
        <FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meals Categories',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
    }
};

export default CategoriesScreen;
