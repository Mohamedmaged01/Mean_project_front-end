import { Component } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  imports: [SidebarComponent,RouterLink],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {

}
