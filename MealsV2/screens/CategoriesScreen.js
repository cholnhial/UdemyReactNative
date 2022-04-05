import React from 'react';
import { FlatList } from 'react-native';
import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";


const CategoriesScreen = ({navigation}) => {

    const renderCategoryItem = (itemData) => {

        function pressHandler() {
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id
            });
        }

        return <CategoryGridTile colour={itemData.item.color}
                                 onPress={pressHandler}
                                 title={itemData.item.title} />
    }

    return <FlatList data={CATEGORIES}
                     renderItem={renderCategoryItem}
                     numColumns={2}
                     keyExtractor={(item) => item.id} />
};


export default CategoriesScreen;
