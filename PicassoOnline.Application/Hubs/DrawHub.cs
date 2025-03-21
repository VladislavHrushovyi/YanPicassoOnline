using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Collections.Immutable;
using System.Text.Json;
using PicassoOnline.Application.Common.Models;
using PicassoOnline.Application.Features.UpdateDrawBoardBase64;
using PicassoOnline.Application.Hubs.ResponseModels;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Hubs;

public class DrawHub(IUnitOfWork unitOfWork) : Hub
{
    private new static ConcurrentDictionary<string, DrawBoardState> Groups = new();
    private static ConcurrentBag<User> _users = new();

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine(Context.ConnectionId + " has joined.");
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connId = Context.ConnectionId;
        Console.WriteLine(connId + " has left the connection.");
        if (Groups.TryGetValue(connId, out var state))
        {
            Groups.TryRemove(connId, out state);
            _users = (ConcurrentBag<User>)_users.Where(x => x.ConnId != connId);
            Console.WriteLine(connId + " disconnected name" + state.Owner.Name);
        }
    }

    public async Task<string> CreateUser(string name, string role)
    {
        var connId = Context.ConnectionId;

        var user = new User()
        {
            Name = name,
            Role = role,
            ConnId = connId
        };

        _users.Add(user);
        Console.WriteLine($"User {user.Name} - {user.Role} - {user.ConnId} created.");
        Console.WriteLine($"Amount users added: {_users.Count}");
        var responseString = JsonSerializer.Serialize(user);

        return responseString;
    }

    public async Task<string> Create()
    {
        var connId = Context.ConnectionId;
        var user = _users.FirstOrDefault(u => u.ConnId == connId);

        if (user == null) return string.Empty;
        Console.WriteLine("ALLOOOOO");
        var detailedDataId = await unitOfWork.SessionDataRepository.InitNewData(user.Name);

        var boardState = new DrawBoardState()
        {
            Owner = user,
            ConnectedUsers = new ConcurrentBag<User>(),
            DetailedDataId = detailedDataId
        };
        boardState.ConnectedUsers.Add(user);

        Groups.TryAdd(connId, boardState);
        var response = new CreateBoardResponse
        {
            OwnerName = boardState.Owner.Name,
            Users = boardState.ConnectedUsers.Select(x => new ConnectedUser()
            {
                Name = x.Name,
                ConnId = x.ConnId,
                Role = x.Role
            }).ToArray(),
            DetailedDataId = detailedDataId,
            Base64Image = string.Empty,
            ConnId = connId
        };

        var responseString = JsonSerializer.Serialize(response, JsonSerializerOptions.Web);
        Console.WriteLine(responseString);
        return responseString;
    }

    public async Task<string> AddUserToBoard(string boardId, string userName)
    {
        Console.WriteLine($"Adding user {userName} to board {boardId}");
        if (!Groups.TryGetValue(boardId, out var boardState)) return String.Empty;

        var currConnId = Context.ConnectionId;
        if (boardState.Owner.ConnId == currConnId) return string.Empty;

        var user = _users.FirstOrDefault(u => u.Name == userName);

        boardState.ConnectedUsers.Add(user);
        var responseObj = new CreateBoardResponse
        {
            OwnerName = boardState.Owner.Name,
            ConnId = boardId,
            DetailedDataId = boardState.DetailedDataId,
            Base64Image = await unitOfWork.SessionDataRepository.GetBase64ById(boardState.DetailedDataId),
            Users = boardState.ConnectedUsers.Select(x => new ConnectedUser()
                { Name = x.Name, Role = x.Role, ConnId = x.ConnId }).ToArray(),
        };
        var responseJson = JsonSerializer.Serialize(responseObj);
        Console.WriteLine($"Response {responseJson}");
        return responseJson;
    }

    public async Task BorderInteractBroadcast(string drawBoardName, string data)
    {
        var connId = Context.ConnectionId;

        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return;

        if (boardState.Owner.ConnId != connId)
        {
            await Clients.Client(boardState.Owner.ConnId).SendAsync(data);
        }

        if (boardState.ConnectedUsers.Any(x => x.ConnId == connId))
        {
            await Clients.Users((IReadOnlyList<string>)boardState.ConnectedUsers.Where(c => c.ConnId != connId))
                .SendAsync(data);
        }
    }

    public async Task ClearDrawBoard(string drawBoardName)
    {
        var connId = Context.ConnectionId;
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return;

        //await _sessionDataRepository.UpdateBase64Image(inr id, string base64) TODO

        if (boardState.Owner.ConnId != connId)
        {
            await Clients.Client(boardState.Owner.ConnId).SendAsync("");
        }

        if (boardState.ConnectedUsers.Any(x => x.ConnId == connId))
        {
            await Clients.Users((IReadOnlyList<string>)boardState.ConnectedUsers.Where(c => c.ConnId != connId))
                .SendAsync("");
        }
    }

    public async Task<string> GetAllDrawBoards()
    {
        var allBoards = Groups.Select(x => new CreateBoardResponse()
        {
            ConnId =  x.Key,
            OwnerName = x.Value.Owner.Name,
            Base64Image = unitOfWork.SessionDataRepository.GetBase64ById(x.Value.DetailedDataId).GetAwaiter().GetResult(),
            DetailedDataId =  x.Value.DetailedDataId,
            Users =  x.Value.ConnectedUsers.Select(user => new ConnectedUser()
            {
                Name =  user.Name,
                ConnId = user.ConnId,
                Role = user.Role
            }).ToArray()
        });
        var responseString = JsonSerializer.Serialize(allBoards);
        
        return responseString;
    }

    public string GetUserByDrawField(string drawBoardName)
    {
        
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return "";
        Console.WriteLine($"Get Users by deawboard id {drawBoardName}");
        var users = boardState.ConnectedUsers.Select(x => new ConnectedUser()
        {
            Role =  x.Role,
            ConnId = x.ConnId,
            Name = x.Name
        });
        return JsonSerializer.Serialize(users);
    }

    public string GetAllUser()
    {
        var users = _users.Select(x => new ConnectedUser()
        {
            Name =  x.Name,
            Role = x.Role,
            ConnId = x.ConnId
        });

        return JsonSerializer.Serialize(users);
    }
}