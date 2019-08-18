using Microsoft.AspNetCore.Mvc;
using System;

namespace CalculadoraWebApi.Calculadora
{
    [Route("operaciones")]
    public class CalculadoraController : Controller
    {
        private readonly OperacionesDomainService _operaciones;

        public CalculadoraController(OperacionesDomainService operaciones)
        {
            _operaciones = operaciones;
        }

        [HttpGet("sumar")]
        public IActionResult Sumar([FromQuery] decimal n1, decimal n2)
        {
            decimal resultado = _operaciones.Sumar(n1, n2);
            return Ok(resultado);
        }

        [HttpGet("restar")]
        public IActionResult Restar([FromQuery] decimal n1, decimal n2)
        {
            decimal resultado = _operaciones.Restar(n1, n2);
            return Ok(resultado);
        }

        [HttpGet("multiplicar")]
        public IActionResult Multiplicar([FromQuery] decimal n1, decimal n2)
        {
            decimal resultado = _operaciones.Multiplicar(n1, n2);
            return Ok(resultado);
        }

        [HttpGet("dividir")]
        public IActionResult Dividir([FromQuery] decimal n1, decimal n2)
        {
            decimal resultado = 0;
            try
            {
                resultado = _operaciones.Dividir(n1, n2);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(resultado);
        }

        [HttpGet("raizCuadrada")]
        public IActionResult RaizCuadrada([FromQuery] double n1)
        {
            double resultado = _operaciones.RaizCuadrada(n1);
            return Ok(resultado);
        }

        [HttpGet("exponencial")]
        public IActionResult Exponencial([FromQuery] double n1)
        {
            double resultado = _operaciones.Exponencial(n1);
            return Ok(resultado);
        }
    }
}
