using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace PicassoOnline.Application.Hubs.ResponseModels;

public class CreateBoardResponse
{
    [JsonPropertyName("owner")] public string OwnerName { get; set; }

    [JsonPropertyName("detailedDataId")] public int DetailedDataId { get; set; }

    [JsonPropertyName("base64Image")] public string Base64Image { get; set; }

    [JsonPropertyName("connId")] public string ConnId { get; set; }

    [JsonPropertyName("users")] public ConnectdUser[] Users { get; set; }
}

public class ConnectdUser
{
    [JsonPropertyName("name")] public string Name { get; set; }
    [JsonPropertyName("role")] public string Role { get; set; }
    [JsonPropertyName("connId")] public string ConnId { get; set; }
}