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
    TweenLite.to(div, 0.2, { y: "-=200",ease: "Power0.easeNone" });
  }

}
