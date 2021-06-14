import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

const apiKey = "96eb769f1e3b299a54e8df543c471226";

function TodayTab({ coordinates }) {
	const [forecasts, setForecasts] = useState(null);
	const [error, setError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(()=>{
		async function fetchData () {
			setError(false);
			toggleLoading(true);

		try {
			const result = await axios.get (`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${apiKey}`);
			setForecasts([
				result.data.hourly[3],
				result.data.hourly[5],
				result.data.hourly[7],
			]);
			console.log("dit is voor de todytab:" ,result.data);
		} catch (e) {
			console.error(e);
			setError(true);
		}
		toggleLoading(false);
		}

		if (coordinates) {
			fetchData();
		}
	}, [coordinates]);

	return(
		<div className="tab-wrapper">
			{forecasts &&
			<>
				<div className="chart">
					{forecasts.map((forecast) => {
						return <WeatherDetail
							key={forecast.dt}
							key={forecast.temp}
							key={forecast.weather[0].main}
							description={forecast.weather[0].description}
						/>
					})}
				</div>
				<div className="legend">
					{forecasts.map((forecast) => {
						return <span key={forecast.dt}>{createTimeString(forecast.dt)}</span>
					})}
				</div>
			</>
			}
			{error && <span>Er is iets misgegaan met het ophalen van de data...</span>}
			{loading && (<span>Loading...</span>)}
		</div>
  );
};

export default TodayTab;
