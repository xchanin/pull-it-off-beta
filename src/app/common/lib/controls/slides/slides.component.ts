import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { setTimeout } from 'timers';
import { SlideModel } from '../../models/slide.model';
import { gsap } from 'gsap';
import { SlidesService } from '../../services/slides.service';
// declare let gsap: any;
declare let ScrollMagic: any;

@Component({
  selector: 'pio-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})

export class SlidesComponent implements OnInit, AfterViewInit  {

  private _config: Array<SlideModel>;

  @Input('config')
  set Config(val: Array<SlideModel>) {
    if (!val) { return }

    this._config = val;
  }

  get Config(): Array<SlideModel> {
    return this._config;
  }

  @ViewChildren('SlideChild')
  public Children: QueryList<ElementRef>;

  constructor() { }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {

    this.Children.changes.subscribe((r: any) => {
      SlidesService.Animate(this.Children);
    });
  }
}
