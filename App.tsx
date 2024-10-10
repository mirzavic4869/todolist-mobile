import { StyleSheet } from "react-native";
import TodoListScreen from "./src/screens/TodoListScreen";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<TodoListScreen />
		</GestureHandlerRootView>
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
