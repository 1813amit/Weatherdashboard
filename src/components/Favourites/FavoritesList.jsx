import { useEffect, useState } from "react";
import styles from "./FavoritesList.module.css";

function FavoritesList({ reload, setSelectedCity }) {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorite cities from JSON server
  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5000/favorites");
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Load favorites on component mount and when reload prop changes
  useEffect(() => {
    fetchFavorites();
  }, [reload]);

  // Function to remove a city from favorites
  const removeFavoriteCity = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/favorites/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((city) => city.id !== id)
        );
      } else {
        console.error("Failed to remove city from favorites");
      }
    } catch (error) {
      console.error("Error removing favorite city:", error);
    }
  };

  // Function to handle city click and set it as the selected city
  const handleCityClick = async (city) => {
    try {
      const response = await fetch(`http://localhost:5000/weather/${city.id}`);
      const data = await response.json();
      setSelectedCity(data); // Pass the weather data to the parent
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Preventing duplicate cities from being added to favorites
  const isCityAlreadyFavorited = (cityId) => {
    return favorites.some((city) => city.id === cityId);
  };

  // Function to add a city to favorites (only if it's not already there)
  const addCityToFavorites = async (city) => {
    if (!isCityAlreadyFavorited(city.id)) {
      try {
        const response = await fetch("http://localhost:5000/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(city),
        });
        if (response.ok) {
          const addedCity = await response.json();
          setFavorites((prevFavorites) => [...prevFavorites, addedCity]); // Update the local state
        } else {
          console.error("Failed to add city to favorites");
        }
      } catch (error) {
        console.error("Error adding city to favorites:", error);
      }
    } else {
      alert("This city is already in your favorites.");
    }
  };

  return (
    <section className={styles.favoritesSection}>
      <h3>Favorite Cities</h3>
      <ul className={styles.favoritesList}>
        {favorites.map((city) => (
          <li key={city.id} className={styles.favoriteItem}>
            <div className={styles.cityInfo}>
              {/* Make the city name clickable */}
              <button
                className={styles.cityName}
                onClick={() => handleCityClick(city)}
              >
                <h4>{city.name}, {city.country}</h4>
              </button>
              <p>Temperature: {city.temp}°C</p>
              <p>{city.description}</p>
            </div>
            <button
              onClick={() => removeFavoriteCity(city.id)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesList;
