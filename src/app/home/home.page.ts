import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
  HostListener
} from "@angular/core";
import { HandComponent } from "../hand/hand.component";
import { DeckComponent } from "../deck/deck.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements AfterViewInit {
  @ViewChildren(HandComponent) private hands: QueryList<HandComponent>;
  @ViewChild(DeckComponent, { static: false }) private deck: DeckComponent;
  viewWidth = 0;
  viewHeight = 0;
  c = 0;
  constructor() {}

  ngAfterViewInit() {
    this.viewWidth = window.innerWidth;
    this.viewHeight = window.innerHeight;
  }

  @HostListener("click") onClick() {
    setInterval(() => {
      this.deck.giveCard(this.nextHand(), () => {});
    }, 100);
  }

  nextHand() {
    if (this.c >= this.hands["_results"].length) {
      this.c = 0;
    }
    return this.hands["_results"][this.c++];
  }
}
