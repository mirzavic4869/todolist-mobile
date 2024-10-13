import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

interface TodoItem {
	id: string;
	text: string;
	completed: boolean;
	date: string;
	time: string;
}

interface CalendarScreenProps {
	todos: TodoItem[];
	onSelectDate: (date: string) => void;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ onSelectDate, todos }) => {
	const [selectedView, setSelectedView] = useState<"Monthly" | "Daily">("Monthly");
	const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

	useEffect(() => {
		// Mark the dates with todo items
		const marked = todos.reduce((acc: { [key: string]: any }, item) => {
			acc[item.date] = {
				marked: true,
				dotColor: "red",
			};
			return acc;
		}, {});

		setMarkedDates(marked);
	}, [todos]);

	const handleDayPress = (day: { dateString: string }) => {
		// Mark the selected date and retain other markings
		setMarkedDates((prev) => ({
			...prev,
			[day.dateString]: { selected: true, selectedColor: "blue" },
		}));

		// Call the parent function with the selected date
		onSelectDate(day.dateString);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={[styles.toggleButton, selectedView === "Monthly" && styles.activeButton]} onPress={() => setSelectedView("Monthly")}>
					<Text style={styles.toggleButtonText}>Monthly</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.toggleButton, selectedView === "Daily" && styles.activeButton]} onPress={() => setSelectedView("Daily")}>
					<Text style={styles.toggleButtonText}>Daily</Text>
				</TouchableOpacity>
			</View>

			<Calendar
				current={"2024-02-01"}
				markedDates={markedDates}
				onDayPress={handleDayPress}
				theme={{
					arrowColor: "black",
					todayTextColor: "#00adf5",
				}}
				style={styles.calendar}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f4f5f9",
		padding: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
	},
	toggleButton: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		backgroundColor: "#f4f5f9",
		borderRadius: 20,
		marginHorizontal: 5,
	},
	activeButton: {
		backgroundColor: "#007bff",
	},
	toggleButtonText: {
		color: "black",
	},
	calendar: {
		borderRadius: 10,
		elevation: 1,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		backgroundColor: "#fff",
		marginBottom: 20,
	},
});

export default CalendarScreen;
