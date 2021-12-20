import { Component, OnInit } from '@angular/core';

declare let Calendly: any;

@Component({
  selector: 'pio-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  //   Calendly.initBadgeWidget(
  //     { 
  //       url: 'https://calendly.com/pullitoffllc/event-test', 
  //       text: 'Schedule a time', 
  //       color: '#0069ff', 
  //       textColor: '#ffffff', 
  //       branding: false 
  //     });
  }

  public Schedule(): void {
    Calendly.showPopupWidget(
      'https://calendly.com/pullitoffllc/event-test'
    )
  }
}
