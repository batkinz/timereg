using System;
using System.Collections.Generic;
using System.Linq;

namespace timereg.Models
{
    public class InMemoryTimeSlotAccess : ITimeSlotAccess
    {
        private static List<TimeSlot> slots = new List<TimeSlot>();
        private static object slotsLock = new object();

        static InMemoryTimeSlotAccess()
        {
            FillWithFakeData();
        }

        private static void FillWithFakeData()
        {
            Random r = new Random();
            for (int i = 0; i < 10; i++)
            {
                int rnd = r.Next(-5, 5);
                slots.Add(new TimeSlot
                {
                    Id = 0,
                    Date = DateTime.Now.AddDays(rnd),
                    Description = $"Blah {rnd}",
                    ProjectName = $"Project {rnd}",
                    LengthOfWork = Math.Abs(rnd) / 2.0,
                });
            }
        }

        public void AddTimeSlot(TimeSlot newSlot)
        {
            lock (slotsLock)
            {
                int lastId = slots.Any() ? slots.Max(s => s.Id) : -1;
                newSlot.Id = lastId + 1;
                slots.Add(newSlot);
            }
        }

        public int DeleteTimeSlot(int id)
        {
            lock (slotsLock)
            {
                return slots.RemoveAll(s => s.Id == id);
            }
        }

        public IEnumerable<TimeSlot> GetTimeSlots(DateTime date)
        {
            return slots.Where(s => s.Date.Year == date.Year && s.Date.DayOfYear == date.DayOfYear);
        }
    }
}