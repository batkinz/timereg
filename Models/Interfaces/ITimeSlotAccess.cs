using System;
using System.Collections.Generic;

namespace timereg.Models
{
    public interface ITimeSlotAccess
    {
        IEnumerable<TimeSlot> GetTimeSlots(DateTime date);
        IEnumerable<TimeSlot> GetTimeSlots(DateTime fromDate, DateTime toDate);
        void AddTimeSlot(TimeSlot newSlot);
        int DeleteTimeSlot(int id);
    }
}