using CalculadoraWebApi.Calculadora;
using Machine.Specifications;

namespace CalculadoraSpecs
{
    public class When_dividing_two_numbers
    {
        private static OperacionesDomainService _operaciones;
        private static decimal _result;

        Establish context = () =>
        {
            _operaciones = new OperacionesDomainService();
        };

        Because of = () =>
        {
            _result = _operaciones.Dividir(TestValues.FirstValue, TestValues.SecondValue);
        };

        It should_be_equal_to = () =>
        {
            decimal correctResult = TestValues.FirstValue / TestValues.SecondValue;
            _result.ShouldEqual(correctResult);
        };
    }
}
