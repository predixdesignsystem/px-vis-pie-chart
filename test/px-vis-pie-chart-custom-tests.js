// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here
  var pie = document.getElementById('pie'),
      donut = document.getElementById('donut');
  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Pie tests', function() {

    test('register horizontal position', function() {
        var svg = Polymer.dom(donut.root).querySelector('px-vis-svg'),
            register = Polymer.dom(donut.root).querySelector('px-vis-register'),
            svgRect = svg.getBoundingClientRect(),
            regRect = register.getBoundingClientRect();

        assert.equal(regRect.bottom, svgRect.top);

    });

    test('register vertical position', function() {
        var svg = Polymer.dom(pie.root).querySelector('px-vis-svg'),
            register = Polymer.dom(pie.root).querySelector('px-vis-register'),
            svgRect = svg.getBoundingClientRect(),
            regRect = register.getBoundingClientRect();

        assert.equal(regRect.left, svgRect.right);

    });

    test('get hide class', function() {
      assert.equal('u-ml- visuallyhidden', pie._calcRegisterClass(true));
      assert.equal('u-ml- ', pie._calcRegisterClass(false));
    });

  });
};
