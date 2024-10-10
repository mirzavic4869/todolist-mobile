// TodoItem.tsx
import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface TodoItemProps {
	item: {
		id: string;
		text: string;
		completed: boolean;
		date: string;
		time: string;
	};
	toggleComplete: (id: string) => void;
	editTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
	updateTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, toggleComplete, deleteTodo, editTodo }) => {
	const renderRightActions = (_progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0],
			extrapolate: "clamp",
		});

		return (
			<TouchableOpacity onPress={() => deleteTodo(item.id)}>
				<Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
					<Text style={styles.deleteButtonText}>Delete</Text>
				</Animated.View>
			</TouchableOpacity>
		);
	};

	return (
		<Swipeable renderRightActions={renderRightActions}>
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
					<MaterialIcons name="mode-edit" size={24} color={"#198754"} onPress={() => editTodo(item.id)} />
				</View>
			</View>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	todoItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		marginVertical: 5,
		backgroundColor: "#fefefe",
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
		justifyContent: "space-between",
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
	},
	deleteButton: {
		backgroundColor: "#dc3545",
		justifyContent: "center",
		alignItems: "center",
		width: 100,
		marginVertical: 5,
		marginRight: 10,
		borderRadius: 10,
	},
	deleteButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default TodoItem;
