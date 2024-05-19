using GlassStore.Server.Domain.Models.Auth;
using MongoDB.Bson.Serialization.Attributes;

namespace GlassStore.Server.Domain.Models.User
{
    public class UserInfo : DbBase
    {
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public string Email { get; set; }
        //public string Password { get; set; }
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public List<Orders> Orders { get; set; }
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public Basket Basket { get; set; }
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public Role[] Roles { get; set; }
    }
}
