import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

interface TodoItemProps {
	item: {
		id: string;
		text: string;
		completed: boolean;
	};
	toggleComplete: (id: string) => void;
	deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, toggleComplete, deleteTodo }) => {
	return (
		<View style={styles.todoItem}>
			<TouchableOpacity onPress={() => toggleComplete(item.id)}>
				<Text style={item.completed ? styles.completed : styles.notCompleted}>{item.text}</Text>
			</TouchableOpacity>
			<Button title="Delete" onPress={() => deleteTodo(item.id)} />
		</View>
	);
};

const styles = StyleSheet.create({
	todoItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		marginVertical: 5,
		backgroundColor: "#f9f9f9",
	},
	completed: {
		textDecorationLine: "line-through",
		color: "gray",
	},
	notCompleted: {
		textDecorationLine: "none",
	},
});

export default TodoItem;
