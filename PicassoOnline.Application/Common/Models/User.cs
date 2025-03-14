using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace PicassoOnline.Application.Common.Models;

public class User
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("connId")]
    public string ConnId { get; set; }
    
    [JsonPropertyName("role")]
    public string Role { get; set; }
}