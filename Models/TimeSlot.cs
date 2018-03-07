using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace timereg.Models
{
    public class TimeSlot
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public double LengthOfWork { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }
    }
}