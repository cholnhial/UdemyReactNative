import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch }  from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Card from "../../components/UI/Card";


const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) =>    a.productId > b.productId ? 1 : -1);
    });
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text></Text>
                <Button disabled={cartItems.length === 0}
                        color={Colors.accent}
                        title="Order Now"
                        onPress={() => {
                            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
                        }}/>
            </Card>
            <View>
                <FlatList data={cartItems}
                          keyExtractor={item => item.productId}
                          renderItem={itemData => <CartItem title={itemData.item.productTitle}
                                                            quantity={itemData.item.quantity}
                                                            amount={itemData.item.sum}
                                                            deletable
                                                            onRemove={() => {
                                                                dispatch(cartActions.removeFromCart(itemData.item.productId))
                                                            }} />} />
            </View>
        </View>
    )
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};


const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;
