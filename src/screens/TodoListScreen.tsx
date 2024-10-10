import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, FlatList, Text } from "react-native";
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
				time: selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Add time to the todo
			};
			const updatedTodos = [newTodo, ...todos];
			setTodos(updatedTodos);
			saveTodos(updatedTodos);
			setText("");
			setSelectedDate(null);
			setSelectedTime(null);
		} else {
			alert("Please select a date and time before adding a todo.");
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

	const updateTodo = (id: string, newText: string) => {
		const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo));
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
		<View style={styles.container}>
			{/* Render CalendarScreen and pass the selected date */}
			<CalendarScreen onSelectDate={(date) => setSelectedDate(date)} />

			<Button title="Select Time" onPress={() => setShowTimePicker(true)} />
			{showTimePicker && (
				<DateTimePicker
					value={selectedTime || new Date()}
					mode="time"
					display="default"
					onChange={(event, date) => {
						setShowTimePicker(false); // Hide time picker after selecting
						if (date) setSelectedTime(date); // Set the selected time
					}}
				/>
			)}

			<TextInput style={styles.input} placeholder="Add new todo" value={text} onChangeText={setText} />
			<Button title="Add Todo" onPress={addTodo} />

			{/* Ensure selectedDate and selectedTime are rendered in <Text> components */}
			{selectedDate && <Text>Selected Date: {selectedDate}</Text>}
			{selectedTime && <Text>Selected Time: {selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>}

			<View style={styles.filters}>
				<Button title="All" onPress={() => setFilter("ALL")} />
				<Button title="Active" onPress={() => setFilter("ACTIVE")} />
				<Button title="Completed" onPress={() => setFilter("COMPLETED")} />
			</View>

			<FlatList data={filterTodos()} keyExtractor={(item) => item.id} renderItem={({ item }) => <TodoItem item={item} toggleComplete={toggleComplete} deleteTodo={deleteTodo} updateTodo={updateTodo} />} />
		</View>
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
		marginBottom: 20,
	},
});

export default TodoListScreen;
