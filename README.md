Weather Dashboard
Overview
The Weather Dashboard is a dynamic application providing real-time weather information. This application is designed with a user-friendly interface and several features that help users stay informed about the latest weather conditions and forecasts.

Built With
React.js
CSS Modules
RESTful API
Context API
Vite
Custom Design (Designed by me)
Features
Default Location: Loads weather information for Cairo, EG by default.
Geolocation: Real-time weather data based on the user's current location (available when the "Current Location" button is clicked).
City Search: Search for any city and view its weather conditions immediately.
Today’s Highlights: Provides key details such as Sunrise & Sunset times, Humidity, Pressure, Visibility, and "Feels Like" temperature.
5-Day Forecast: Offers a 5-day weather forecast for better planning.
Light and Dark Modes: Toggle between light and dark themes (sun/moon icon), with theme preference stored in local storage for user convenience.
Lighthouse Report Metrics
Desktop:

Performance: Outstanding at 99%
Accessibility: High score of 95%
Best Practices: Score of 93%
SEO: Perfect score of 100%
Mobile:

Performance: Solid at ~90%
Accessibility: High score of 94%
Best Practices: Score of 93%
SEO: Impressive score of 97%
The application is optimized for performance, accessibility, best practices, and SEO, ensuring a seamless user experience across devices.

API Integration
This dashboard uses the OpenWeatherMap API to fetch live weather data.

Example API Call
javascript
Copy code
const apiKey = "YOUR_API_KEY";
const city = "YourCity";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then((response) => response.json())
  .then((data) => displayWeather(data))
  .catch((error) => console.error("Error:", error));
Make sure to replace "YOUR_API_KEY" with your actual OpenWeatherMap API key.

Getting Started
Prerequisites
Node.js and npm are required to run the application.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/weather-dashboard.git
Navigate to the project folder:

bash
Copy code
cd weather-dashboard
Install dependencies:

bash
Copy code
npm install
Set up JSON Server (optional) if you want to run mock data with JSON server:

bash
Copy code
npm install -g json-server
Running the Application
Start the React Application:

bash
Copy code
npm run dev
Start JSON Server (if required):

bash
Copy code
npm run json-server
Folder Structure
src/: Contains all the application source code.
components/: Individual components of the dashboard.
assets/: Images and other static assets.
hooks/: Custom hooks like UseToggleTheme.
context/: Context API files.
styles/: CSS Modules for styling components.
Project Screenshots

Replace this with actual screenshots of your application

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
OpenWeatherMap for providing the weather data.
React Icons for the icon library.
