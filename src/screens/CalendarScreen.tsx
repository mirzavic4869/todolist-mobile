// CalendarScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";

interface CalendarScreenProps {
	onSelectDate: (date: string) => void; // Prop for sending selected date
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ onSelectDate }) => {
	const [selectedView, setSelectedView] = useState<"Monthly" | "Daily">("Monthly");
	const [markedDates, setMarkedDates] = useState({});

	const handleDayPress = (day: { dateString: string }) => {
		// Mark the selected date
		setMarkedDates({
			[day.dateString]: { selected: true, selectedColor: "blue" },
		});

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
				onDayPress={handleDayPress} // Select a day
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
