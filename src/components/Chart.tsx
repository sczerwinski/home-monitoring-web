import * as React from "react";

import { Box, Typography } from '@material-ui/core';

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Label, Legend, Line, Tooltip } from "recharts";

import Api, { Location, SensorType, SensorReading } from './Api';
import LoadingProgress from './LoadingProgress'

const RELOAD_INTERVAL = 60000;

const X_AXIS_TICKS = [
  "00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"
];

type ChartProps = {
  location: Location
}

type ChartState = {
  error?: any,
  isLoaded: boolean,
  readings: Map<SensorType, SensorReading[]>
}

type ChartData = {
  time: string,
  temperature: number,
  humidity: number
}

export default class Chart extends React.Component<ChartProps, ChartState> {

  interval: any = null;

  constructor(props: ChartProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      readings: new Map<SensorType, SensorReading[]>()
    }
  }

  componentDidMount() {
    this.fetchSensorReadings()
    this.interval = setInterval(() => this.reload(), RELOAD_INTERVAL);
  }

  private fetchSensorReadings() {
    Promise.all([
      Api.fetchReadings(this.props.location.name, SensorType.Temperature, new Date()),
      Api.fetchReadings(this.props.location.name, SensorType.Humidity, new Date())
    ])
      .then(
        (result) => {
          let readings = new Map<SensorType, SensorReading[]>();
          readings.set(SensorType.Temperature, result[0]);
          readings.set(SensorType.Humidity, result[1]);
          this.setState({
            isLoaded: true,
            readings: readings
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  private reload() {
    this.fetchSensorReadings()
  }

  render() {
    const { error, isLoaded, readings } = this.state;
    if (error) {
      return this.renderError();
    } else if (!isLoaded) {
      return this.renderProgress();
    } else {
      return this.renderContent(readings);
    }
  }

  private renderError() {
    let dashboard = this;
    return (
      <Typography component="p" variant="subtitle2" color="error" gutterBottom>
        Error loading readings
      </Typography>
    );
  }

  private renderProgress() {
    return <LoadingProgress />;
  }

  renderContent(readings: Map<SensorType, SensorReading[]>) {
    let data = this.averageEachTenMinutes(this.convertData(readings))
    return (
      <Box height="400px">
      <ResponsiveContainer>
        <LineChart
            data={data}
            syncId="syncCharts"
            margin={{
              top: 8,
              right: 16,
              bottom: 8,
              left: 16,
            }}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            dataKey="time"
            ticks={X_AXIS_TICKS} />
          <YAxis
              yAxisId="temperatureAxis"
              domain={[dataMin => (Math.floor(dataMin)), dataMax => (Math.ceil(dataMax))]}>
            <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle' }}>
              Temperature (&deg;C)
            </Label>
          </YAxis>
          <YAxis
              yAxisId="humidityAxis"
              orientation="right"
              domain={[dataMin => (Math.floor(dataMin)), dataMax => (Math.ceil(dataMax))]}>
            <Label
                angle={90}
                position="right"
                style={{ textAnchor: 'middle' }}>
              Humidity (%)
            </Label>
          </YAxis>
          <Legend verticalAlign="top" iconType="plainline" height={36} />
          <Line
              yAxisId="humidityAxis"
              type="monotone"
              dataKey="humidity"
              name="Humidity"
              stroke="#2196f3"
              strokeWidth={2}
              dot={false} />
          <Line
              yAxisId="temperatureAxis"
              type="monotone"
              dataKey="temperature"
              name="Temperature"
              stroke="#ff9800"
              strokeWidth={2}
              dot={false} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      </Box>
    );
  }

  private convertData(readings: Map<SensorType, SensorReading[]>): ChartData[] {
    let temperatureMap = new Map<string, number>()
    let humidityMap = new Map<string, number>()
    readings.get(SensorType.Temperature).forEach((reading) => {
      temperatureMap.set(
        reading.dateTime.split("T")[1].slice(0, 5),
        reading.value
      )
    })
    readings.get(SensorType.Humidity).forEach((reading) => {
      if (reading.value <= 100 && reading.value >= 0) {
        humidityMap.set(
          reading.dateTime.split("T")[1].slice(0, 5),
          reading.value
        )
      }
    })
    let data = Array.from(humidityMap, ([key, value]) => {
      let dataPoint: ChartData = {
        time: key,
        temperature: temperatureMap.get(key),
        humidity: humidityMap.get(key)
      };
      return dataPoint;
    })
    return data;
  }

  private averageEachTenMinutes(data: ChartData[]): ChartData[] {
    let grouped = data.reduce((acc, next) => {
      let time = next.time.replace(/.$/, "0");
      acc.set(time, [...acc.get(time) || [], next]);
      return acc;
    }, new Map<string, ChartData[]>())
    let avgs = Array.from(grouped, ([time, data]) => {
      let temperature = data.reduce((sum, next) => sum + next.temperature, 0) / data.length;
      let humidity = data.reduce((sum, next) => sum + next.humidity, 0) / data.length;
      let dataPoint: ChartData = {
       time: time,
       temperature: Math.round(temperature * 100) / 100,
       humidity: Math.round(humidity * 100) / 100
      };
      return dataPoint;
    })
    return avgs;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
