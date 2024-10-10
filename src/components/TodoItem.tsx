// TodoItem.tsx
import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

interface TodoItemProps {
	item: {
		id: string;
		text: string;
		completed: boolean;
		date: string;
		time: string;
	};
	toggleComplete: (id: string) => void;
	deleteTodo: (id: string) => void;
	updateTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, toggleComplete, deleteTodo }) => {
	return (
		<View style={styles.todoItem}>
			<View style={styles.textContainer}>
				<TouchableOpacity onPress={() => toggleComplete(item.id)}>
					<Text style={item.completed ? styles.completed : styles.notCompleted}>{item.text}</Text>
				</TouchableOpacity>
				<Text style={styles.dateText}>
					{new Date(item.date).toLocaleDateString("en-GB", {
						day: "numeric",
						month: "short",
					})}{" "}
					• {item.time}
				</Text>
			</View>
			<View style={styles.buttons}>
				<Button title="Delete" onPress={() => deleteTodo(item.id)} />
			</View>
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
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ddd",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 1,
	},
	textContainer: {
		flex: 1,
	},
	completed: {
		textDecorationLine: "line-through",
		color: "gray",
		fontSize: 16,
		fontWeight: "bold",
	},
	notCompleted: {
		textDecorationLine: "none",
		fontSize: 16,
		fontWeight: "bold",
	},
	dateText: {
		fontSize: 14,
		color: "gray",
		marginTop: 5,
	},
	buttons: {
		justifyContent: "center",
	},
});

export default TodoItem;
