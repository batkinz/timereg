using System;
using System.Collections.Generic;
using System.Linq;

namespace timereg.Models
{
    public class FakeTimeSlotProvider : ITimeSlotProvider
    {
        public IEnumerable<TimeSlot> GetTimeSlots(DateTime date)
        {
            for (int i = 0; i < 10; i++)
            {
                yield return new TimeSlot
                {
                    Date = date,
                    Description = $"Description {i}",
                    ProjectName = $"ProjectName {i} - date {date.ToString("yyyy-MM-dd")}",
                    Id = i.ToString(),
                    LengthOfWork = i / 2.0,
                };
            }
        }
    }
}