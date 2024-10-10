import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, FlatList, Text, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "../components/TodoItem";
import CalendarScreen from "./CalendarScreen";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Todo {
	id: string;
	text: string;
	completed: boolean;
	date: string;
	time: string;
}

const TodoListScreen: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [text, setText] = useState("");
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL");
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [isEditing, setIsEditing] = useState(false); // State to track if we're editing
	const [editTodoId, setEditTodoId] = useState<string | null>(null); // State to track which todo we're editing

	useEffect(() => {
		loadTodos();
	}, []);

	const loadTodos = async () => {
		try {
			const storedTodos = await AsyncStorage.getItem("todos");
			if (storedTodos) {
				setTodos(JSON.parse(storedTodos));
			}
		} catch (e) {
			console.error("Failed to load todos.", e);
		}
	};

	const saveTodos = async (todos: Todo[]) => {
		try {
			await AsyncStorage.setItem("todos", JSON.stringify(todos));
		} catch (e) {
			console.error("Failed to save todos.", e);
		}
	};

	const addTodo = () => {
		if (text.trim() && selectedDate && selectedTime) {
			const newTodo: Todo = {
				id: Date.now().toString(),
				text,
				completed: false,
				date: selectedDate,
				time: selectedTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
			};
			const updatedTodos = [newTodo, ...todos];
			setTodos(updatedTodos);
			saveTodos(updatedTodos);

			// Reset input fields after adding todo
			setText("");
			setSelectedDate(null);
			setSelectedTime(null);
		} else {
			alert("Please select a date and time before adding a todo.");
		}
	};

	const editTodo = (id: string) => {
		const todoToEdit = todos.find((todo) => todo.id === id);
		if (todoToEdit) {
			setText(todoToEdit.text);
			setSelectedDate(todoToEdit.date);
			setSelectedTime(new Date(`${todoToEdit.date} ${todoToEdit.time}`)); // Set time using existing todo's time
			setEditTodoId(todoToEdit.id);
			setIsEditing(true); // Set to editing mode
		}
	};

	const updateTodo = () => {
		if (editTodoId && text.trim() && selectedDate && selectedTime) {
			const updatedTodos = todos.map((todo) =>
				todo.id === editTodoId
					? {
							...todo,
							text,
							date: selectedDate,
							time: selectedTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
					  }
					: todo
			);
			setTodos(updatedTodos);
			saveTodos(updatedTodos);

			// Reset input fields after editing todo
			setText("");
			setSelectedDate(null);
			setSelectedTime(null);
			setEditTodoId(null);
			setIsEditing(false);
		} else {
			alert("Please select a date and time before updating the todo.");
		}
	};

	const deleteTodo = (id: string) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
		saveTodos(updatedTodos);
	};

	const toggleComplete = (id: string) => {
		const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
		setTodos(updatedTodos);
		saveTodos(updatedTodos);
	};

	const filterTodos = (): Todo[] => {
		switch (filter) {
			case "ACTIVE":
				return todos.filter((todo) => !todo.completed);
			case "COMPLETED":
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<CalendarScreen onSelectDate={(date) => setSelectedDate(date)} />

				<View style={{ marginVertical: 10 }}>
					<Button color={"#0d6efd"} title="Select Time" onPress={() => setShowTimePicker(true)} />
				</View>

				{showTimePicker && (
					<DateTimePicker
						value={selectedTime || new Date()}
						mode="time"
						display="default"
						onChange={(event, date) => {
							setShowTimePicker(false);
							if (date) setSelectedTime(date);
						}}
					/>
				)}

				<TextInput style={styles.input} placeholder={isEditing ? "Edit Todo" : "Add Todo"} value={text} onChangeText={setText} />

				<View style={{ marginVertical: 10 }}>
					<Button color={"#0d6efd"} title={isEditing ? "Update Todo" : "Add Todo"} onPress={isEditing ? updateTodo : addTodo} />
				</View>

				<View style={styles.filters}>
					<Button color={"#0d6efd"} title="All" onPress={() => setFilter("ALL")} />
					<Button color={"#0d6efd"} title="Active" onPress={() => setFilter("ACTIVE")} />
					<Button color={"#0d6efd"} title="Completed" onPress={() => setFilter("COMPLETED")} />
				</View>

				<FlatList data={filterTodos()} keyExtractor={(item) => item.id} renderItem={({ item }) => <TodoItem item={item} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		borderColor: "#ddd",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
	filters: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
});

export default TodoListScreen;
