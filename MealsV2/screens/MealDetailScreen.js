import {Text, View, Image, StyleSheet, ScrollView, Button} from 'react-native';
import { useLayoutEffect} from 'react';
import { MEALS} from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {addFavourite, removeFavourite } from '../store/redux/favorites';
function MealDetailScreen ({route, navigation}) {
    //const favouriteMealsCtx = useContext(FavouritesContext);

    const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);

    const dispatch = useDispatch();

    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find(m => m.id === mealId);

    const mealIsFavourite = favouriteMealIds.includes(mealId);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon={mealIsFavourite ? 'star' : 'star-outline'}
                                   color='white'
                                   onPress={changeFavouriteStatusHandler} />
            }
        });

    }, [navigation, changeFavouriteStatusHandler])

    function changeFavouriteStatusHandler() {
        if (mealIsFavourite) {
          //  favouriteMealsCtx.removeFavourite(mealId);
            dispatch(removeFavourite({id: mealId}))
        } else {
           // favouriteMealsCtx.addFavourite(mealId);
            dispatch(addFavourite({id: mealId}))
        }
    }

    return <ScrollView style={styles.rootContainer}>
        <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
            duration={selectedMeal.duration}
            complexity={selectedMeal.complexity}
            affordability={selectedMeal.affordability}
            textStyle={styles.detailText}/>
        <View style={styles.listContainerOuter}>
            <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>
                <List data={selectedMeal.ingredients} />
                <Subtitle>Steps</Subtitle>
                <List data={selectedMeal.steps} />
            </View>
        </View>
    </ScrollView>
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
      marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listContainer: {
        width: '80%'
    },
    listContainerOuter: {
        alignItems: 'center'
    }
});
