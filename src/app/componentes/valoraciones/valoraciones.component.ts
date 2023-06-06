import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/review.model';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent {
  @Input() review!: Review;
  @Input() index!: number;
  @Input() user!: string;
}
