
using GlassStore.Server.Domain.Models.Auth;
using GlassStore.Server.Domain.Models.User;
using GlassStore.Server.Repositories.Interfaces;
using GlassStore.Server.Servise;
using GlassStore.Server.Servise.Helpers;
using GlassStore.Server.Servise.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;


namespace GlassStore.Server.Controllers.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly ILogger<ChatHub> _logger;
        private readonly ChatServise chatServise;
        private readonly UserServise userServise;


        public ChatHub(ILogger<ChatHub> logger, ChatServise chatServise, UserServise userServise)
        {

            this.chatServise = chatServise;
            this.userServise = userServise;

            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


        private string userId => Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        public override async Task OnConnectedAsync()
        {

            // Получите сообщения из базы данных
            

            UserInfo accounts = await userServise.GetUserbyId(userId);
            //_logger.LogInformation($"Подключение клиента: {userId}");
            Chat chat = await chatServise.GetChatRegular(accounts);


            // Отправьте сообщения клиенту, который только что подключился
            await Clients.Caller.SendAsync("ReceiveMessage", chat);


            _logger.LogInformation($"Успешное подключение клиента.{userId}");
            await base.OnConnectedAsync();
        }

        public async Task SendMessage(Chat chat)
        {
            //UserInfo accounts = await userServise.GetUserbyId(userId);
            //await Chat.CreateAsync(new Chat { message = message });
            _logger.LogInformation($"Сообщение от клиента: {chat}");
            chat.Dialog.Last().DateTime = DateTime.Now;
            chat.Dialog.Last().Sender_User = new UserInfo() { Id = userId};
            await chatServise.Update(chat);

            await Clients.All.SendAsync("ReceiveMessage", chat);
        }

        
    }
}
