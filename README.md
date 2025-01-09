🍕 Pizza Shop Full-Stack Application

Welcome to the Pizza Shop Full-Stack Application! This project includes a fully functional pizza shop website with frontend, backend, and admin panels for seamless operations.

🚀 Features

Frontend: User-friendly interface for browsing pizzas, placing orders, and tracking them.

Backend: Handles authentication, database operations, payment processing, and more.

Admin Panel: Manage inventory, orders, and user data efficiently.

Integrated Payment Gateway: Razorpay integration for secure transactions.

🛠️ Installation and Setup

Prerequisites

Node.js (version 16 or above)

npm or yarn package manager

MongoDB (local or cloud-based)

Razorpay API keys for payment processing

Dependencies

Frontend

"dependencies": {
    "@shadcn/ui": "^0.0.4",
    "axios": "^1.7.9",
    "lucide-react": "^0.469.0",
    "razorpay": "^2.9.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "react-toastify": "^11.0.2"
}

Backend

"type": "module",
"dependencies": {
    "bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.2",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.16",
    "nodemon": "^3.1.9",
    "path": "^0.12.7",
    "razorpay": "^2.9.5"
},
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
}

Admin

"dependencies": {
    "@cloudinary/react": "^1.13.1",
    "@cloudinary/url-gen": "^1.21.0",
    "axios": "^1.7.9",
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "react-toastify": "^11.0.2"
}

⚙️ Running the Project

Backend

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Run the server:

npm run server

The server will run on port 5000.

Frontend

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Run the development server:

npm run dev

The frontend will run on your local development server (default: http://localhost:3000).

Admin

Navigate to the admin folder:

cd admin

Install dependencies:

npm install

Run the development server:

npm run dev

The admin panel will run on your local development server.

🌐 Environment Variables

Backend

Create a .env file in the backend folder and add the following:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password

pls make sure that you give your details in the .env file as of right now they are sample file only in all of the three folders

🧪 Testing

Test the API endpoints using tools like Postman or cURL.

Ensure all frontend and backend routes are functional by running end-to-end tests.

🔒 License

This project is licensed under the MIT License. See the LICENSE file for details.

💻 Contributing

Contributions are welcome! To contribute:

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit (git commit -m "Add feature").

Push to the branch (git push origin feature-name).

Open a pull request.

📲 Support

For any issues or questions, feel free to open an issue or contact the developer at 4747uwu@gmail.com

Enjoy coding and pizza! 🍕

