import {
  Component,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  Input
} from "@angular/core";
import { CardComponent } from "../card/card.component";
import { HandComponent } from "../hand/hand.component";

@Component({
  selector: "app-deck",
  templateUrl: "deck.component.html",
  styleUrls: ["deck.component.css"]
})
export class DeckComponent {
  @ViewChildren(CardComponent) private cardsCmps: QueryList<CardComponent>;
  @ViewChild("main", { static: false }) main: ElementRef;
  @Input() left: number;
  @Input() top: number;
  index = 0;

  cards = [];
  constructor() {
    for (let i = 0; i < 100; i++) {
      this.cards.push(true);
    }
  }

  hover: string = "none";
  spacing: number = 20;
  angleSpacing: number = 0;
  visible: boolean = false;
  angle: number = 0;
  leftOffset = 0.2;
  topOffset = -0.05;

  public giveCard(hand: HandComponent, callback) {
    const cards = this.cardsCmps["_results"];
    if (this.index >= cards.length) {
      return;
    }

    const card = cards.pop();
    hand.takeCard(card, () => {
      callback();
      cards[this.index++] = false;
    });
  }
}
