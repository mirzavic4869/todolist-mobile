import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from "react-native";

interface TodoItemProps {
	item: {
		id: string;
		text: string;
		completed: boolean;
	};
	toggleComplete: (id: string) => void;
	deleteTodo: (id: string) => void;
	updateTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, toggleComplete, deleteTodo, updateTodo }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newText, setNewText] = useState(item.text);

	const handleSaveEdit = () => {
		updateTodo(item.id, newText);
		setIsEditing(false);
	};

	return (
		<View style={styles.todoItem}>
			{isEditing ? (
				<TextInput style={styles.input} value={newText} onChangeText={setNewText} />
			) : (
				<TouchableOpacity onPress={() => toggleComplete(item.id)}>
					<Text style={item.completed ? styles.completed : styles.notCompleted}>{item.text}</Text>
				</TouchableOpacity>
			)}

			<View style={styles.buttons}>
				{isEditing ? (
					<Button title="Save" onPress={handleSaveEdit} />
				) : (
					<>
						<Button title="Edit" onPress={() => setIsEditing(true)} />
						<Button title="Delete" onPress={() => deleteTodo(item.id)} />
					</>
				)}
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
	},
	completed: {
		textDecorationLine: "line-through",
		color: "gray",
	},
	notCompleted: {
		textDecorationLine: "none",
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		padding: 5,
		width: 200,
	},
});

export default TodoItem;
