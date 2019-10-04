import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  HostListener
} from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component({
  selector: "app-deck",
  templateUrl: "deck.component.html",
  styleUrls: ["deck.component.css"]
})
export class DeckComponent implements OnInit, AfterViewInit {
  @ViewChildren(CardComponent) private cardsCmps: QueryList<CardComponent>;
  cards = [];
  ngOnInit() {}
  constructor() {
    for (let i = 0; i < 100; i++) {
      this.cards.push(i);
    }
  }

  @ViewChild("main", { static: false }) main: ElementRef;
  hover: string = "none";
  spacing: number = 20;
  angleSpacing: number = 0;
  visible: boolean = false;
  angle: number = 0;
  initialLeft = 0;
  initialTop = 0;
  leftOffset = 0.2;
  topOffset = -0.05;

  ngAfterViewInit() {
    const rect = this.main.nativeElement.getBoundingClientRect();
    this.initialLeft = rect.left;
    this.initialTop = rect.top;
  }

  @HostListener("click") onClick() {
    const ccmps = this.cardsCmps['_results'];
    for (let i in ccmps) {
      ccmps[i].playCard();
    }
  }
}
