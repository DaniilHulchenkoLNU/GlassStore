﻿using GlassStore.Server.DAL.Interfaces;
using GlassStore.Server.Domain.Models.Auth;
using GlassStore.Server.Domain.Models.User;
using GlassStore.Server.Servise.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GlassStore.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserServise userServise;

        public UserController(UserServise userServise)
        {
            this.userServise = userServise;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return Ok();
        }

        [HttpGet("GetUser")]
        public async Task<UserInfo> GetUser() => await userServise.GetUser();

        [HttpGet("GetUserOrders")]
        public async Task<List<Orders>> GetUserOrders() => await userServise.GetOrders();
        [HttpGet("GetUserBasket")]
        public async Task<Basket> GetUserBasket() => await userServise.GetBasket();

        ////[HttpPost("Create")]
        //public ActionResult Create()
        //{
        //    return Ok();
        //}

        //// POST: UserController/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return Ok();
        //    }
        //}

        //[HttpPost]
        //public ActionResult Edit(int id)
        //{
        //    return Ok();
        //}

        //// POST: UserController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return Ok();
        //    }
        //}

        //[HttpGet]
        //public ActionResult Delete(int id)
        //{
        //    return Ok();
        //}

        //// POST: UserController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return Ok();
        //    }
        //}
    }
}
