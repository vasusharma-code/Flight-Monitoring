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
 Server running on port 5000
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

Below are the MYSQLCL Scripts:-
```
-- 1️⃣ Create the database
CREATE DATABASE IF NOT EXISTS flight_monitoring;
USE flight_monitoring;

-- 2️⃣ Create Airports Table
CREATE TABLE IF NOT EXISTS airports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    iata_code VARCHAR(10) UNIQUE NOT NULL,
    icao_code VARCHAR(10) UNIQUE NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL
);

-- 3️⃣ Create Airlines Table
CREATE TABLE IF NOT EXISTS airlines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    iata_code VARCHAR(10) UNIQUE NOT NULL,
    icao_code VARCHAR(10) UNIQUE NOT NULL,
    country VARCHAR(50) NOT NULL
);

-- 4️⃣ Create Flights Table
CREATE TABLE IF NOT EXISTS flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(20) NOT NULL,
    airline_id INT,
    departure_airport_id INT,
    arrival_airport_id INT,
    scheduled_departure DATETIME NOT NULL,
    actual_departure DATETIME DEFAULT NULL,
    scheduled_arrival DATETIME NOT NULL,
    actual_arrival DATETIME DEFAULT NULL,
    status ENUM('on-time', 'delayed', 'canceled') NOT NULL DEFAULT 'on-time',
    delay_duration INT DEFAULT 0,
    icao24 VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (airline_id) REFERENCES airlines(id) ON DELETE SET NULL,
    FOREIGN KEY (departure_airport_id) REFERENCES airports(id) ON DELETE SET NULL,
    FOREIGN KEY (arrival_airport_id) REFERENCES airports(id) ON DELETE SET NULL
);

-- 5️⃣ Insert Sample Data: Airports
INSERT INTO airports (name, iata_code, icao_code, country, city, latitude, longitude) VALUES
('Berlin Brandenburg Airport', 'BER', 'EDDB', 'Germany', 'Berlin', 52.3667, 13.5033),
('Frankfurt Airport', 'FRA', 'EDDF', 'Germany', 'Frankfurt', 50.0333, 8.5706),
('Munich Airport', 'MUC', 'EDDM', 'Germany', 'Munich', 48.3538, 11.7861),
('Hamburg Airport', 'HAM', 'EDDH', 'Germany', 'Hamburg', 53.6304, 9.9882),
('Düsseldorf Airport', 'DUS', 'EDDL', 'Germany', 'Düsseldorf', 51.2895, 6.7668);

-- 6️⃣ Insert Sample Data: Airlines
INSERT INTO airlines (name, iata_code, icao_code, country) VALUES
('Lufthansa', 'LH', 'DLH', 'Germany'),
('Ryanair', 'FR', 'RYR', 'Ireland'),
('British Airways', 'BA', 'BAW', 'United Kingdom'),
('Air France', 'AF', 'AFR', 'France');

-- 7️⃣ Insert Sample Data: Flights
INSERT INTO flights (flight_number, airline_id, departure_airport_id, arrival_airport_id, scheduled_departure, actual_departure, scheduled_arrival, actual_arrival, status, delay_duration, icao24)
VALUES 
('LH400', 1, 2, 3, '2025-03-20 08:00:00', '2025-03-20 08:15:00', '2025-03-20 10:00:00', '2025-03-20 10:10:00', 'on-time', 10, '3c675a'),
('FR901', 2, 4, 5, '2025-03-20 09:30:00', '2025-03-20 09:45:00', '2025-03-20 11:30:00', '2025-03-20 14:00:00', 'delayed', 150, '4d3cba'),
('BA221', 3, 1, 2, '2025-03-20 07:45:00', '2025-03-20 07:50:00', '2025-03-20 09:45:00', '2025-03-20 09:50:00', 'on-time', 5, '7f85bd'),
('AF101', 4, 3, 5, '2025-03-20 10:00:00', NULL, '2025-03-20 12:00:00', NULL, 'canceled', 0, '9a7e3c');

-- 8️⃣ Query Examples:
-- Get all flights from a specific airport
SELECT * FROM flights WHERE departure_airport_id = (SELECT id FROM airports WHERE iata_code = 'FRA');

-- Find flights delayed by more than 2 hours
SELECT * FROM flights WHERE delay_duration > 120;

-- Get flight details using flight number
SELECT * FROM flights WHERE flight_number = 'LH400';
```

### 6. Troubleshooting
- If MySQL connection fails, check that your credentials in `.env` are correct.
- Ensure the MySQL service is running (`sudo systemctl start mysql` on Linux).
- If dependencies are missing, run `npm install`.

## Contributing
Feel free to fork this repository and submit pull requests!

## License
This project is licensed under the MIT License.

