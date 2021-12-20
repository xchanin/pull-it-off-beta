import { Component, OnInit } from '@angular/core';
import { SlideModel } from '../../models/slide.model';

@Component({
  selector: 'pio-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public SlideConfig: Array<SlideModel>;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.setupSlideConfig();
    }, 1000);
  }

  protected setupSlideConfig(): void {
    this.SlideConfig = [
      {
        ButtonLabel: 'Button Label',
        Detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa animi veritatis libero adipisci quaerat id odit repudiandae illum expedita enim?',
        Image: './assets/images/test/forest.png',
        ImageAlt: 'Slide image one',
        ImageClasslist: ['reveal-img'],
        SubTitle: 'Subtitle value',
        SubTitleClasslist: ['mountain-span'],
        Title: 'Lorem, ipsum dolor',
        TitleSwipeColor: 't-swipe1'
      },
      {
        ButtonLabel: 'Button Label Two',
        Detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium laboriosam eveniet modi labore quos officiis sapiente tempora amet ratione rerum.',
        Image: './assets/images/test/hike.png',
        ImageAlt: 'Slide image two',
        ImageClasslist: ['reveal-img'],
        SubTitle: 'Subtitle value',
        SubTitleClasslist: ['hike-span'],
        Title: 'Lorem, ipsum dolor',
        TitleSwipeColor: 't-swipe2'
      },
      {
        ButtonLabel: 'Button Label Two',
        Detail: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime illum quibusdam soluta explicabo minima libero error quis sequi rem consectetur.',
        Image: './assets/images/test/fashion.png',
        ImageAlt: 'Slide image two',
        ImageClasslist: ['reveal-img'],
        SubTitle: 'Subtitle value',
        SubTitleClasslist: ['fashion-span'],
        Title: 'Lorem, ipsum dolor',
        TitleSwipeColor: 't-swipe3'
      }
    ];
  }

}
