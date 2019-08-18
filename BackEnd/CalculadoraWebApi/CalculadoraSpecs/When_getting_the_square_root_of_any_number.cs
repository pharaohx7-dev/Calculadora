using CalculadoraWebApi.Calculadora;
using Machine.Specifications;
using System;

namespace CalculadoraSpecs
{
    public class When_getting_the_square_root_of_any_number
    {
        private static OperacionesDomainService _operaciones;
        private static double _result;

        Establish context = () =>
        {
            _operaciones = new OperacionesDomainService();
        };

        Because of = () =>
        {
            _result = _operaciones.RaizCuadrada(TestValues.ThirdValue);
        };

        It should_be_equal_to = () =>
        {
            double correctResult = Math.Sqrt(TestValues.ThirdValue);
            _result.ShouldEqual(correctResult);
        };
    }
}
