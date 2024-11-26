import {Component, inject} from '@angular/core';
import {MovieService} from './consulta-filmes.service';
import {Filme} from './endereco.model';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-consulta-filmes',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './consulta-filmes.component.html',
  styleUrl: './consulta-filmes.component.css'
})
export class ConsultaFilmesComponent {
  titulo: string = '';
  filme: Filme ;
  showFavoritos: boolean = false;
  favoritosList:string[] =  []


  movieService = inject(MovieService);


  pesquisa() {
    this.showFavoritos = false;
    this.movieService.buscarFilme(this.titulo).subscribe({
      next: (data: Filme) => {
        console.log(data);
        this.filme = data;

      },
      error: (error: any) => {
        this.filme = null
      }
    });
  }

  favoritar(){
    let lastFavoritos = JSON.parse(localStorage.getItem('filmesFav'));
    if(lastFavoritos !== null){
      if(lastFavoritos.filmes.length > 0){
        lastFavoritos.filmes.push(this.filme);
        localStorage.setItem('filmesFav', JSON.stringify(lastFavoritos));
        return
      }
    }
    let data ={
      filmes:[
       this.filme
      ]
    }
    localStorage.setItem('filmesFav', JSON.stringify(data));
  }
  getFavoritos(){
    let lastFavoritos = JSON.parse(localStorage.getItem('filmesFav'));
    console.log(lastFavoritos);
    if(lastFavoritos !== null){
        this.showFavoritos = true;
      const uniqueArray = [...new Set(lastFavoritos.filmes.map(filmes => filmes.Title))];
        this.favoritosList = uniqueArray as string[];
    }
  }


  selectFavorito(title:string){
    this.titulo = title;
    this.pesquisa()
    this.showFavoritos = false;
  }
}


