import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayout } from './components/layout/app-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-test-senior');
}
