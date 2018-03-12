import axios from 'axios';
import 'datejs';

import { TimeSlot } from '../interfaces/TimeSlot';

class TimeSlotApi {
    public async deleteSlot(id : number) {
        await axios.delete(`api/TimeSlots/DeleteSlot/${id}`);
    }

    public async addSlot(newSlot : TimeSlot) {
        // making sure that the date will be correct on the server side
        newSlot.date = Date.parse(newSlot.date.toString('yyyy-MM-ddTHH:mm:ssZ'));

        await axios.post('api/TimeSlots/AddSlot', newSlot);
    }

    public async updateSlot(slot : TimeSlot) {
        await this.deleteSlot(slot.id);
        await this.addSlot(slot);
    }

    public async getSlots(date : Date) : Promise<TimeSlot[]> {
        const dateString = date.toString("yyyy-MM-dd");

        const response = await axios.get(`api/TimeSlots/GetSlots/${dateString}`);
        return response.data as TimeSlot[];
    }
}

export default new TimeSlotApi();