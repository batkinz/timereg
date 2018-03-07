import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import { TimeRow } from '../components/TimeRow';
import { TimeSlot } from '../interfaces/TimeSlot';

interface RegisterTimeState {
    timeSlots: TimeSlot[];
    loading: boolean;
}

export class RegisterTime extends React.Component<RouteComponentProps<{}>, RegisterTimeState> {
    constructor() {
        super();
        this.state = { timeSlots: [], loading: true };

        fetch('api/TimeSlots/GetSlots/2018-03-07')
            .then(response => response.json() as Promise<TimeSlot[]>)
            .then(data => this.setState({ timeSlots: data, loading: false }));
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : RegisterTime.renderTimeSlotsTable(this.state.timeSlots);

        return <div>
            <h1>Register time</h1>
            { contents }
        </div>;
    }

    private static renderTimeSlotsTable(slots: TimeSlot[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Description</th>
                    <th>Hours</th>
                </tr>
            </thead>
            <tbody>
            {slots.map((slot, i) => <TimeRow key={slot.id} {...slot} />)}
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
