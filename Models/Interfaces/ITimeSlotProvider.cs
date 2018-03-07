using System;
using System.Collections.Generic;

namespace timereg.Models
{
    public interface ITimeSlotProvider
    {
        IEnumerable<TimeSlot> GetTimeSlots(DateTime date);
    }
}