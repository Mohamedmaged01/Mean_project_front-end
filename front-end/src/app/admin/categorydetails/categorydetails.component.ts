import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-categorydetails',
  imports: [SidebarComponent,RouterLink,NgIf],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.css'
})
export class CategorydetailsComponent implements OnInit {
  isViewMode: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isViewMode = params['view'] === 'view'; 
    });
  }
}
