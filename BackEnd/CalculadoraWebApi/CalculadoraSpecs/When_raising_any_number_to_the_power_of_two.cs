using CalculadoraWebApi.Calculadora;
using Machine.Specifications;
using System;

namespace CalculadoraSpecs
{
    public class When_raising_any_number_to_the_power_of_two
    {
        private static OperacionesDomainService _operaciones;
        private static double _result;

        Establish context = () =>
        {
            _operaciones = new OperacionesDomainService();
        };

        Because of = () =>
        {
            _result = _operaciones.Exponencial(TestValues.ThirdValue);
        };

        It should_be_equal_to = () =>
        {
            double correctResult = Math.Pow(TestValues.ThirdValue, 2);
            _result.ShouldEqual(correctResult);
        };
    }
}
