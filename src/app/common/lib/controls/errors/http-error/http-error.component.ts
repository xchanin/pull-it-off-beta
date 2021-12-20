import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericModalModel } from '../../../models/generic-modal.model';

@Component({
  selector: 'pio-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.scss']
})
export class HttpErrorComponent implements OnInit {

  @Input('message')
  public Message: string;

  @Input('title')
  public Title: string;

  constructor(@Inject(MAT_DIALOG_DATA) protected data: GenericModalModel) {
    
    this.Message = this.data.Data.Message;
    this.Title = this.data.Data.Title;
   }

  ngOnInit(): void {
  }

}
