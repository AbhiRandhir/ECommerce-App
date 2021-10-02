using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IResponseCacheService
    {
        //Task CacheService(string cacheString, object response, TimeSpan timeToLive);
          Task CacheResponseAsync(string cacheString, object response, TimeSpan timeToLive);
        
        Task<string> GetCacheResponseAsync(string cacheKey);
    }
}