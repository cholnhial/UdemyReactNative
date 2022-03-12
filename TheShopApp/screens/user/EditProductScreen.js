import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert, KeyboardAvoidingView} from "react-native";
import HeaderButton from "../../components/UI/HeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";
import * as productsAction from '../../store/actions/products';
import Input from "../../components/UI/Input";

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true;
        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key];
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: formIsValid
        }

    }

    return state;
}
const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''

        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: false
    })
    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{text: 'Okay'}])
            return;
        }

        if (editedProduct) {
            dispatch(productsAction.updateProduct(prodId, formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl));
        } else {
            dispatch(productsAction.createProduct(formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl, +formState.inputValues.price));
        }

        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    const inputChangeHandler = useCallback((id, text, isValid) => {
        formDispatch({
            type: FORM_UPDATE,
            value: text,
            isValid: isValid,
            input: id
        })
    }, [formDispatch]);

    return (
        <KeyboardAvoidingView style={{flex: 1}} behaviour="padding" keyboardVerticalOffset={100}>
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    label='Title'
                    errorText='Please enter a valid title'
                    onInputChange={inputChangeHandler}
                    KeyboardType='default'
                    required
                    autoCapitalize='sentences'
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    returnKeyType='next'/>
                <Input
                    id='imageUrl'
                    label='Image URL'
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    required
                    onInputChange={inputChangeHandler}
                    errorText='Please enter a valid url'
                    KeyboardType='default'
                    returnKeyType='next'/>
                {editedProduct ? null :
                    <Input
                        id='price'
                        label='Price'
                        onInputChange={inputChangeHandler}
                        errorText='Please enter a valid price'
                        keyboardType='decimal-pad'
                        required
                        min={0.1}
                        returnKeyType='next'/>
                }
                <Input
                    label='Description'
                    errorText='Please enter a valid description'
                    KeyboardType='default'
                    autoCapitalize='sentences'
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={!!editedProduct}
                    onInputChange={inputChangeHandler}
                    id='description'
                    multiline
                    required
                    minLength={5}
                    numberOfLines={3}/>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                  onPress={submitFn}/>
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    form: {
        margin: 20
    }
});

export default EditProductScreen;
