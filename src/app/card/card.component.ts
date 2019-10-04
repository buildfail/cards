import {
  Component,
  Input,
  HostListener,
  ElementRef,
  ViewChild,
  HostBinding,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { TweenLite, TweenMax, Sine, Power0 } from "gsap";

@Component({
  selector: "app-card",
  templateUrl: "card.component.html",
  styleUrls: ["card.component.css"]
})
export class CardComponent implements OnInit, AfterViewInit {
  @HostBinding("style.pointer-events") pointerEvents = "auto";
  @ViewChild("pk", { static: false }) pk: ElementRef;

  @Input() destination: string = "center";
  @Input() hoverStyle: string = "none"; // top|down|left|right
  @Input() angle: number = 0;
  @Input() left: number = 0;
  @Input() top: number = 0;
  @Input() fliped: boolean = false;

  animationSpeed = 0.4;
  customStyle = {};

  ngOnInit() {
    if (this.angle && this.angle > 0) {
      this.customStyle = { transform: "rotate(" + this.angle + "deg)" };
    }
  }

  ngAfterViewInit() {
    this.pk.nativeElement.draggable = false;
  }
  constructor() {}

  @HostListener("click") onClick() {
    if (this.destination === "center") {
      this.playCard();
    }
    this.pointerEvents = "none";
  }

  get cardImage() {
    if (this.fliped) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/English_pattern_jack_of_diamonds.svg/682px-English_pattern_jack_of_diamonds.svg.png";
    }
    return "https://cdn.shopify.com/s/files/1/0067/1124/6905/products/blue_ribbon_red_grande.png?v=1543433110";
  }

  public playCard() {
    this.fliped = true;
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
    TweenMax.to(this.pk.nativeElement, this.animationSpeed, {
      x: targetX - width / 2 + xoff,
      y: targetY - height / 2 + yoff,
      ease: Power0.ease
    });
    TweenLite.to(this.pk.nativeElement, this.animationSpeed, {
      rotation: rotoff,
      transformOrigin: "left 50%"
    });
  }
}
