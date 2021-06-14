import React from 'react';
import './WeatherDetail.css';
import kelvinToCelcius from "../../helpers/kelvinToCelcius";
import iconMapper from "../../helpers/iconMapper";

function WeatherDetail(
    {
        description,
        temp,
        type,
    }
) {
  return (
    <section className="day-part">
      <span className="icon-wrapper">
        {iconMapper(type)}
      </span>
      <p className="description">{description}</p>
      <p>{kelvinToCelcius(temp)}</p>
    </section>
  );
};

export default WeatherDetail;
