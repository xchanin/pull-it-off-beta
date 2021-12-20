import { ElementRef, Input, Renderer2 } from '@angular/core';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[pioMouseMove]'
})
export class MouseMoveDirective {

  private _elementList: Array<string>;

  @Input('element-list')
  public set ElementList(val: Array<string>) {
    this._elementList = val;
  }

  public get ElementList(): Array<string> {
    return this._elementList;
  }

  protected xAxis: number;
  protected yAxis: number;
  protected card: HTMLElement;
  protected container: HTMLElement;
  protected title: HTMLElement;
  protected image: HTMLElement;
  protected purchase: HTMLElement;
  protected sizes: HTMLElement;
  protected description: HTMLElement;

  @HostListener('click', ['$event'])
  protected onLoad(e: any): void {
    debugger;
  }

  @HostListener('mousemove', ['$event'])
  protected onMouseMove(e: MouseEvent): void {

    this.xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    this.yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    this.card = document.querySelector('.card');
    this.container = document.querySelector('.container');
    this.title = document.querySelector('.title');
    this.image = document.querySelector('.image img');
    this.purchase = document.querySelector('.purchase');
    this.sizes = document.querySelector('.sizes');
    this.description = document.querySelector('.description');

    this.card.style.transform = `rotateY(${this.xAxis}deg) rotate(${this.yAxis}deg)`;
  }

  @HostListener('mouseover', ['$event'])
  protected onMouseOver(e: MouseEvent): void {

    this.card = document.querySelector('.card');
    this.container = document.querySelector('.container');
    this.title = document.querySelector('.title');
    this.image = document.querySelector('.image img');
    this.purchase = document.querySelector('.purchase');
    this.sizes = document.querySelector('.sizes');
    this.description = document.querySelector('.description');

    this.card.style.transition = 'none';
    this.title.style.transform = 'translateZ(150px)';
    this.image.style.transform = 'translateZ(200px) rotateZ(-45deg)';
    this.purchase.style.transform = 'translateZ(125px)';
    this.sizes.style.transform = 'translateZ(100px)';
    this.description.style.transform = 'translateZ(150px)';
  }

  @HostListener('mouseout', ['$event'])
  protected onMouseOut(e: MouseEvent): void {

    this.card.style.transition = 'all 0.5s ease';
    this.card.style.transform = `rotateY(0deg) rotate(0deg)`;
    this.title.style.transform = 'translateZ(0px)';
    this.image.style.transform = 'translateZ(0px)';
    this.purchase.style.transform = 'translateZ(0px)';
    this.sizes.style.transform = 'translateZ(0px)';
    this.description.style.transform = 'translateZ(0px)';
  }

  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2) {
    }

}
