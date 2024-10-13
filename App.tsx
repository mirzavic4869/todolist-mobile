import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoListScreen from "./src/screens/TodoListScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ color, size }) => {
							let iconName;
							if (route.name === "TodoList") {
								iconName = "list";
							} else if (route.name === "Calendar") {
								iconName = "calendar-today";
							}
							return <MaterialIcons name={iconName} size={size} color={color} />;
						},
						tabBarActiveTintColor: "#0d6efd",
						tabBarInactiveTintColor: "gray",
					})}
				>
					<Tab.Screen name="TodoList" component={TodoListScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

export default App;
