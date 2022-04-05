import React from 'react';
import { View, StyleSheet, Text, Pressable, Platform} from "react-native";

const CategoryGridTile = ({colour, title, onPress}) => {
    return <View style={styles.gridItem}>
        <Pressable android_ripple={{color: '#ccc'}}
                   onPress={onPress}
                   style={({pressed}) => [styles.button,
            pressed ? styles.buttonPressed : null]}>
            <View style={[styles.innerContainer, {backgroundColor: colour} ]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
   gridItem: {
       flex: 1,
       margin: 16,
       height: 150,
       borderRadius: 8,
       elevation: 4,
       shadowColor: 'black',
       shadowOpacity: 0.25,
       backgroundColor: 'white',
       shadowOffset: {width: 0, height: 2},
       shadowRadius: 8,
       overflow: Platform.OS === 'android' ? 'hidden': 'visible'// to make sure the ripple effect doesn't go beyond the rounded corners
   },
    button: {
       flex: 1,
    },
    buttonPressed: {
       opacity: 0.5
    },
   innerContainer: {
       flex: 1,
       borderRadius: 8,
       padding: 16,
       justifyContent: 'center',
       alignItems: 'center'
   },
    title: {
       fontWeight: 'bold',
        fontSize: 18
    }
});

export default CategoryGridTile;
