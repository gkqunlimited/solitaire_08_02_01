export class Card {
    rank: number;
    suit: string;
    color: string;
    isFaceUp: boolean;

    constructor(rank: number, suit: string, isFaceUp: boolean) {
        this.rank = rank;
        this.suit = suit;
        this.isFaceUp = isFaceUp;
        this.getColor();
    }

    ngOnInit() {
    }
   
    card(): string {
        if (this.isFaceUp) {
            let ranks: string;
            switch (this.rank) {
                case 1: ranks = "A";
                        break;
                case 11: ranks = "J";
                         break;
                case 12: ranks = "Q";
                         break;
                case 13: ranks = "K";
                         break;
                default: ranks=this.rank.toString();                           
            }
            return "../assets/" + ranks + this.suit + ".png";
        } else {
            return "../assets/cover.png";
        }
    }

    getColor(): void {
        if (this.suit === "clubs" || this.suit === "spades") {
            this.color = "black";
        } else {
            this.color = "red";
        }
    }
}