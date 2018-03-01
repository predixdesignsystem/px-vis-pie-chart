document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function runCustomTests() {

  var pie,
      donut;
  var expected_data = [{
    "x":15,
    "y":"IPA",
    "colorIndex":0,
    "percentage":"26",
    "backgroundColor":"rgb(90,191,248)"
  },{
    "x":1,
    "y":"Pils",
    "colorIndex":1,
    "percentage":"2",
    "backgroundColor":"rgb(226,141,23)"
  },{
    "x":1,
    "y":"Lager",
    "colorIndex":2,
    "percentage":"2",
    "backgroundColor":"rgb(123,188,0)"
  },{
    "x":8,
    "y":"Lambic",
    "colorIndex":3,
    "percentage":"14",
    "backgroundColor":"rgb(166,119,239)"
  },{
    "x":12,
    "y":"Stout",
    "colorIndex":4,
    "percentage":"21",
    "backgroundColor":"rgb(255,160,118)"
  },{
    "x":7,
    "y":"Pale Ale",
    "colorIndex":5,
    "percentage":"12",
    "backgroundColor":"rgb(97,132,255)"
  },{
    "x":9,
    "y":"Porter",
    "colorIndex":6,
    "percentage":"16",
    "backgroundColor":"rgb(219,106,188)"
  },{
    "x":4,
    "y":"Heffeweisse",
    "colorIndex":7,
    "percentage":"7",
    "backgroundColor":"rgb(77,151,139)"
  }];
  var expected_register = [{
    "x":15,
    "y":"IPA",
    "colorIndex":0,
    "percentage":"26",
    "backgroundColor":"rgb(90,191,248)"
  },{
      "x":12,
      "y":"Stout",
      "colorIndex":4,
      "percentage":"21",
      "backgroundColor":"rgb(255,160,118)"
    },{
      "x":9,
      "y":"Porter",
      "colorIndex":6,
      "percentage":"16",
      "backgroundColor":"rgb(219,106,188)"
    },{
      "x":8,
      "y":"Lambic",
      "colorIndex":3,
      "percentage":"14",
      "backgroundColor":"rgb(166,119,239)"
    },{
      "x":7,
      "y":"Pale Ale",
      "colorIndex":5,
      "percentage":"12",
      "backgroundColor":"rgb(97,132,255)"
    },{
      "x":4,
      "y":"Heffeweisse",
      "colorIndex":7,
      "percentage":"7",
      "backgroundColor":"rgb(77,151,139)"
    },{
      "x":1,
      "y":"Pils",
      "colorIndex":1,
      "percentage":"2",
      "backgroundColor":"rgb(226,141,23)"
    },{
      "x":1,
      "y":"Lager",
      "colorIndex":2,
      "percentage":"2",
      "backgroundColor":"rgb(123,188,0)"
    }];

  suiteSetup(function(done) {
    var aj = document.getElementById('aj');

    aj.addEventListener('last-response-changed', function() {
      pie = document.getElementById('pie');
      donut = document.getElementById('donut');

      setTimeout(function() { done(); }, 500);
    });

    aj.generateRequest();

  });

  suite('Pie tests', function() {
    test('pie is created', function() {
      assert.isTrue(pie !== null);
    });

    test('internalData is correct', function() {
      // Safari 10 puts a space in rgb, so need to get rid of it
      var dataClone = JSON.parse(JSON.stringify(pie._internalChartData));

      dataClone.forEach(function(item) {
        item.backgroundColor = item.backgroundColor.split(' ').join('');
      });

      assert.isFalse(pie._empty);
      assert.equal(pie._total, 57);
      assert.equal(pie._internalChartData.length, 8);
      assert.deepEqual(dataClone, expected_data);
    });

    test('internalRegisterData is correct', function() {
      var dataClone = JSON.parse(JSON.stringify(pie._internalRegisterData));

      dataClone.forEach(function(item) {
        item.backgroundColor = item.backgroundColor.split(' ').join('');
      });

      assert.equal(pie._internalRegisterData.length, 8);
      assert.deepEqual(dataClone, expected_register);
    });

    test('units is correct', function() {
      assert.equal(pie._internalUnits, '%');
    });

    test('Title is undefined', function() {
      assert.isUndefined(pie._titleGroup);
    });

    test('pie register is correct type', function() {
      var reg = pie.shadowRoot ? pie.shadowRoot.querySelector('px-vis-register').type : pie.querySelector('px-vis-register').type;
      assert.equal(reg, 'vertical');
    });
  });

  suite('Donut tests', function() {
    test('donut is created', function() {
      assert.isTrue(donut !== null);
    });

    test('internalData is correct', function() {
      var dataClone = JSON.parse(JSON.stringify(donut._internalChartData));

      dataClone.forEach(function(item) {
        item.backgroundColor = item.backgroundColor.split(' ').join('');
      });

      assert.isFalse(donut._empty);
      assert.equal(donut._total, 57);
      assert.equal(donut._internalChartData.length, 8);
      assert.deepEqual(dataClone, expected_data);
    });

    test('internalRegisterData is correct', function() {
      var dataClone = JSON.parse(JSON.stringify(donut._internalRegisterData));

      dataClone.forEach(function(item) {
        item.backgroundColor = item.backgroundColor.split(' ').join('');
      });

      assert.equal(donut._internalRegisterData.length, 8);
      assert.deepEqual(dataClone, expected_register);
    });

    test('units is correct', function() {
      assert.equal(donut._internalUnits, 'Cans');
    });

    test('Title is correct', function() {
      assert.equal(donut._titleGroup.select('text.title').text(), 'Total');
      assert.equal(donut._titleGroup.select('text.value').text(), '57 Cans');
    });

    test('donut register is correct type', function() {
      var reg = donut.shadowRoot ? donut.shadowRoot.querySelector('px-vis-register').type : donut.querySelector('px-vis-register').type;
      assert.equal(reg, 'horizontal');
    });


  });

  suite('Fast Render', function() {
    test('conditional donut is created', function() {
      assert.isTrue(donut2 !== null);
    });

    test('conditional donut has correct css variables applied', function() {
      var themeVar = donut2._checkThemeVariable(donut2, '--px-vis-pie-title-color');
      assert.equal(themeVar, '--px-vis-pie-title-color', 'theme-var not set');
      assert.notEqual(Polymer.dom(donut2.$.svg.root).querySelector('.title').getAttribute('fill'), 'rgb(0,0,0)');
    });
  });
};

