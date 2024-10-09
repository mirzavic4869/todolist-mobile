import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import TodoItem from "../components/TodoItem";

interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

const FILTERS = {
	ALL: "ALL",
	ACTIVE: "ACTIVE",
	COMPLETED: "COMPLETED",
} as const;

type Filter = (typeof FILTERS)[keyof typeof FILTERS];

const TodoListScreen: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [text, setText] = useState("");
	const [filter, setFilter] = useState<Filter>(FILTERS.ALL);

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
		if (text.trim()) {
			const newTodo: Todo = { id: Date.now().toString(), text, completed: false };
			const updatedTodos = [newTodo, ...todos];
			setTodos(updatedTodos);
			saveTodos(updatedTodos);
			scheduleNotification(newTodo.text);
			setText("");
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
			case FILTERS.ACTIVE:
				return todos.filter((todo) => !todo.completed);
			case FILTERS.COMPLETED:
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	};

	const scheduleNotification = async (todoText: string) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Reminder!",
				body: `You have a pending task: ${todoText}`,
			},
			trigger: { seconds: 60 },
		});
	};

	return (
		<View style={styles.container}>
			<TextInput style={styles.input} placeholder="Add new todo" value={text} onChangeText={setText} />
			<Button title="Add Todo" onPress={addTodo} />

			<View style={styles.filters}>
				<Button title="All" onPress={() => setFilter(FILTERS.ALL)} />
				<Button title="Active" onPress={() => setFilter(FILTERS.ACTIVE)} />
				<Button title="Completed" onPress={() => setFilter(FILTERS.COMPLETED)} />
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
