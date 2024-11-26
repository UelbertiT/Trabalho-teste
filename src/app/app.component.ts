import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConsultaFilmesComponent} from './consulta-filmes/consulta-filmes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsultaFilmesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trabalhoJuliane';


}
