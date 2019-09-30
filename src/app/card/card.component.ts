import { Component } from '@angular/core';
import { TweenLite } from 'gsap';


@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent {

  constructor() { }

  move(div) {
    TweenLite.to(div, 0.5, { duration:1, y: "-=100",ease: "Power2.easeOut" });
  }

}
