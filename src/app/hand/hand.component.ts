import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component({
  selector: "app-hand",
  templateUrl: "hand.component.html",
  styleUrls: ["hand.component.css"]
})
export class HandComponent implements OnInit {
  @ViewChild("main", { static: false }) main: ElementRef;
  @Input() cards: CardComponent[] = [];
  @Input() layout: string = "horizontal"; // horizontal|vertical;
  @Input() hover: string = "none";
  @Input() spacing: number = 4;
  @Input() angleSpacing: number = 0;
  @Input() visible: boolean = false;
  @Input() leftOffset: number;
  @Input() topOffset: number;

  angle: number = 0;
  leftOffsetStep = 0;
  topOffsetStep = 0;

  constructor() {}

  ngOnInit() {
    if (this.layout === "horizontal") {
      this.leftOffsetStep = this.spacing;
    }

    if (this.layout === "vertical") {
      this.topOffsetStep = this.spacing;
      this.angle = 90;
    }
  }

  getLeftOffset(index) {
    let offset = this.leftOffset + index * this.leftOffsetStep;
    return offset;
  }

  getTopOffset(index) {
    return this.topOffset + index * this.topOffsetStep;
  }

  public takeCard(card: CardComponent, callback) {
    const offsets = this.getOffsets();
    card.moveTo(offsets.top, offsets.left, card => {
      this.cards.push(card);
      callback();
    });
  }

  public getOffsets() {
    return { top: this.topOffset, left: this.leftOffset };
  }

  public addCard(card: CardComponent) {
    this.cards.push(card);
  }
}
