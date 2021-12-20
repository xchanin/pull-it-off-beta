import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CursorModel } from '../../models/cursor.model';

declare let gsap: any;

@Component({
  selector: 'pio-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {
//  const mouse = document.querySelector('.cursor');
//  const mouseTxt = document.querySelector('.cursor-text');

  constructor() { }

  @Input('config')
  public Config: Array<CursorModel>;

  @ViewChild('CursorText')
  public CursorText: ElementRef;

  // tslint:disable-next-line:variable-name
  private _cursor: ElementRef;

  @ViewChild('Cursor', { static: false })
  public set Cursor(val: ElementRef) {
    this._cursor = val;
  }

  public get Cursor(): ElementRef {
    return this._cursor;
  }
  public CursorLabel: string;
  /**
   * Property to expand cursor on mouse click
   */
  public Expand: boolean;

  /**
   * Left position of cursor
   */
  public Left: string;

  /**
   * Top position of cursor
   */
  public Top: string;
 

  /**
   * Get current mouse position and translate that
   * to the cursor
   *
   * @param e mouse event
   */
  @HostListener('document:mousemove', ['$event'])
  protected onMouseMove(e: MouseEvent): void {

    this.Top = e.pageY + 'px';
    this.Left = e.pageX + 'px';
  }

  /**
   * Check what element the mouse is over, if it's a
   * targeted element, then add styles
   *
   * @param e mouse event
   */
  @HostListener('document:mouseover', ['$event'])
  protected onMouseOver(e: MouseEvent): void {

    this.CursorLabel = '';
    const item: any = e.target;

    for (const c of this.Config) {
      if (item.classList.contains(c.ElementIdentifier)) {
        this.Cursor.nativeElement.classList.add(c.Classlist);
      } else {
        this.Cursor.nativeElement.classList.remove(c.Classlist);
      }
    }

    // this.Config.forEach((c: CursorModel) => {

    //   if (item.classList.contains(c.ElementIdentifier)) {

    //     this.CursorLabel = c.Label;
    //     this.Cursor.nativeElement.classList.add(c.Classlist);

    //     /**
    //      * Move title-swipe up over title text
    //      */
    //     gsap.to('.title-swipe', 1, { y: '0%' });

    //     // this.CursorText.nativeElement.innerText = c.Label;
    //     this.CursorLabel = c.Label;

    //   } else {
    //     this.Cursor.nativeElement.classList.remove(c.Classlist);

    //     /**
    //      * Move title-swipe off title text
    //      */
    //     gsap.to('.title-swipe', 1, { y: '100%' });
    //   }
    // });

    // if (item.classList.contains('explore')) {
    //   this.Cursor.nativeElement.classList.add('explore-active');
    //   gsap.to('.title-swipe', 1, { y: '0%' });
    //   this.CursorText.nativeElement.innerText = 'Click';
    // } else {
    //     this.Cursor.nativeElement.classList.remove('explore-active');
    //     this.CursorText.nativeElement.innerText = '';
    //     gsap.to('.title-swipe', 1, { y: '100%' });
    // }
  }

  /**
   * Handle mouse click
   * 
   * @param $event mouse event
   */
  @HostListener('document:click', ['$event'])
  onClick($event: MouseEvent): void {
     this.Expand = true;
     setTimeout(() => {
      this.Expand = false;
     }, 500);
 }

  ngOnInit(): void {

  }
}
