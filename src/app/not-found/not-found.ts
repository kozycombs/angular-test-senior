import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  @Input() message: string = 'Page not found!';
  @Input() actionLabel: string = 'View our list of vehicles';
  @Input() actionUrl: string = '';
}
