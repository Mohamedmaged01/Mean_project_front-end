import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  days: number = 3;
  hours: number = 23;
  minutes: number = 19;
  seconds: number = 56;

  ngOnInit() {
    setInterval(() => {
      if (this.seconds > 0) this.seconds--;
      else {
        this.seconds = 59;
        if (this.minutes > 0) this.minutes--;
        else {
          this.minutes = 59;
          if (this.hours > 0) this.hours--;
          else {
            this.hours = 23;
            if (this.days > 0) this.days--;
          }
        }
      }
    }, 1000);
  }
}
