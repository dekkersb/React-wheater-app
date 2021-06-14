import React, { useEffect, useState } from 'react';
import axios from "axios";
import './ForecastTab.css';
import kelvinToCelcius from "../../helpers/kelvinToCelcius";
import createDateString from "../../helpers/createDateString";

const apiKey = "96eb769f1e3b299a54e8df543c471226";

function ForecastTab({ coordinates }) {
    const [forecasts, setForecasts] = useState(null);
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
                setForecasts(result.data.daily.slice(1, 6));
                console.log("FUCK DIE AWAIT", result.data)
            } catch (e) {
                console.error(e);
                setError(true);
            }
            toggleLoading(false);
        };

        if (coordinates) {
            fetchData();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            {loading && (<span>Loading...</span>)}

            {forecasts && forecasts.map((forecast) => {
                return (
                    <article className="forecast-day" key={forecast.dt}>
                        <p className="day-description">
                            {createDateString(forecast.dt)}
                        </p>

                        <section className="forecast-weather">
              <span>
                {kelvinToCelcius(forecast.temp.day)}
              </span>
                            <span className="weather-description">
                {forecast.weather[0].description}
              </span>
                        </section>
                    </article>
                )
            })}

            {!forecasts && !error && (
                <span className="no-forecast">
                Zoek eerst een locatie op om het weer voor deze week te bekijken.
                </span>
            )}

            {error && <span> Er is iets misgegaan met het ophalen van de data.</span>}
        </div>
    );
}

export default ForecastTab;
