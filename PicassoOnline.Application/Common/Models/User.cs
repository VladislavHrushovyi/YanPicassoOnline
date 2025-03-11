using Newtonsoft.Json;

namespace PicassoOnline.Application.Common.Models;

public class User
{
    [JsonProperty("name")]
    public string Name { get; set; }
    
    [JsonProperty("connId")]
    public string ConnId { get; set; }
    
    [JsonProperty("role")]
    public string Role { get; set; }
}