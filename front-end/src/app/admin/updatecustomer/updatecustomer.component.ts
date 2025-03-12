import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-updatecustomer',
  imports: [SidebarComponent,RouterLink],
  templateUrl: './updatecustomer.component.html',
  styleUrl: './updatecustomer.component.css'
})
export class UpdatecustomerComponent {

}
