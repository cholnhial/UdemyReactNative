import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    return <FlatList data={products} renderItem={itemData => <ProductItem title={itemData.item.title}
                                                                          price={itemData.item.price}
                                                                          image={itemData.item.imageUrl}
                                                                          onAddToCart={() => {}}
                                                                          onViewDetails={() => {
                                                                              props.navigation.navigate('ProductDetail', {
                                                                                  productId: itemData.item.id,
                                                                                  productTitle: itemData.item.title
                                                                              })
                                                                          }}
                                                                            />}
    />
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
