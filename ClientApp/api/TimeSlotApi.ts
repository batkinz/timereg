import axios from 'axios';
import 'datejs';

import { TimeSlot } from '../interfaces/TimeSlot';

class TimeSlotApi {
    public async deleteSlot(id : number) {
        await axios.delete(`api/TimeSlots/DeleteSlot/${id}`);
    }

    public async addSlot(newSlot : TimeSlot) {
        // making sure that the date will be correct on the server side
        newSlot.date = <Date><any>Date.parse(newSlot.date.toString('yyyy-MM-ddTHH:mm:ssZ'));

        await axios.post('api/TimeSlots/AddSlot', newSlot);
    }

    public async updateSlot(slot : TimeSlot) {
        await this.deleteSlot(slot.id);
        await this.addSlot(slot);
    }

    public async getSlots(date : Date, endDate? : Date) : Promise<TimeSlot[]> {
        const startDateString = date.toString("yyyy-MM-dd");

        if (endDate == null)
        {
            const response = await axios.get(`api/TimeSlots/GetSlots/${startDateString}`);
            return response.data as TimeSlot[];
        }
        else
        {
            const endDateString = endDate.toString("yyyy-MM-dd");
            const response = await axios.get(`api/TimeSlots/GetSlots`, {
                params: {
                    startDate: startDateString,
                    endDate: endDateString,
                },
            });
            return response.data as TimeSlot[];
        }
    }
}

export default new TimeSlotApi();