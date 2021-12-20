import { ElementRef, Injectable, QueryList } from '@angular/core';

declare let ScrollMagic: any;

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  protected static controller: any;
  // protected static children: QueryList<ElementRef>;
  protected static pageScene: any;
  protected static slideScene: any;

  constructor() {}

  public static Animate(childrenList: QueryList<ElementRef>): void {

    /**
     * Initialize scrollmagic controller
     */
    this.controller = new ScrollMagic.Controller();

    const children: Array<ElementRef> = childrenList.toArray();

    children.forEach((slide: ElementRef, index: number, slides: Array<any> ) => {

      const revealImg: HTMLElement = (slide.nativeElement as HTMLElement).querySelector('.reveal-img');
      const img: HTMLElement = (slide.nativeElement as HTMLElement).querySelector('img');
      const revealText: HTMLElement = (slide.nativeElement as HTMLElement).querySelector('.reveal-text');
    // });

    // Array.from(this.Slides.nativeElement.children).forEach((slide: HTMLElement, index: number, slides: Array<any> ) => {
    // debugger;
    // const revealImg: HTMLElement = slide.querySelector('.reveal-img');
    // const img: HTMLElement = slide.querySelector('img');
    // const revealText: HTMLElement = slide.querySelector('.reveal-text');
      // const revealImg: HTMLElement = (slide.nativeElement as HTMLElement).querySelector('.reveal-img');
      // const img: HTMLElement = (slide.nativeElement as HTMLElement).querySelector('img');
      // const revealText: HTMLElement = (slide.nativeElement as HTMLElement).querySelector('.reveal-text');

      const slideTl = gsap.timeline({
        defaults: { duration: 1, ease: 'power2.inOut' }
      });

      slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' });
      slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1');
      slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75');

      /**
       * Create slide scene
       */
      this.slideScene = new ScrollMagic.Scene({
      triggerElement: slide.nativeElement,
      triggerHook: 0.25,
      reverse: false
      })
    /**
     * Pass in the timeline we created above
     */
    .setTween(slideTl)
    // .addIndicators(
    //     {
    //         colorStart: 'white',
    //         colorTrigger: 'white',
    //         name: 'slide'
    // })
    .addTo(this.controller);

      /**
       * New animation
       */
      const pageTl = gsap.timeline();

      /**
       * Get the next slide down
       */
      let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];

      /**
       * Move the next slide down for a moment
       */
      pageTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' });

      /**
       * Animate current slide
       */
      pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });

      /**
       * Reverse the animation for the next slide
       */
      pageTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=0.5');

      /**
       * Create new scene
       */
      this.pageScene = new ScrollMagic.Scene( 
          {
              triggerElement: slide.nativeElement,
              /**
               * duration lasts the whole height of the slide
               */
              duration: '100%',
              triggerHook: 0 
          }
      )
        // .addIndicators(
        //     {
        //     colorStart: 'white',
        //     colorTrigger: 'white',
        //     name: 'page',
        //     indent: 200
        // })
        .setPin(slide.nativeElement, { pushFollowers: false })
        .setTween(pageTl)
        .addTo(this.controller)
      });
      /**
       * ^^^^^^^^^^^^^^^^^^^^^^
       * end getSlides()
       */
    }
}
