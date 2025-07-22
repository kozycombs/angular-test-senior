import { Component } from '@angular/core';
import { APP_TITLE } from '../../constants/globalConsts';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.scss',
})
export class AppFooter {
  appTitle = APP_TITLE;
  year = new Date().getFullYear();
}
