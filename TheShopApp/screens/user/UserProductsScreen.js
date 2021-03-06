import React from 'react';
import {Alert, Button, FlatList, Platform} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productsAction from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsAction.deleteProduct(id)) }}
        ])
    };

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {productId: id})
    };

    return  <FlatList data={userProducts}
                      renderItem={itemData => <ProductItem
                          image={itemData.item.imageUrl}
                          title={itemData.item.title}
                          price={itemData.item.price}
                          onSelect={() => {
                              editProductHandler(itemData.item.id)
                          }}
                      >
                          <Button color={Colors.primary} title="Edit" onPress={() => {
                            editProductHandler(itemData.item.id)
                          }} />
                          <Button color={Colors.primary}  title="Delete" onPress={() => deleteHandler(itemData.item.id)}/>
                      </ProductItem>}/>

};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () =>  <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => {
                navData.navigation.navigate('EditProduct')
            }}/>
        </HeaderButtons>
    }
}

export default UserProductsScreen;
