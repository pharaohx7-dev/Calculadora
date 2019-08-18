import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CalculadoraService {
  constructor(private readonly htttp: HttpClient) {}
  private baseUri = 'http://localhost:58150/operaciones';

  sumar(n1: number, n2: number): Observable<number> {
    return this.htttp.get<number>(`${this.baseUri}/sumar?n1=${n1}&n2=${n2}`);
  }

  restar(n1: number, n2: number): Observable<number> {
    return this.htttp.get<number>(`${this.baseUri}/restar?n1=${n1}&n2=${n2}`);
  }

  multiplicar(n1: number, n2: number): Observable<number> {
    return this.htttp.get<number>(`${this.baseUri}/multiplicar?n1=${n1}&n2=${n2}`);
  }

  dividir(n1: number, n2: number): Observable<number> {
    return this.htttp.get<number>(`${this.baseUri}/dividir?n1=${n1}&n2=${n2}`);
  }

  raizCuadrada(n1: number): Observable<number> {
    return this.htttp.get<number>(`${this.baseUri}/raizCuadrada?n1=${n1}`);
  }

  exponencial(n1: number): Observable<number> {
    return this.htttp.get<number>(`${this.baseUri}/exponencial?n1=${n1}`);
  }
}
