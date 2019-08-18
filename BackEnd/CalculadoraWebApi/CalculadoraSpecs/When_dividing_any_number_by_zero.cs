using CalculadoraWebApi.Calculadora;
using Machine.Specifications;
using System;

namespace CalculadoraSpecs
{
    public class When_dividing_any_number_by_zero
    {
        private static OperacionesDomainService _operaciones;
        private static Exception exception;

        Establish context = () =>
        {
            _operaciones = new OperacionesDomainService();
        };

        Because of = () =>
        {
            exception = Catch.Exception(() => _operaciones.Dividir(TestValues.FirstValue, 0));
        };

        It should_fail = () =>
        {
            exception.ShouldBeOfExactType<DivideByZeroException>();
        };


        It should_have_a_specific_reason = () =>
        {
            exception.Message.ShouldContain("No se puede dividir ningun numero entre 0.");
        };
    }
}
