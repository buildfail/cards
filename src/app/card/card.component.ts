import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  HostBinding
} from "@angular/core";
import { TweenLite, Sine } from "gsap";

@Component({
  selector: "app-card",
  templateUrl: "card.component.html",
  styleUrls: ["card.component.css"]
})
export class CardComponent implements OnInit {
  @ViewChild("pk", { static: false }) pk: ElementRef;
  @HostBinding("style.pointer-events") pointerEvents = "auto";
  @Input() destination: string = "center";
  @Input() hoverStyle: string = "none"; // top|down|left|right
  @Input() angle: number = 0;
  @Input() left: number = 0;
  @Input() top: number = 0;
  @Input() fliped: boolean = false;

  customStyle = {};

  ngOnInit() {
    if (this.angle && this.angle > 0) {
      this.customStyle = { transform: "rotate(" + this.angle + "deg)" };
    }
  }

  constructor() {}

  get cardImage() {
    if (this.fliped) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/English_pattern_jack_of_diamonds.svg/682px-English_pattern_jack_of_diamonds.svg.png";
    }
    return "https://cdn.shopify.com/s/files/1/0067/1124/6905/products/blue_ribbon_red_grande.png?v=1543433110";
  }

  public moveTo(targetTop, targetLeft, callback) {
    this.pointerEvents = "none";
    let viewportOffset = this.pk.nativeElement.getBoundingClientRect();

    let top = viewportOffset.top;
    let left = viewportOffset.left;

    const topDiff = targetTop - top;
    const leftDiff = targetLeft - left;

    let height = this.pk.nativeElement.offsetHeight;

    TweenLite.to(this.pk.nativeElement, 0.3, {
      y: topDiff + height / 2,
      x: leftDiff,
      ease: Sine.easeIn,
      onComplete: callback
    });
  }
}
