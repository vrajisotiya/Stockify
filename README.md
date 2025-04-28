# Stockify - Stock Trading Platform


Stockify is a full-featured stock trading platform built with the MERN stack (MongoDB, Express, React, Node.js). It provides users with a seamless experience for trading stocks, managing portfolios, and tracking investments.

**Live Demo:** [Stockify Live](https://stockify-zmkd.onrender.com)

## Features

### User Authentication
- Secure JWT token-based authentication
- OTP verification via Nodemailer (6-digit code)
- Password reset functionality
- Bcrypt password hashing
- Input validation with Validator and Joi

### Trading Features
- Buy/sell stocks from available stock list
- Real-time portfolio tracking
- Investment value calculation
- Profit/loss tracking
- Order history

### Portfolio Management
- Fund balance display
- Portfolio value tracking
- Detailed holding charts (Chart.js)
- TradingView widgets for advanced charting

### Account Management
- Add/withdraw funds

### Automated Processes
- Daily stock price updates via API (cron job)
- Automatic order cleanup after 30 days

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React (Vite) | Core framework |
| Redux Toolkit | State management |
|Tailwind CSS |	Styling and theming |
| Material UI | UI components |
| Chart.js | Data visualization |
| TradingView | Advanced charts |
| React-Toastify | Notifications |


### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Nodemailer | Email services |

### APIs
- Indianapi (For fetching stock prices)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend

- `TOKEN_KEY` – Secret key used for JWT token signing
- `IndianAPI_API_KEY` – API key for fetching stock prices from the Indian stock API
- `DB_URL` – MongoDB database connection URL
- `CLIENT_URL` – URL of the frontend application
- `EMAIL_USER` – Email address for sending OTPs and password reset emails
- `EMAIL_PASS` – Password for the email service
- `PORT` – Port on which the backend server will run

### Frontend

- `VITE_API_URL` – URL for the backend API

## Installation

```bash
git clone https://github.com/vrajisotiya/Stockify.git
cd stockify
```

```bash
cd backend
npm install
node app.js
```

```bash
cd frontend
npm install
npm run dev
```

## Authors

- [@vrajisotiya](https://github.com/vrajisotiya)
