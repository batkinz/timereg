using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using timereg.Models;

namespace timereg.Controllers
{
    [Route("api/[controller]")]
    public class TimeSlotsController : Controller
    {
        private ITimeSlotProvider provider;

        public TimeSlotsController()
        {
            provider = new FakeTimeSlotProvider();
        }

        [HttpGet("[action]/{date}")]
        public IEnumerable<TimeSlot> GetSlots(string date)
        {
            return provider.GetTimeSlots(DateTime.Parse(date));
        }
    }
}