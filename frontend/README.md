📝 My Notes App
My Notes App is a simple and intuitive note-taking application built using the powerful MERN stack (MongoDB, Express.js, React, Node.js). The app allows you to easily create, view, and delete notes, making it an ideal tool for organizing your thoughts and tasks.

✨ Features
Add Note: Quickly jot down your ideas with an easy-to-use input field.
List Notes: View all your saved notes in one place.
Delete Note: Remove notes you no longer need with a simple click.

🚀 Getting Started

📋 Prerequisites
Before you begin, ensure you have the following installed on your system:
Node.js - Download Node.js
MongoDB - Download MongoDB
npm - Node package manager (comes bundled with Node.js)

🛠 Installation
Follow these steps to get the project up and running on your local machine:

Clone the Repository

git clone https://github.com/your-username/my-notes-app.git
cd my-notes-app
Install Backend Dependencies

Navigate to the backend directory and install the necessary dependencies:
cd backend
npm install
Configure MongoDB Connection

The MongoDB connection is configured in backend/config/db.js. By default, it connects to an Atlas MongoDB instance:
javascript
await mongoose.connect('mongodb://your-atlas-connection-string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
Start the Backend Server

Launch the backend server by running:

node server.js
The backend server will run on http://localhost:5000.
Install Frontend Dependencies

Navigate to the frontend directory and install the necessary dependencies:

cd ../frontend
npm install
Start the Frontend

Launch the React application by running:

npm start
The React application will be available at http://localhost:3000.
🎉 Usage
Add a Note: Use the input box to type your note and click "Save Note" to store it.
List Notes: Click the "List Notes" button to view all your saved notes.
Delete a Note: Click the delete button next to any note to remove it from your list.
