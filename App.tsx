import { StyleSheet } from "react-native";
import TodoListScreen from "./src/screens/TodoListScreen";

export default function App() {
	return <TodoListScreen />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
