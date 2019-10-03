import {
  Component,
  Input,
  HostListener,
  ElementRef,
  ViewChild,
  HostBinding,
  OnInit
} from "@angular/core";
import { TweenLite, TweenMax, Sine, Power0 } from "gsap";

@Component({
  selector: "app-card",
  templateUrl: "card.component.html",
  styleUrls: ["card.component.css"]
})
export class CardComponent implements OnInit {
  @HostBinding("style.pointer-events") pointerEvents = "auto";
  @ViewChild("pk", { static: false }) pk: ElementRef;

  @Input() xOffset: number;
  @Input() yOffset: number;
  @Input() hoverStyle: string; // hover-top|hover-down|hover-left|hover-right
  @Input() angle: number;
  customStyle = {};

  ngOnInit() {
    if (this.angle) {
      this.customStyle = { transform: "rotate(" + this.angle + "deg)" };
    }
  }
  constructor() {}

  @HostListener("click") onClick() {
    let viewportOffset = this.pk.nativeElement.getBoundingClientRect();
    let targetY = 0;
    if (viewportOffset.top > window.innerHeight / 2) {
      targetY = viewportOffset.top - window.innerHeight / 2;
      targetY = -targetY;
    } else {
      targetY = window.innerHeight / 2 - viewportOffset.top;
    }

    let targetX = 0;
    if (viewportOffset.left > window.innerWidth / 2) {
      targetX = viewportOffset.left - window.innerWidth / 2;
      targetX = -targetX;
    } else {
      targetX = window.innerWidth / 2 - viewportOffset.left;
    }

    let width = this.pk.nativeElement.offsetWidth;
    let height = this.pk.nativeElement.offsetHeight;

    const xoff = Math.floor(Math.random() * 1000) % 30;
    const yoff = Math.floor(Math.random() * 1000) % 30;
    const rotoff = Math.floor(Math.random() * 1000) % 180;
    TweenMax.to(this.pk.nativeElement, 0.2, {
      x: targetX - width / 2 + xoff,
      y: targetY - height / 2 + yoff,
      ease: Power0.ease
    });
    TweenLite.to(this.pk.nativeElement, .2, {
      rotation: rotoff,
      transformOrigin: "left 50%"
    });
    this.pointerEvents = "none";
  }

  convertRemToPx(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }
}
