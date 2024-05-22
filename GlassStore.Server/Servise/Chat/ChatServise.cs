using GlassStore.Server.DAL.Interfaces;
using GlassStore.Server.Domain.Models.Auth;
using GlassStore.Server.Domain.Models.Glass;
using GlassStore.Server.Domain.Models.User;
using GlassStore.Server.Repositories.Interfaces;

namespace GlassStore.Server.Servise
{
    public class ChatServise
    {

        public readonly iBaseRepository<Chat> chatRepository;
        public readonly iUserRepository userRepository;
        public readonly iBaseRepository<Glasses> glassRepository;

        public ChatServise(iUserRepository userRepository, iBaseRepository<Glasses> glassRepository, iBaseRepository<Chat> chatRepository)
        {
            this.chatRepository = chatRepository;
            this.userRepository = userRepository;
            this.glassRepository = glassRepository;
        }

        private async void TestDb()
        {
            var tempUser = await userRepository.GetFirstAsync(1);
            Accounts accounts = tempUser.data.First();

            Dialog tempDialog = new Dialog
            {
                Message = "Hello",
                SenderUser = new UserInfo() { Id = accounts.Id },
                DateTime = DateTime.Now
            };

            Chat chat = new Chat
            {

                Dialog = new List<Dialog> { tempDialog },
                ThemeofDialog_Glass = new Glasses() { Id = (await glassRepository.GetFirstAsync(1)).data.First().Id }
            };

            await chatRepository.CreateAsync(chat);


        }
        public async Task Update(Chat chat)
        {
            await chatRepository.UpdateAsync(chat.Id, chat);
        }

        public async Task<Chat> CreateChat(UserInfo user, string? ThemeId = null)
        {


            //Accounts user = await userRepository.GetByIdAsync(userId);
            string userId = user.Id;

            Dialog NewDialog = new Dialog
            {
                Message = "Start",
                SenderUser = user,
                DateTime = DateTime.Now
            };

            Chat NewChat = new Chat()
            {
                Dialog = new List<Dialog> { NewDialog }

            };
            if (ThemeId != null)
            {
                NewChat.ThemeofDialog_Glass = new Glasses() { Id = (await glassRepository.GetByIdAsync(ThemeId)).Id };
            }

            await chatRepository.CreateAsync(NewChat);

            return NewChat;
        }


        public async Task<Chat> GetChatRegular(UserInfo accounts)
        {
            Chat chat = (await chatRepository.GetAllAsync())
                .FirstOrDefault(q => q.Dialog.Any(d => d.SenderUser.Id == accounts.Id) && q.ThemeofDialog_Glass == null);

            if (chat == null)
            {
                chat = await CreateChat(accounts);
            }

            return chat;
            //return (await chatRepository.GetAllAsync()).ToList();
        }

        public async Task<Chat> GetChatGlass(string Userid, string GlassId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Chat>> GetChatsForAdmin() => (await chatRepository.GetAllAsync()).ToList();
    }
}
