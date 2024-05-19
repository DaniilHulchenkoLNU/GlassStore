using GlassStore.Server.Domain.Models.Glass;

namespace GlassStore.Server.Domain.Models.User
{
    public class Basket: DbBase
    {
        public List<Glasses> Glasses { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
