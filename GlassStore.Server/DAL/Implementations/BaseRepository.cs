using GlassStore.Server.Repositories.Interfaces;
using MongoDB.Driver;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using SharpCompress.Compressors.ADC;
using GlassStore.Server.Domain.Models.Glass;
using GlassStore.Server.Domain.Models;

namespace GlassStore.Server.Repositories.Implementations;

public class BaseRepository<T> : iBaseRepository<T> where T : DbBase
{
    //private readonly ApplicationDbContext _db;

    private readonly IMongoCollection<T> _data;

    public BaseRepository(ApplicationDbContext db)
    {
        //_db = db;
        _data = db.dbSet<T>();

    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        //_db.set<T >
        return await _data.FindAsync(_ => true).Result.ToListAsync();
    }

    public async Task<T> GetByIdAsync(string id)
    {
        var objectId = new ObjectId(id);
        var filter = Builders<T>.Filter.Eq("_id", objectId);
        return await _data.Find(filter).FirstOrDefaultAsync();
    }


    public async Task CreateAsync(T data)
    {
        await _data.InsertOneAsync(data);
    }

    public async Task UpdateAsync(string id, T updatedData)
    {
        var objectId = new ObjectId(id);
        var filter = Builders<T>.Filter.Eq("_id", objectId);
        await _data.ReplaceOneAsync(filter, updatedData);
    }

    public async Task DeleteAsync(string id)
    {
        var objectId = new ObjectId(id);
        var filter = Builders<T>.Filter.Eq("_id", objectId);
        await _data.DeleteOneAsync(filter);
    }

    public async Task<DataList<T>> GetSliceAsync(int from, int to)
    {
        IEnumerable<T> all_data = await _data.FindAsync(_ => true).Result.ToListAsync();
        DataList<T> data = new DataList<T>();
        int ListSize = all_data.Count() - 1;
        data.listSize = ListSize;
        if (to < ListSize)
        {
            data.data = all_data.Skip(from).Take(to);
        }
        else
        {
            data.data = all_data.Skip(from).Take(ListSize);
        }
        return data;
    }

    public async Task<DataList<T>> GetFirstAsync(int i)
    {
        IEnumerable<T> temp = await _data.FindAsync(_ => true).Result.ToListAsync();
        DataList<T> data = new DataList<T> { data = temp.Take(i), listSize = temp.Count() };

        return data;
    }
}
