import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Filme} from './endereco.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private readonly baseUrl = 'http://www.omdbapi.com/?apikey=95addafa';

  private httpClient: HttpClient = inject(HttpClient);

  buscarFilme(titulo: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}&t=${titulo}&plot=full&r=json`);
  }

  buscarFilmes(titulo: string, pagina: number = 1): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}&s=${titulo}&page=${pagina}&r=json`);
  }
}
