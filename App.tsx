import { StyleSheet } from "react-native";
import TodoListScreen from "./src/screens/TodoListScreen";
import React from "react";

export default function App() {
	return (
		<>
			<TodoListScreen />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
