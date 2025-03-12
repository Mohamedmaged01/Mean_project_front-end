import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customerdetails',
  imports: [SidebarComponent,RouterLink],
  templateUrl: './customerdetails.component.html',
  styleUrl: './customerdetails.component.css'
})
export class CustomerdetailsComponent {

}
