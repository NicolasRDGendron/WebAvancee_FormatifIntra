import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // Fetch number of active users
    this.hubConnection!.on('nbUsers', (data) => {
      this.nbUsers = data;
    });

    // Fetch group money
    this.hubConnection!.on('money', (data) => {
      this.money = data;
    });

    // Fetch pizza price
    this.hubConnection!.on('pizzaPrice', (data) => {
      this.pizzaPrice = data;
    });

    // Fetch group money and number of pizzas
    this.hubConnection!.on('nbPizzasAndMoney', (nbPizzas, money) => {
      this.money = money;
      this.nbPizzas = nbPizzas;
    });

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection
      .start()
      .then(() => {
        console.log('La connexion est active!');
        this.isConnected = true;
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;
    this.hubConnection!.invoke('selectChoice', selectedChoice);
  }

  unselectChoice() {
    this.selectedChoice = -1;
  }

  addMoney() {
    this.hubConnection!.invoke('addMoney', this.selectedChoice);
  }

  buyPizza() {
    this.hubConnection!.invoke('buyPizza', this.selectedChoice);
  }
}
