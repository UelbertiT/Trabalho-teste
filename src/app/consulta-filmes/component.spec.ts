import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaFilmesComponent } from './consulta-filmes.component';
import { MovieService } from './consulta-filmes.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Filme } from './endereco.model';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

class MockMovieService {
  buscarFilme(titulo: string) {
    return of({
      Title: 'Filme Teste',
      Year: '2024',
      Genre: 'Ação',
      Director: 'Diretor Teste',
      Plot: 'Enredo do filme',
      Actors: 'Ator 1, Ator 2',
      Poster: 'http://exemplo.com/poster.jpg',
      Response: 'True'  // GARANTIR QUE A PROPRIEDADE 'Response' ESTÁ AQUI
    });
  }

  buscarFilmes(titulo: string) {
    return of([]);
  }
}


describe('ConsultaFilmesComponent', () => {
  let component: ConsultaFilmesComponent;
  let fixture: ComponentFixture<ConsultaFilmesComponent>;
  let movieService: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, HttpClientModule, ConsultaFilmesComponent],
      providers: [{ provide: MovieService, useClass: MockMovieService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultaFilmesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método buscarFilme do MovieService e definir o filme', () => {
    const filmeMock: Filme = {
      Title: 'Filme Teste',
      Year: '2024',
      Rated: 'PG-13',
      Released: '2024-01-01',
      Runtime: '120 min',
      Genre: 'Ação',
      Director: 'Diretor Teste',
      Writer: 'Escritor Teste',
      Actors: 'Ator 1, Ator 2',
      Plot: 'Enredo do filme',
      Language: 'Português',
      Awards: 'Nenhum',
      Poster: 'http://exemplo.com/poster.jpg',
      Ratings: [],
      Metascore: '70',
      imdbRating: '7.5',
      imdbVotes: '10000',
      imdbID: 'tt1234567',
      Type: 'movie',
      Response: 'True'
    };

    spyOn(movieService, 'buscarFilme').and.returnValue(of(filmeMock));

    component.titulo = 'Filme Teste';
    component.pesquisa();

    fixture.detectChanges();

    expect(movieService.buscarFilme).toHaveBeenCalledWith('Filme Teste');
    expect(component.filme).toEqual(filmeMock);
  });

  it('deve exibir o filme na tela após a pesquisa', () => {
    const filmeMock: Filme = {
      Title: 'Filme Teste',
      Year: '2024',
      Rated: 'PG-13',
      Released: '2024-01-01',
      Runtime: '120 min',
      Genre: 'Ação',
      Director: 'Diretor Teste',
      Writer: 'Escritor Teste',
      Actors: 'Ator 1, Ator 2',
      Plot: 'Enredo do filme',
      Language: 'Português',
      Awards: 'Nenhum',
      Poster: 'http://exemplo.com/poster.jpg',
      Ratings: [],
      Metascore: '70',
      imdbRating: '7.5',
      imdbVotes: '10000',
      imdbID: 'tt1234567',
      Type: 'movie',
      Response: 'True'
    };

    spyOn(movieService, 'buscarFilme').and.returnValue(of(filmeMock));

    component.titulo = 'Filme Teste';
    component.pesquisa();

    fixture.detectChanges();

    const filmeTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(filmeTitle.textContent).toContain('Filme Teste');
  });

  it('deve chamar favoritar() e atualizar o localStorage', () => {
    const filmeMock = {
      Title: 'Filme Teste',
      Year: '2024',
      Rated: 'PG-13',
      Released: '2024-01-01',
      Runtime: '120 min',
      Genre: 'Ação',
      Director: 'Diretor Teste',
      Writer: 'Escritor Teste',
      Actors: 'Ator 1, Ator 2',
      Plot: 'Enredo do filme',
      Language: 'Português',
      Awards: 'Nenhum',
      Poster: 'http://exemplo.com/poster.jpg',
      Ratings: [],
      Metascore: '70',
      imdbRating: '7.5',
      imdbVotes: '10000',
      imdbID: 'tt1234567',
      Type: 'movie',
      Response: 'True'
    };

    spyOn(movieService, 'buscarFilme').and.returnValue(of(filmeMock));

    component.titulo = 'Filme Teste';
    component.pesquisa();
    fixture.detectChanges();

    expect(component.filme).toEqual(filmeMock);

    const setItemSpy = spyOn(localStorage, 'setItem');

    component.favoritar();

    expect(setItemSpy).toHaveBeenCalledWith('filmesFav', jasmine.any(String));
  });

  it('deve mostrar a lista de favoritos ao chamar getFavoritos()', () => {
    const filmesFavoritosMock = {
      filmes: [
        { Title: 'Filme Teste 1' },
        { Title: 'Filme Teste 2' }
      ]
    };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(filmesFavoritosMock));

    component.getFavoritos();
    fixture.detectChanges();

    expect(component.favoritosList).toEqual(['Filme Teste 1', 'Filme Teste 2']);
  });
});
