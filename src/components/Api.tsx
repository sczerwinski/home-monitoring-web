import * as React from "react";

const BASE_URL = require("Config").apiBaseUrl;

type Location = {
  id: number,
  name: string
}

enum SensorType {
  Temperature = "TEMPERATURE",
  Humidity = "HUMIDITY"
}

type SensorReading = {
  dateTime: string,
  value: number
}

export default class Api {

  static fetchLocations(): Promise<Location[]> {
    return fetch(BASE_URL + "/locations")
      .then(response => response.json())
  }

  static fetchSensorTypes(locationName: string): Promise<SensorType[]> {
    return fetch(BASE_URL + "/location/" + locationName + "/types")
      .then(response => response.json())
  }

  static fetchLatestReading(locationName: string, readingType: string): Promise<SensorReading> {
    return fetch(BASE_URL + "/location/" + locationName + "/type/" + readingType + "/reading")
      .then(response => response.json())
  }

  static fetchReadings(locationName: string, readingType: string, date: Date): Promise<SensorReading[]> {
    let formattedDate = date.toISOString().split('T')[0];
    return fetch(BASE_URL + "/location/" + locationName + "/type/" + readingType + "/readings/" + formattedDate)
      .then(response => response.json())
  }
}

export {
  Location,
  SensorType,
  SensorReading
}
