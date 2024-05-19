using GlassStore.Server.Domain.Models.Auth;
using GlassStore.Server.Domain.Models.Glass;
using MongoDB.Bson.Serialization.Attributes;

namespace GlassStore.Server.Domain.Models.User
{
    public class Chat : DbBase
    {
        public List<Dialog> Dialog { get; set; }
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public Glasses? ThemeofDialog_Glass { get; set; }

    }

    public class Dialog
    {
        public string Message { get; set; }
        public UserInfo Sender_User { get; set; }
        public DateTime DateTime { get; set; }
    }
}
