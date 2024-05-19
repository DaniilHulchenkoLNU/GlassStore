using GlassStore.Server.Domain.Models.User;
using GlassStore.Server.DAL.Interfaces;
using GlassStore.Server.Servise.Helpers;
using GlassStore.Server.Domain.Models.Auth;
using AutoMapper;
using System.Linq;
using GlassStore.Server.Repositories.Interfaces;
using GlassStore.Server.Domain.Models.Glass;
using MongoDB.Bson;



namespace GlassStore.Server.Servise.User
{
    public class UserServise
    {
        private readonly iUserRepository _userRepository;
        private readonly iBaseRepository<Glasses> glassRepository;
        private readonly HttpService httpService;
        private readonly IMapper mapper;
        private readonly Accounts user;

        public UserServise(iUserRepository userRepository, HttpService httpService, IMapper mapper, iBaseRepository<Glasses> glassRepository)
        {
            _userRepository = userRepository;
            this.httpService = httpService;
            this.mapper = mapper;
            this.glassRepository = glassRepository;

        }
        public async Task<UserInfo> GetUser()
        {
            Accounts account = await httpService.GetCurrentUser();
            return mapper.Map<UserInfo>(account);
        }

        public async Task<bool> AddOrder(Orders order)
        {
            try
            {
                order.OrderDate = DateTime.Now;
                order.TotalPrice = order.Glasses.Sum(x => x.Price);
                Accounts user = await httpService.GetCurrentUser();
                if (user.Orders == null)
                {
                    user.Orders = new List<Orders>();
                }
                user.Orders.Add(order);
                await _userRepository.UpdateAsync(user.Id, user);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        //public async Task<List<T>> GetField<T>()
        //{
        //    Accounts user = await httpService.GetCurrentUser();
        //    var propertyInfo = user.GetType(T);
        //    return user.GetType(propertyInfo) as List<T>;
        //    var propertyInfo = user.GetType().GetProperty(Field);
        //    return user.GetType(propertyInfo) as List<T>;
        //}

        public async Task<List<Orders>> GetOrders()
        {
            Accounts user = await httpService.GetCurrentUser();
            return user.Orders;
        }

        public async Task<Basket> GetBasket()
        {
            Accounts user = await httpService.GetCurrentUser();
            List<Glasses> glasses = new List<Glasses> { };
            foreach (Glasses glasses_id in user.Basket.Glasses)
            {
                glasses.Add(await glassRepository.GetByIdAsync(glasses_id.Id));
            }



            user.Basket.Glasses = glasses;
            return user.Basket;
        }
        public async Task<bool> AddToBasket(Dictionary<string, string> data)
        {
            Accounts user = await httpService.GetCurrentUser();

            var glassData = await glassRepository.GetByIdAsync(data["id"]);


            if (user.Basket.Glasses == null)
            {
                user.Basket.Glasses = new List<Glasses>();
            }

            Glasses glass = new Glasses { Id = glassData.Id, Price = 0m };
            user.Basket.Glasses.Add(glass);

            user.Basket.TotalPrice = await CouthTotalPriseInBasket() + glassData.Price;
            await _userRepository.UpdateAsync(user.Id, user);

            return true;
        }

        private async Task<decimal> CouthTotalPriseInBasket()
        {
            Accounts user = await httpService.GetCurrentUser();
            decimal totalPrice = 0;
            foreach (var glasses_id in user.Basket.Glasses)
            {
                totalPrice += (await glassRepository.GetByIdAsync(glasses_id.Id)).Price;
            }
            return totalPrice;

        }
    }
}
