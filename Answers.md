# Flight Monitoring System

## Project Overview
This project aims to monitor real-time flight data from European airports, identify delays of more than 2 hours, and assist passengers in filing refund claims. The system collects and stores flight information in a MySQL database and provides APIs for data retrieval.

## Features
- Fetch real-time flight data using OpenSky API.
- Store flight details in a MySQL database.
- Identify flights delayed by more than 2 hours.
- Provide an API to retrieve stored flight data.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **APIs Used:** OpenSky API, AviationStack (optional for additional data)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/vasusharma-code/Flight-Monitoring
cd flight-monitoring
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up MySQL Database

#### a. Import Database Schema
Run the following command to import the provided SQL file:
```sh
mysql -u root -p < database/flight_monitoring.sql
```
*(Replace `root` with your MySQL username, and enter your password when prompted.)*

#### b. Update Database Configuration
Modify the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=flight_monitoring
```

### 4. Run the Server
Start the Node.js server:
```sh
node server.js
```
You should see:
```sh
✅ Server running on port 5000
```

### 5. API Endpoints

#### a. Fetch Real-time Flight Data
```sh
GET /api/flights
```
**Response:**
```json
{
  "flights": [
    {
      "icao24": "3c675a",
      "callsign": "DLH400",
      "origin_country": "Germany",
      "longitude": 8.551,
      "latitude": 50.033,
      "altitude": 11000,
      "velocity": 750
    }
  ]
}
```

#### b. Store Flight Data in Database
```sh
POST /api/store
```
**Request Body:**
```json
{
  "flights": [
    {
      "icao24": "3c675a",
      "callsign": "DLH400",
      "origin_country": "Germany",
      "longitude": 8.551,
      "latitude": 50.033,
      "altitude": 11000,
      "velocity": 750
    }
  ]
}
```

#### c. Get Delayed Flights (More than 2 Hours)
```sh
GET /api/delayed
```

### 6. Troubleshooting
- If MySQL connection fails, check that your credentials in `.env` are correct.
- Ensure the MySQL service is running (`sudo systemctl start mysql` on Linux).
- If dependencies are missing, run `npm install`.

## Contributing
Feel free to fork this repository and submit pull requests!

## License
This project is licensed under the MIT License.

