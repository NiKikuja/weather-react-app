import { useState } from 'react';
import './App.css';
import clear from './assets/clear.jpg';
import clouds from './assets/cloudy.jpg';
import rain from './assets/rainy.jpg';
import snow from './assets/snowy.webp';
import thunderstorm from './assets/thunderstormasthma.jpg';
import fog from './assets/foggy.jpg';
import tornado from './assets/tornado.jpg';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiTornado} from 'react-icons/wi';
import { CiSearch } from "react-icons/ci";

const api = {
  key: 'be25ff6b50b50167d664e63e16ecd48a',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  
  const weatherImageMap = {
    clear: clear,
    clouds: clouds,
    rain: rain,
    snow: snow,
    thunderstorm: thunderstorm,
    mist: fog, 
    fog: fog,
    tornado: tornado
  };

  const fetchWeatherData = () => {
    if (search !== "") {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === 200) {
            setWeather(result);
          } else {
            alert("City not found");
          }
        })
        .catch((err) => {
          alert("Error fetching weather data");
          console.error(err);
        });
    } else {
      alert("Please enter a city name");
    }
  };

  const renderWeatherIcon = () => {
    const mainWeather = weather.weather[0].main.toLowerCase();
    
    switch (mainWeather) {
      case 'clear':
        return <WiDaySunny size={64} color="gold" />;
      case 'clouds':  
        return <WiCloudy size={64} color="grey" />;
      case 'rain':
        return <WiRain size={64} color="blue" />;
      case 'snow':
        return <WiSnow size={64} color="lightblue" />;
      case 'thunderstorm':
        return <WiThunderstorm size={64} color="darkgray" />;
      case 'mist':
      case 'fog':
        return <WiFog size={64} color="lightgray" />;
      case 'tornado':
        return <WiTornado size={64} color="darkgray" />;
      default:
        return null;
    }
  };

  const backgroundImage = weather.weather ? weatherImageMap[weather.weather[0].main.toLowerCase()] : null;

    return (
      <div className="App" style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      }}>
        <header>
          <div className='top-inputs'>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={fetchWeatherData}>
              <CiSearch size={20} />
            </button>
          </div>
          {typeof weather.main !== "undefined" ? (
            <div className="weather-card">
              <div className="weather-icon">
                {renderWeatherIcon()}
              </div>
              <h1>{Math.round(weather.main.temp)}℃</h1>
              <h2>{weather.name}</h2>
              <div className="bottom-weather">
                <p>{weather.weather[0].main}</p>
              </div>
              <div className="weather-details">
                <p>{weather.main.humidity} % <br />Humidity</p>
                <p>{weather.wind.speed} Km/h <br />Wind Speed</p>
              </div>
            </div>
          ) : ("")}
        </header>
      </div>
    );
}

export default App;
