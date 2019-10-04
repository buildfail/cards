import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "app-hand",
  templateUrl: "hand.component.html",
  styleUrls: ["hand.component.css"]
})
export class HandComponent implements OnInit, AfterViewInit {
  @ViewChild("main", { static: false }) main: ElementRef;
  @Input() cards: any[];
  @Input() layout: string = "horizontal"; // horizontal|vertical;
  @Input() hover: string = "none";
  @Input() spacing: number = 20;
  @Input() angleSpacing: number = 0;
  @Input() visible: boolean = false;
  angle: number = 0;
  initialLeft = 0;
  initialTop = 0;
  leftOffset = 0;
  topOffset = 0;

  ngOnInit() {
    if (this.layout === "horizontal") {
      this.leftOffset = this.spacing;
    }

    if (this.layout === "vertical") {
      this.topOffset = this.spacing;
      this.angle = 90;
    }
  }
  ngAfterViewInit() {
    const rect = this.main.nativeElement.getBoundingClientRect();
    this.initialLeft = rect.left;
    this.initialTop = rect.top;
  }
  constructor() {}
}
