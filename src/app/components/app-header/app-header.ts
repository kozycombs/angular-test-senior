import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_TITLE } from '../../constants/globalConsts';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  appTitle = APP_TITLE;
}
