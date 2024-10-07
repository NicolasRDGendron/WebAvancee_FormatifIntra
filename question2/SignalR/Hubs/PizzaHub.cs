using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            _pizzaManager.AddUser();
            await UpdateNbUsers();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnConnectedAsync();
            _pizzaManager.RemoveUser();
            await UpdateNbUsers();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, _pizzaManager.GetGroupName(choice));
            await UpdatePizzaPrice(choice);
            await UpdateNbPizzasAndMoney(choice);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, _pizzaManager.GetGroupName(choice));
            await UpdatePizzaPrice(choice);
            await UpdateNbPizzasAndMoney(choice);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            await UpdateMoney(choice);

        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);
            await UpdateNbPizzasAndMoney(choice);
        }

        public async Task UpdateNbUsers()
        {
            await Clients.All.SendAsync("nbUsers", _pizzaManager.NbConnectedUsers);
        }

        public async Task UpdateMoney(PizzaChoice choice)
        {
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("money", _pizzaManager.Money[(int)choice]);
        }

        public async Task UpdateNbPizzasAndMoney(PizzaChoice choice)
        {
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("nbPizzasAndMoney", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);
        }

        public async Task UpdatePizzaPrice(PizzaChoice choice)
        {
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("pizzaPrice", _pizzaManager.PIZZA_PRICES[(int)choice]);
        }
    }
}
