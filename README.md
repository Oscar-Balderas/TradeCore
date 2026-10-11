# TradeCore

**International Trade Operations Management & Commodity Market Analytics**

TradeCore is a full-stack web application designed to manage international import and export operations while providing access to commodity market data.

The platform allows users to register, view, update, and delete trade operations, track their status, search and filter records, and monitor international commodity prices and historical market trends.

The project combines business-oriented functionality with modern web development technologies, focusing on international trade management and market analysis.

## Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- Mongoose

### External API

- Sugra API — Commodity market prices and historical data

### Development Tools

- Git & GitHub
- Postman
- Visual Studio Code

## Features

### Trade Operations Management
- Create and manage international import and export operations.
- View, edit, and delete existing trade records.
- Store operation details, including product, quantity, origin, destination, supplier, client, Incoterm, and transportation method.
- Track operations through different statuses: Negotiation, Confirmed, In Transit, and Delivered.
- Search and filter operations by multiple criteria.
- View operation details in an interactive modal.

### Dashboard
- Display key statistics about registered trade operations.
- Track operations by type and status.
- Automatically update statistics when operations are created, edited, or deleted.

### Commodity Market Analytics
- View reference prices for international commodities, including gold, silver, crude oil, and natural gas.
- Retrieve market data through an external commodity API.
- Visualize historical commodity prices using interactive charts.
- Select different commodities to explore their price history.
- Use cached market data to reduce unnecessary API requests.

### User Interface
- Responsive interface for desktop and mobile devices.
- Dark-themed design with gold accents.
- Interactive forms, filters, and modals.
- Input validation and error handling.

## Screenshots

### Market Overview
<img width="1917" height="1078" alt="TradeCore Market Overview" src="https://github.com/user-attachments/assets/83f02885-1dfe-41c7-a4ef-b7916a3164b8" />

### Market Price History
<img width="1917" height="1077" alt="TradeCore Historical Commodity Prices" src="https://github.com/user-attachments/assets/88153f06-a64c-42c4-b971-1b0dbd25cc00" />

### Register New Operation
<img width="1917" height="1078" alt="TradeCore Operation Registration Form" src="https://github.com/user-attachments/assets/23e26a32-da01-415d-af93-a1327c816a8a" />

### Trade Operations Dashboard
<img width="1917" height="1078" alt="TradeCore Trade Operations Dashboard" src="https://github.com/user-attachments/assets/3186b28c-5dc1-4b04-b05a-bfae5737b40a" />

## Project Structure

TradeCore follows a client-server architecture, separating the React frontend from the Node.js and Express backend.

### Frontend
The `client` directory contains the React application, including reusable components for trade operations, dashboard statistics, commodity market prices, and historical charts.

### Backend
The `server` directory contains the Express REST API, organized into routes, controllers, models, and middleware.

### Database
MongoDB is used to store trade operations, while Mongoose provides schema definitions, data validation, and database interaction.

### Market Data Integration
The backend communicates with the Sugra API to retrieve commodity reference prices and historical market information. A caching mechanism helps reduce repeated external API requests.

## Installation and Setup

### Prerequisites

Before running TradeCore locally, make sure you have the following installed:

- Node.js and npm
- MongoDB
- Git

### Clone the Repository

```bash
git clone https://github.com/Oscar-Balderas/TradeCore.git
cd TradeCore
```

### Backend Setup

Navigate to the server directory and install the dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and add your Sugra API key:

```env
SUGRA_API_KEY=your_sugra_api_key_here
```

MongoDB must be running locally at `mongodb://localhost:27017/tradecore`. The application currently uses this connection string directly in its backend configuration.

Never commit your real API keys or `.env` files to GitHub.

Start the backend development server:

```bash
npm run dev
```

The backend runs locally on port `3000`.

### Frontend Setup

Open a second terminal, navigate to the client directory, and install the dependencies:

```bash
cd client
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the application in your browser:

`http://localhost:5173`

**Note:** Both frontend and backend servers must be running for the application to function correctly. Commodity market features require valid API credentials and access to the external data provider.

## Future Improvements

- User registration and authentication.
- Secure access using JSON Web Tokens (JWT).
- Role-based authorization and protected API endpoints.
- Enhanced API security, request validation, and rate limiting.
- User-specific trade operations and data access controls.
- Improved error handling and application monitoring.
- Automated backend and frontend testing.
- Production deployment with secure environment configuration.
- Performance optimization and scalability improvements.

## Project Status

TradeCore is a functional full-stack portfolio project developed for learning and demonstrating modern web development practices.

Core trade management and commodity market analytics features have been implemented and tested locally.

Additional security, authentication, and production-readiness improvements are planned for future development.
