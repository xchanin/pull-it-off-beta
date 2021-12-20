import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SlideModel } from '../../models/slide.model';
import { SlidesService } from '../../services/slides.service';

declare let ScrollMagic: any;
@Component({
  selector: 'pio-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit, AfterViewInit {

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
  // public Children: QueryList<ElementRef>;

  protected controller: any;

  protected slideScene: any;

  protected pageScene: any;

  protected detailScene: any;

  constructor() { }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {

    // this.Children.changes.subscribe((r: any) => {
    //   SlidesService.Animate(this.Children);
    // });

    this.controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll(".detail-slide");

    slides.forEach((slide, index, slides) => {
      const slideTl = gsap.timeline({ defaults: { duration: 1 } });
      let nextSlide: any = slides.length - 1 === index ? "end" : slides[index + 1];
      const nextImg = nextSlide.querySelector("img");
      slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
      slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
      slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
      //Scene
      this.detailScene = new ScrollMagic.Scene({
        triggerElement: slide,
        duration: "100%",
        triggerHook: 0
      })
        .setPin(slide, { pushFollowers: false })
        .setTween(slideTl)
        // .addIndicators({
        //   colorStart: "white",
        //   colorTrigger: "white",
        //   name: "detailScene"
        // })
        .addTo(this.controller);
    });
  }

}
