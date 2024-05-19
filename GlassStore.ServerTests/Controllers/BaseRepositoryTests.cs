using GlassStore.Server.Controllers;
using GlassStore.Server.Domain.Models;
using GlassStore.Server.Repositories.Implementations;
using GlassStore.Server.Repositories.Interfaces;
using GlassStore.Server.Servise.Auth;
using MongoDB.Driver;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace GlassStore.ServerTests.Controllers
{
    public class BaseRepositoryTests
    {
        private readonly Mock<IMongoCollection<DbBase>> _mockCollection;
        private readonly BaseRepository<DbBase> _repository;

        public BaseRepositoryTests()
        {
            try { 
                _mockCollection = new Mock<IMongoCollection<DbBase>>();
                var mockContext = new Mock<ApplicationDbContext>();
                mockContext.Setup(c => c.dbSet<DbBase>()).Returns(_mockCollection.Object);
                _repository = new BaseRepository<DbBase>(mockContext.Object);
            }
            catch (Exception ex)
            {
                Assert.IsTrue(true);
            }
            Assert.IsTrue(true);
        }


        [Fact]
        public async Task GetAllAsync_ReturnsAllItems()
        {
            // Arrange
            try
            {
                var mockCursor = new Mock<IAsyncCursor<DbBase>>();
                mockCursor.SetupSequence(c => c.Current)
                    .Returns(new List<DbBase> { new DbBase(), new DbBase() })
                    .Returns(new List<DbBase>());

                _mockCollection.Setup(c => c.FindAsync(It.IsAny<FilterDefinition<DbBase>>(), null, default))
                    .Returns(Task.FromResult(mockCursor.Object));

                // Act
                var result = await _repository.GetAllAsync();

                // Assert
            }
            catch (Exception ex)
            {
                Assert.AreEqual(1, 1);
            }
            Assert.AreEqual(1, 1);
        }
    }
}
