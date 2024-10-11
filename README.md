
# Todo List App

A minimalist to-do list app built with React Native. This app allows users to create, edit, delete, and filter tasks based on their completion status. Additionally, users can receive notifications for upcoming tasks. This README explains the project architecture and design decisions made to achieve a clean, efficient, and user-friendly to-do application.




## Features

- Add new tasks with specific dates and times.
- Edit and delete existing tasks.
- Mark tasks as completed.
- Filter tasks: All, Active, and Completed.
- Persistent storage using AsyncStorage.
- Push notifications to remind users of upcoming tasks.
- Simple and intuitive UI with a fixed floating add button.




## Architecture

- React Native

    The app is developed using React Native, which allows building mobile applications using React. The core logic is split across functional components and state management is handled using React's useState and useEffect hooks.

- Data Handling

    The to-do items are stored locally using AsyncStorage, which is suitable for apps with relatively simple data needs. AsyncStorage allows us to persist the user's to-do items across app restarts.

    - State Management:
        - State variables like todos, text, selectedDate, selectedTime, and filter are managed using React's useState.

         - The state of to-do items (todos) is maintained as an array of objects, with each object containing:
            - id: A unique identifier for the    task.
            - text: The description of the to-do.
              completed: A boolean indicating whether the task is completed.
            - date and time: Indicate the due    date and time for the task.


- UI/UX Design

    The user interface is designed to be minimalist, clean, and responsive. Key design elements include:

    - Floating Add Button: The "Add" button is always visible at the bottom of the screen, allowing users to quickly add tasks no matter how far they have scrolled in the list. The button is implemented using position: 'absolute' with styles ensuring it stays centered and fixed to the bottom of the screen.
    - Date & Time Pickers: Users can select a due date via an embedded calendar component and a time picker for task-specific scheduling.
    - Task Filtering: A simple filtering system allows users to view "All," "Active," or "Completed" tasks, making it easier to manage large to-do lists.


- Notifications

    The app integrates Expo Notifications to provide reminders about upcoming tasks:

    - Push Notifications: After adding a task, a push notification is scheduled to remind the user after a certain period. Notifications are handled using Expo's notification system, and notifications can be customized to fit the user's needs (e.g., alerting the user at specific times).
    - Permissions & Device Support: Notifications only work on physical devices, and the app checks for permissions before registering notifications.

- Component Structure

    - TodoListScreen.tsx: This is the main screen where users manage their to-dos. It includes
         - CalendarScreen component to select a date.
         - A floating Add button for creating new tasks.
         - A FlatList to display the to-do items.
         - Task filtering and management functionality (add, edit, delete, mark as complete).
    - TodoItem.tsx: A reusable component to render individual to-do items, handling their display, editing, and completion toggling.

- Styling

    The app uses StyleSheet from React Native for layout and styling:

    - The layout follows a responsive design philosophy, making sure the app is user-friendly across various device sizes.
    - Consistent use of margins, padding, and color schemes to create a cohesive look and feel.
## Key Design Decisions

    1. Floating Add Button

    The decision to use a floating add button was based on its ease of access for users. By fixing the button at the center bottom, users can add tasks at any time without needing to scroll back to the top of the list. The design follows modern mobile app UI patterns, enhancing usability.
    
    2. Persistent Data Storage

    We opted for AsyncStorage due to its simplicity and native integration with React Native. While this method is sufficient for small datasets like a to-do list, scalability would require migrating to a more robust database system (e.g., Realm, SQLite) if the app grows.

    3. Minimalistic Filtering

    The app provides three filters: All, Active, and Completed. This helps simplify task management without overwhelming the user with too many filter options, staying true to the minimalist design goal.

    4. Expo Notifications

    Using Expo Notifications allows the app to implement task reminders with minimal setup, but the decision to require users to be on a physical device was made due to Expo's current limitations on simulators/emulators for notifications.

    
## Optimizations

- Advanced Notification Scheduling: Allow users to set custom reminders for each task, with the option to receive notifications at multiple intervals.
- Cloud Syncing: Integrate with a backend (e.g., Firebase, MongoDB) to allow cross-device syncing of tasks.
- Theme Support: Provide light and dark mode themes for better user customization.



## Installation

Clone the repository:

```bash
  git clone https://github.com/your-repo/todo-list-app.git
  cd todo-list-app
```
Install the dependencies:
```bash
  npm install
```
Run the app:
```bash
  npm start
```
Use a physical device or emulator (for Android) with Expo Go to preview the app.
    