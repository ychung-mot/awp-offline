using System;

namespace AWP.Web.DTO
{
    public class UserType
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CachedTime { get; set; } = DateTime.UtcNow;
    }
}