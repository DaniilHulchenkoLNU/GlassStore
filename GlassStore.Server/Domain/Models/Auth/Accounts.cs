using GlassStore.Server.Domain.Models.User;

namespace GlassStore.Server.Domain.Models.Auth
{
    public class Accounts : DbBase
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Orders> Orders { get; set; }
        public Basket Basket { get; set; }
        public Role[] Roles { get; set; }
    }

}
