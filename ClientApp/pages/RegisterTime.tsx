import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import { TimeRow } from '../components/TimeRow';

interface FetchDataExampleState {
    forecasts: WeatherForecast[];
    loading: boolean;
}

export class RegisterTime extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };

        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : RegisterTime.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>Register time</h1>
            { contents }
        </div>;
    }

    private static renderForecastsTable(forecasts: WeatherForecast[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Description</th>
                    <th>Hours</th>
                </tr>
            </thead>
            <tbody>
            {forecasts.map((forecast, i) =>
                <TimeRow
                    key={i}
                    id="xxx"
                    date={new Date()}
                    lengthOfWork={forecast.temperatureC}
                    projectName={forecast.dateFormatted}
                    description={forecast.summary} />
            )}
            </tbody>
        </table>;
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
