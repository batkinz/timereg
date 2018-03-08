import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import 'datejs';

import { TimeRow } from '../components/TimeRow';
import { TimeSlot } from '../interfaces/TimeSlot';
import { CurrentDateWidget } from '../components/CurrentDateWidget';

interface RegisterTimeState {
    timeSlots: TimeSlot[];
    loading: boolean;
    currentDate: Date;
}

export class RegisterTime extends React.Component<RouteComponentProps<{}>, RegisterTimeState> {
    constructor() {
        super();
        this.state = { timeSlots: [], loading: true, currentDate: Date.today() };

        this.dateChanged = this.dateChanged.bind(this);
    }

    componentWillMount() {
        this.update(this.state.currentDate);
    }

    private update(date : Date) {
        this.setState({ loading: true });
        const dateString = date.toString("yyyy-MM-dd");

        axios.get(`api/TimeSlots/GetSlots/${dateString}`)
            .then(response => response.data as TimeSlot[])
            .then(data => this.setState({ timeSlots: data, loading: false }));
    }

    private dateChanged(newDate : Date) {
        this.setState({ currentDate: newDate });
        this.update(newDate);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTimeSlotsTable(this.state.timeSlots);

        return <div>
            <h1>Register time</h1>
            <div className="row">
                <CurrentDateWidget currentDate={this.state.currentDate} dateChanged={this.dateChanged} />
                { contents }
            </div>
        </div>;
    }

    private renderTimeSlotsTable(slots: TimeSlot[]) {
        return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Description</th>
                    <th>Hours</th>
                    <th>Save</th>
                </tr>
            </thead>
            <tbody>
                {slots.map((slot, i) => <TimeRow key={i} {...slot} />)}
            </tbody>
        </table>);
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
