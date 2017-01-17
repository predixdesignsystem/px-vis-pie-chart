v0.4.2
==================
* Updated to cool grays

v0.4.1
==================
* Themeable

v0.4.0
==================
* Updated dependencies

v0.3.3
==================
* remove console.log

v0.3.2
==================
* Loop through colors when having more slices than the max number of colors
* Added preventColorReuse

v0.3.1
==================
* Fix bug in ordering registers

v0.3.0
==================
* Added aggregateOtherRegister to allow to display the rest of the data in the register if maxRegisters is used
* Added preserveDataOrder to allow the chart to keep the slices in the same order as the data, as opposed as ordering them by value
* Fixed a bug were colors between registers and slices would desynchronise
* Fixed data update/deletion/addition issues
* Added animations on data update/deletion/addition
* Automatically sort registers from the biggest value to the smallest

v0.2.11
==================
* changing all devDeps to ^

v0.2.10
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.2.9
==================
* removing px-theme style call

v0.2.8
==================
* changing Gruntfile.js to gulpfile.js

v0.2.7
==================
* bower updating px-demo-snippet

v0.2.6
==================
* remove unused properties

v0.2.5
==================
* fixed data format in demo to fix codepen

v0.2.4
==================
* fixed tests

v0.2.3
==================
* fixed codepen, fixed demo container height, and added 10px margin-left to the register

v0.2.2
==================
* Updated dependencies

v0.2.1
==================
* Added math.max check on width and height

v0.2.0
==================
* Grunt to gulp conversion and style modules.

v0.1.5
==================
* Added support for decimals in percentages

v0.1.4
==================
* added overflow to demoContainer and removed flex__wrap from mega-demo

v0.1.3
==================
* Added support for exporting chart to image

v0.1.2
==================
* Added preventResize and exposes _repositionTitle()

v0.1.1
==================
* updated mega demo styles and bower px-demo-snippet to ^

v0.1.0
==================
* Added maxRegisters property to limit number of registers

v0.0.8
==================
* Fix bug where chartData was passed down instead of _internalChartData

v0.0.7
==================
* added image to readme, removed watch, added view on github

v0.0.6
==================
* Support empty data

v0.0.5
==================
* auto resize based on parent container

v0.0.4
==================
* bump px-vis version to get donut transitioning

v0.0.3
==================
* Add interactive demo

v0.0.1
==================
* Initial release
