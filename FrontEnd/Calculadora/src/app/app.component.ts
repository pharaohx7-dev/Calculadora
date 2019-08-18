import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalculadoraService } from './calculadora.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly calculadoraService: CalculadoraService) {}
  pantalla = new FormControl('0');
  operacion: '+' | '-' | '*' | '/';
  private primerValor = 0;
  private segundoValor = 0;

  mostrarValorEnPantalla(valor: string): void {
    const valorActualEnPantalla: string = this.pantalla.value;
    const valorEnPantallaEsNumerico: boolean = (/^\d+$/.test(valorActualEnPantalla));
    const valorIngresadoEsNumerico: boolean = (/^\d+$/.test(valor));

    if (valorEnPantallaEsNumerico && valorActualEnPantalla !== '0') {
      this.pantalla.setValue(`${this.pantalla.value}${valor}`);
    } else if (valorEnPantallaEsNumerico && !valorIngresadoEsNumerico && valorActualEnPantalla === '0') {
      this.pantalla.setValue(`${this.pantalla.value}${valor}`);
    } else if (valorIngresadoEsNumerico && valorActualEnPantalla.includes('.') && valorActualEnPantalla !== '0') {
      this.pantalla.setValue(`${this.pantalla.value}${valor}`);
    } else if (!valorIngresadoEsNumerico && valorActualEnPantalla.includes('.')) {
      return;
    } else if (!valorEnPantallaEsNumerico && !valorIngresadoEsNumerico) {
      return;
    } else if (valorActualEnPantalla === '0' || !valorEnPantallaEsNumerico) {
      this.pantalla.setValue(valor);
    }
  }

  limpiarPantalla(): void {
    this.primerValor = 0;
    this.segundoValor = 0;
    this.pantalla.reset('0');
  }

  async especificarOperacion(operacion: '+' | '-' | '*' | '/'): Promise<void> {
    if (!this.primerValor) {
      this.primerValor = Number(this.pantalla.value);
    } else {
      this.primerValor = await this.calcularResultado();
    }

    this.operacion = operacion;
    this.pantalla.setValue(operacion);
  }

  async calcularRaizCuadrada(): Promise<void> {
    if (this.pantalla.value === '0' || this.esUnaOperacion()) { return; }

    const valorActual = Number(this.pantalla.value);
    const resultado = await this.calculadoraService.raizCuadrada(valorActual).toPromise();
    this.pantalla.setValue(`${resultado}`);
  }

  async calcularExponencial(): Promise<void> {
    if (this.pantalla.value === '0' || this.esUnaOperacion()) { return; }

    const valorActual = Number(this.pantalla.value);
    const resultado = await this.calculadoraService.exponencial(valorActual).toPromise();
    this.pantalla.setValue(`${resultado}`);
  }

  async calcularResultado(): Promise<number> {
    if (!this.primerValor) {
      return;
    } else {
      this.segundoValor = Number(this.pantalla.value);
    }

    const n1 = Number(this.primerValor);
    const n2 = Number(this.segundoValor);
    let resultado = 0;

    switch (this.operacion) {
      case '+': {
        resultado = await this.calculadoraService.sumar(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
      case '-': {
        resultado = await this.calculadoraService.restar(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
      case '*': {
        resultado = await this.calculadoraService.multiplicar(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
      case '/': {
        resultado = await this.calculadoraService.dividir(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
    }

    this.primerValor = 0;
    this.segundoValor = 0;
    return resultado;
  }

  private esUnaOperacion(): boolean {
    if (this.pantalla.value === '+' ||
      this.pantalla.value === '-' ||
      this.pantalla.value === '*' ||
      this.pantalla.value === '/') {
        return true;
    }
    return false;
  }
}
