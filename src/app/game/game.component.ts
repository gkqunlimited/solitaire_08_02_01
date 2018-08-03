import { Component, OnInit } from "@angular/core";
import { Card } from "../Card";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  talon: Card[] = [];
  stock: Card[] = [];
  found1: Card[] = [];
  found2: Card[] = [];
  found3: Card[] = [];
  found4: Card[] = [];
  foundations = [this.found1, this.found2, this.found3, this.found4];

  foundation: Card[][] = [[], [], [], []];
  man1: Card[] = [];
  man2: Card[] = [];
  man3: Card[] = [];
  man4: Card[] = [];
  man5: Card[] = [];
  man6: Card[] = [];
  man7: Card[] = [];
  maneuver = [
    this.man1,
    this.man2,
    this.man3,
    this.man4,
    this.man5,
    this.man6,
    this.man7
  ];

  ngOnInit() {
    //populate, shuffle cards
    var suits = ["diamonds", "hearts", "spades", "clubs"];
    var ranks = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    for (var _i = 0, suits_1 = suits; _i < suits_1.length; _i++) {
      var suit = suits_1[_i];
      for (var _a = 0, ranks_1 = ranks; _a < ranks_1.length; _a++) {
        var rank = ranks_1[_a];
        var card = new Card(rank, suit, false);
        this.talon.push(card);
      }
    }
    for (var i = this.talon.length - 1; i > 0; i--) {
      var temp = Math.floor(Math.random() * (i + 1));
      var card = this.talon[i];
      this.talon[i] = this.talon[temp];
      this.talon[temp] = card;
    }
    for (var row = 0; row < 7; row++) {
      for (var col = 0; col < 7; col++) {
        if (col < row) {
          continue;
        } else if (col === row) {
          this.talon[0].isFaceUp = true;
        }
        this.maneuver[col].push(this.talon.shift());
      }
    }
  }

  cardGet: string;
  cardPut: string;

  onDragStart(x: string): void {
    this.cardGet = x;
  }

  onDragOver(event: any): void {
    event.preventDefault();
  }

  onDrop(x: string): void {
    if (this.cardGet === null) {
      return;
    }
    this.cardPut = x;
    this.check(this.cardGet, this.cardPut);
  }

  onManeuverClick(x: string): void {
    var targetColumn = this.maneuver[x.charAt(1)];
    var targetCard = targetColumn[targetColumn.length - 1];
    targetCard.isFaceUp = true;
  }

  onDoubleClick(x: string): void {
    var manFrom;
    var card;
    if (x.charAt(0) == "c") {
      manFrom = this.maneuver[x.charAt(1)];
      card = manFrom[x.slice(3)];
    } else if (x.charAt(0) == "w") {
      manFrom = this.stock;
      card = manFrom[0];
    }
    for (var i = 0; i < this.foundation.length; i++) {
      if (card.rank == 1 && this.foundation[i].length == 0) {
        if (x.charAt(0) == "c") {
          this.foundation[i].push(manFrom.pop());
        } else if (x.charAt(0) == "w") {
          this.foundation[i].push(manFrom.shift());
        }
        break;
      } else if (
        this.foundation[i].length > 0 &&
        card.suit == this.foundation[i][0].suit &&
        card.rank == this.foundation[i][this.foundation[i].length - 1].rank + 1
      ) {
        if (x.charAt(0) == "c") {
          this.foundation[i].push(manFrom.pop());
        } else if (x.charAt(0) == "w") {
          this.foundation[i].push(manFrom.shift());
        }
        break;
      }
    }
  }

  onTalonClick(event: any): void {
    if (this.talon.length == 0) {
      while (this.stock.length != 0) {
        var card = this.stock.shift();
        card.isFaceUp = false;
        this.talon.unshift(card);
      }
    } else {
      var drawCounter = 0;
      while (this.talon.length > 0 && drawCounter != 1) {
        var card = this.talon.shift();
        card.isFaceUp = true;
        this.stock.unshift(card);
        drawCounter++;
      }
    }
  }

  check(cardTake: string, cardPut: string): void {
    var cardFrom = cardTake.charAt(0);
    var cardTo = cardPut.charAt(0);
    if (cardFrom == "c" && cardTo == "c" && cardPut.length === 2) {
      var manFrom = this.maneuver[cardTake.charAt(1)];
      var manTo = this.maneuver[cardPut.charAt(1)];
      var cardFrom_1 = manFrom[cardTake.slice(3)];
      if (cardFrom_1.rank === 13 && manTo.length == 0) {
        var cards = manFrom.splice(cardTake.slice(3));
        this.maneuver[cardPut.charAt(1)] = this.maneuver[
          cardPut.charAt(1)
        ].concat(cards);
      }
    } else if (cardFrom == "c" && cardTo == "c") {
      var cardFrom_2 = this.maneuver[cardTake.charAt(1)][cardTake.slice(3)];
      var manTo = this.maneuver[cardPut.charAt(1)];
      var cardTo_1 = manTo[cardPut.slice(3)];
      if (
        cardTo_1.isFaceUp &&
        cardFrom_2.color != cardTo_1.color &&
        cardFrom_2.rank === cardTo_1.rank - 1 &&
        parseInt(cardPut.slice(3)) == manTo.length - 1
      ) {
        var cards = this.maneuver[cardTake.charAt(1)].splice(cardTake.slice(3));
        this.maneuver[cardPut.charAt(1)] = this.maneuver[
          cardPut.charAt(1)
        ].concat(cards);
      }
    } else if (cardFrom == "c" && cardTo == "f") {
      var manFrom = this.maneuver[cardTake.charAt(1)];
      var cardFrom_3 = manFrom[cardTake.slice(3)];
      var manTo = this.foundation[cardPut.charAt(1)];
      if (
        parseInt(cardTake.slice(3)) == manFrom.length - 1 &&
        cardFrom_3.rank == manTo.length + 1 &&
        (manTo.length == 0 ||
          (manTo.length > 0 && cardFrom_3.suit == manTo[0].suit))
      ) {
        manTo.push(manFrom.pop());
      }
    } else if (cardPut.length == 2 && cardFrom == "w" && cardTo == "c") {
      let manTo = this.maneuver[parseInt(cardPut.charAt(1))];
      if (this.stock[0].rank == 13 && manTo.length == 0) {
        manTo.push(this.stock.shift());
      }
    } else if (cardFrom == "w" && cardTo == "c") {
      var columnTo = this.maneuver[parseInt(cardPut.charAt(1))];
      if (parseInt(cardPut.slice(3)) == columnTo.length - 1) {
        var cardFrom_4 = this.stock[0];
        var cardTo_2 = columnTo[parseInt(cardPut.slice(3))];
        if (
          cardFrom_4.rank == cardTo_2.rank - 1 &&
          cardFrom_4.color != cardTo_2.color &&
          cardTo_2.isFaceUp
        ) {
          columnTo.push(this.stock.shift());
        }
      }
    } else if (cardFrom == "w" && cardTo == "f") {
      let manTo = this.foundation[parseInt(cardPut.charAt(1))];
      if (
        this.stock[0].rank == manTo.length + 1 &&
        (manTo.length == 0 ||
          (manTo.length > 0 && this.stock[0].suit == manTo[0].suit))
      ) {
        manTo.push(this.stock.shift());
      }
    } else if (cardFrom == "f" && cardTo == "c") {
      var manFrom = this.foundation[cardTake.charAt(1)];
      var cardFrom_5 = manFrom[cardTake.slice(2)];
      var manTo = this.maneuver[cardPut.charAt(1)];
      var cardTo_3 = manTo[cardPut.slice(3)];
      if (
        cardFrom_5.rank == cardTo_3.rank - 1 &&
        cardFrom_5.color != cardTo_3.color
      ) {
        manTo.push(manFrom.pop());
      }
    }
  }
}
