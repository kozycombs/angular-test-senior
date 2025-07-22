import { Component } from '@angular/core';
import { AppHeader } from '../app-header/app-header';
import { AppFooter } from '../app-footer/app-footer';

@Component({
  selector: 'app-layout',
  imports: [AppHeader, AppFooter],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {}
