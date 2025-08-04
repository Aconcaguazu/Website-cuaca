const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherDisplay = document.getElementById("weather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const iconDisplay = document.getElementById("icon");

// Pastikan Anda menggunakan API Key yang valid di sini
const API_KEY = "b062edaccf414219a4ea407f22700a93";

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Kota tidak ditemukan! Silakan coba lagi.");
        }

        const data = await response.json();
        locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
        temperatureDisplay.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionDisplay.textContent = `${data.weather[0].description}`;
        iconDisplay.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherDisplay.classList.remove("hidden");
    } catch (error) {
        alert(error.message);
        weatherDisplay.classList.add("hidden");
    }
}

getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Harap masukkan nama kota!");
    }
});
