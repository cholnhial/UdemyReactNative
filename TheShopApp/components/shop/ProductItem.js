import Rect from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import Colors from "../../constants/Colors";
import {Platform} from "react-native";
import {Touchable} from "react-native-web";
import Card from "../UI/Card";

const ProductItem = props => {
    let TouchableWithOpacity = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableWithOpacity = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
            <TouchableWithOpacity onPress={props.onSelect} useForeground>
                <View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.image}}/>
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
                </View>
            </TouchableWithOpacity>
            </View>
        </Card>

    )
}

const styles = StyleSheet.create({
 product: {
     height: 300,
     margin: 20
 },
    image: {
     width: '100%',
     height: '100%'

    },
    title: {
     fontFamily: 'open-sans-bold',
     fontSize: Platform.OS === 'ios' ? 18 : 16,
        marginVertical: 1
    },
    price: {
     fontFamily: 'open-sans',
     fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer: {
         width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    }

});

export default ProductItem;
