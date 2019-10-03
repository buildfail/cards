import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  playerLeftOffset = 35;
  centralOffset = 45;
  sideOffset = 30;
  cardSpacingFactor = 0.7;

  xPercent = 50;
  yPercent = 50;

  angleOffset = 4;

  cards = [1, 2, 3, 4, 1, 1, 1, 1];

  constructor() {}
}
