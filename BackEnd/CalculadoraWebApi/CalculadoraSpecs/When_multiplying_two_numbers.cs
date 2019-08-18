using CalculadoraWebApi.Calculadora;
using Machine.Specifications;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalculadoraSpecs
{
    public class When_multiplying_two_numbers
    {
        private static OperacionesDomainService _operaciones;
        private static decimal _result;

        Establish context = () =>
        {
            _operaciones = new OperacionesDomainService();
        };

        Because of = () =>
        {
            _result = _operaciones.Multiplicar(TestValues.FirstValue, TestValues.SecondValue);
        };

        It should_be_equal_to = () =>
        {
            decimal correctResult = TestValues.FirstValue * TestValues.SecondValue;
            _result.ShouldEqual(correctResult);
        };
    }
}
