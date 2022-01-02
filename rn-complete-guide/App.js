import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const addGoalHandler = (enteredGoal) => {
        setCourseGoals(currentGoals => [...currentGoals, {id: Math.random().toString(), value: enteredGoal}]);
        setIsAddMode(false);

    }

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== goalId)
        })
    }

    const cancelGoalAdditionHandler = () => {
        setIsAddMode(false);
    }
    return (
        <View style={styles.screen}>
            <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
            <GoalInput onCancel={cancelGoalAdditionHandler} visible={isAddMode} onAddGoal={addGoalHandler} />
            <FlatList data={courseGoals}
                      keyExtractor={(item, index) => item.id}
                      renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />
                } />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50
    }
})
