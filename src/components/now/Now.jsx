import { useState, useEffect } from "react";
import styles from "./Now.module.css";
import { useAppContext } from "../../context/AppContext";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import FavoritesList from "../Favourites/FavoritesList";

function Now() {
  const { currentWeatherData } = useAppContext();
  const [isCelsius, setIsCelsius] = useState(true);
  const [favoriteStatus, setFavoriteStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites when the component mounts
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:5000/favorites");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [loading]); // Re-fetch favorites when loading state changes (after adding/removing)

  // Toggle temperature unit between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  // Function to get temperature based on selected unit
  const getTemperature = () => {
    const tempCelsius = currentWeatherData?.main?.temp;
    if (tempCelsius == null) return "";
    return isCelsius ? Math.round(tempCelsius) : Math.round((tempCelsius * 9) / 5 + 32);
  };

  // Function to add current city to favorites
  const addFavoriteCity = async () => {
    if (!currentWeatherData) return;

    // Check if the city already exists in favorites
    const isCityInFavorites = favorites.some(
      (favorite) => favorite.name === currentWeatherData.name
    );

    if (isCityInFavorites) {
      setFavoriteStatus("City is already in favorites.");
      return;
    }

    const favoriteCity = {
      name: currentWeatherData.name,
      country: currentWeatherData.sys.country,
      temp: getTemperature(),
      description: currentWeatherData.weather[0].description,
    };

    setLoading(true); // Start loader

    try {
      const response = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteCity),
      });

      if (response.ok) {
        setFavoriteStatus("City added to favorites!");
        setLoading(false); // Stop loader after adding
      } else {
        setFavoriteStatus("Failed to add favorite.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error adding favorite city:", error);
      setFavoriteStatus("Error adding favorite.");
      setLoading(false);
    }
  };

  return (
    <section className={styles.currentWeather} aria-label="current weather">
      <div className={styles.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 className={styles.title}>Now</h2>
          <button onClick={toggleTemperatureUnit} className={styles.toggleButton}>
            Switch to °{isCelsius ? "F" : "C"}
          </button>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.temperature}>{getTemperature()}°{isCelsius ? "C" : "F"}</span>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className={styles.weatherIcon}
            loading="lazy"
          />
        </div>
        <p className={styles.wState}>{currentWeatherData?.weather[0].description}</p>
        <ul className={styles.metaList}>
          <li className={styles.metaItem}>
            <MdDateRange />
            <p className={styles.metaText}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </li>
          <li className={styles.metaItem}>
            <FaLocationDot />
            <p className={styles.metaText}>{`${currentWeatherData?.name || ""}, ${currentWeatherData?.sys.country || ""}`}</p>
          </li>
        </ul>

        <button onClick={addFavoriteCity} className={styles.favoriteButton}>
          {loading ? "Adding..." : "Add to Favorite"}
        </button>
        
        {/* Loader and Status Message */}
        {loading && <div className={styles.loader}></div>}
        {favoriteStatus && !loading && <p className={styles.statusMessage}>{favoriteStatus}</p>}
      </div>

      {/* Display the FavoritesList component */}
      <FavoritesList reload={loading} />
    </section>
  );
}

export default Now;
