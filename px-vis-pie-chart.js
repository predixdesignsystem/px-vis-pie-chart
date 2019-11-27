/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
Element that allows the user to draw a pie or donut chart for some data.

### Usage

    <px-vis-pie-chart></px-vis-pie-chart>

### Styling
The following custom properties are available for styling:

Custom property | Description
:----------------|:-------------
  `--px-vis-pie-empty-color` | The color for an empty pie chart
  `--px-vis-pie-title-color` | The color for the title name
  `--px-vis-pie-title-font-size` | The size for the title name
  `--px-vis-pie-title-value-color` | The color for the title data value
  `--px-vis-pie-title-value-font-size` | The size for the title data value
  |
  |
  |
  `--px-vis-series-color-0` | These are the colors used to represent the data series on the charts. Used in numerical order by default. Colors MUST start at 0 and cannot contain gaps between numbers.
  `--px-vis-series-color-1` |
  `--px-vis-series-color-2` |
  `--px-vis-series-color-n` |


@element px-vis-pie-chart
@blurb Element providing solution to no problem in particular.
@homepage index.html
@demo demo.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-vis/px-vis-behavior-chart.js';
import 'px-vis/px-vis-behavior-common.js';
import 'px-vis/px-vis-behavior-d3.js';
import 'px-vis/px-vis-scale.js';
import 'px-vis/px-vis-svg.js';
import 'px-vis/px-vis-pie.js';
import 'px-vis/px-vis-axis.js';
import 'px-vis/px-vis-tooltip.js';
import 'px-vis/px-vis-interaction-space.js';
import 'px-vis/px-vis-register.js';
import 'px-vis/px-vis-cursor.js';
import 'px-vis/px-vis-clip-path.js';
import 'px-vis/px-vis-central-tooltip-content.js';
import 'px-tooltip/px-tooltip.js';
import './css/px-vis-pie-chart-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="px-vis-pie-chart-styles"></style>
    <div id="wrapper" class\$="[[_chartWrapperClass]]">
      <!-- empty div for tooltip, do not remove !-->
      <div class="flex">
        <div class\$="[[_registerWrapperClass]] [[_getAlignment(chartHorizontalAlignment, chartVerticalAlignment, _registerType)]] safari-flex-fix">
          <!-- Legend -->
          <px-tooltip id="tooltip" for="popAnchor" orientation="top" delay="10" follow-mouse="">
            <div style="display:flex; flex-direction:column; align-items:center">
              <span>{{_ttTitle}}</span>
              <span>{{_ttMessage}}</span>
            </div>
          </px-tooltip>
          <px-vis-register id="register" class\$="[[_getHideClass(hideRegister)]] u-ml-" type="{{_registerType}}" chart-data="[[_internalRegisterData]]" chart-width="[[width]]" dynamic-menu-config="[[dynamicMenuConfig]]" complete-series-config="[[completeSeriesConfig]]" x-axis-type="pie" y-axis-type="pie" use-percentage="[[usePercentage]]">
          </px-vis-register>
          <!-- popover + svg -->
          <div>
            <div style\$="position:relative;width:[[_smallerSide]]px;height:0px;">
              <px-popover id="popover" style="position:relative" position="relative" popover-title="" orientation="top" hide-overlay="" for="popAnchor">
              </px-popover>
              <div id="popAnchor"></div>
            </div>
            <!-- Core -->
            <px-vis-svg id="svg" width="[[_smallerSide]]" height="[[_smallerSide]]" offset="[[_center]]" svg="{{svg}}" px-svg-elem="{{pxSvgElem}}">
            </px-vis-svg>
          </div>
        </div>
        <!-- pie series -->
        <px-vis-pie id="pie" svg="[[svg]]" class="absolute" series-color-list="[[seriesColorList]]" width="[[width]]" height="[[height]]" margin="[[margin]]" radius="[[_radius]]" preserve-data-order="[[preserveDataOrder]]" chart-data="[[_internalChartData]]" muted-series="[[mutedSeries]]" clip-path="[[clipPath]]" complete-series-config="[[completeSeriesConfig]]" inner-radius="[[innerRadius]]" donut="[[donut]]" px-svg-elem="[[pxSvgElem]]" use-percentage="[[usePercentage]]" show-title="[[showTitle]]" total="[[_total]]" empty="[[_empty]]">
        </px-vis-pie>
      </div>
    </div>
    <px-tooltip id="centralTooltip" smart-orientation="" ignore-target-events="" orientation="[[tooltipOrientation]]">
      <px-vis-central-tooltip-content resources="[[resources]]" use-key-if-missing="[[useKeyIfMissing]]" language="[[language]]" first-date-time-format="[[firstDateTimeFormat]]" second-date-time-format="[[secondDateTimeFormat]]" separator="[[separator]]" timezone="[[timezone]]">
      </px-vis-central-tooltip-content>
    </px-tooltip>
`,

  is: 'px-vis-pie-chart',

  behaviors: [
    PxVisBehaviorD3.svg,
    PxVisBehavior.dataset,
    PxVisBehavior.sizing,
    PxVisBehavior.completeSeriesConfig,
    PxVisBehaviorChart.chartCommon,
    PxVisBehaviorChart.saveImage,
    PxVisBehaviorChart.chartAutoResize,
    PxVisBehaviorChart.registerPositioning,
    PxVisBehaviorChart.circleChart,
    PxColorsBehavior.getSeriesColors,
    PxColorsBehavior.dataVisColorTheming,
    PxVisBehavior.dynamicMenuConfig,
    PxVisBehaviorChart.actionRequest,
    PxVisBehavior.updateStylesOverride,
    PxVisBehaviorChart.centralTooltip
  ],

  properties: {
    /**
     * Configuration object used to customize the register.
     * Please refer to px-vis-register (URL) for a list of supported proerties.
     * Most interesting properties include:
     * -width
     * -height
     *
     */
    registerConfig: {
      type: Object,
      observer: '_registerConfigChanged'
    },
    /**
     * Whether to show a title in the middle of the pie/donut with the total value.
     * Meant to be used with a donut chart
     */
    showTitle: {
      type: Boolean,
      value: false
    },
    /**
     * Internal data used, same as chartData but with percentages infos
     */
    _internalChartData: {
      type: Array,
      computed: '_getInternalData(chartData.*, completeSeriesConfig.*, _forceColorsUpdate)'
    },
    /**
     * Internal data used for register, depedning on data and max nuymebr of registers
     */
    _internalRegisterData: {
      type: Array,
      computed: '_getInternalRegisterData(_internalChartData, maxRegisters, completeSeriesConfig, aggregateOtherRegister, _forceColorsUpdate)'
    },
    /**
     * Total value of all slices
     */
    _total: {
      type: Number,
      value: 0
    },
    /**
     * Whether the chart should be disaplyed as a donut rather than a pie.
     * If displayed as a donut it will by default use 30px as the ring size.
     * It can be overriden by using the "innerRadius" property (between 0 and 1)
     */
    donut: {
      type: Boolean,
      value: false
    },
    /**
     * Number between 0 and 1 defining how much of the inner pie should be cut.
     * Use it to override default donut ring size. 0 = full chart, 1 no chart
     *
     */
    innerRadius: {
      type: Number,
      value: 0
    },
    /**
     * whether the values should be displayed in %
     */
    usePercentage: {
      type: Boolean,
      value: false
    },
    /**
     * allows to draw an empty pie chart when data is empty/null
     */
    _empty: {
      type: Boolean,
      value: false
    },
    /**
     * Maximum number of registers the chart can display. 0 = no limit
     */
    maxRegisters: {
      type: Number,
      value: 0
    },
    /**
     * whether the pie should resize as window size is adjusted
     */
    preventResize: {
      type: Boolean,
      value: false
    },
    /**
     * how many digit of number should the percentage show after the decimal point, default is 0 digit.
     */
    decimalPercentage: {
      type: Number,
      value: 0
    },
    /**
     * if using maxRegisters this boolean allows the aggregation of all non-included
     * slices in the registers into a "Other" register entry
     */
    aggregateOtherRegister: {
      type: Boolean,
      value: false
    },
    /**
     * By default the pie chart slices will be ordered by value. Set to false
     * to keep the data order
     */
    preserveDataOrder: {
      type: Boolean,
      value: false
    },
    /**
     * Internal mapping used to keep track of each slice color. Key is slice
     * name (y) and value is index
     */
    _colorIndexMapping: {
      type: Object,
      value: function() {
        return {};
      }
    },
    /**
     * By default the chart will try to keep using the same color
     * for the same piece of data when updating data. This can be turned off
     * through this boolean (typically to "randomize" colors when having a
     * big number of ordered slices), with no guarantee whether the updated
     * data will match or not match previous data color per slice
     */
    preventColorReuse: {
      type: Boolean,
      value: false
    },
    /**
     * Message used for tooltip and popover, containing info on current slice
     *
     */
    _ttMessage: {
      type: String,
      value: ''
    },
    /**
     * Title used for tooltip and popover, containing info on current slice
     *
     */
    _ttTitle: {
      type: String,
      value: ''
    },
    /**
     * title before the total value if showTitle is true
     */
    title: {
      type: String,
      value: 'Total'
    },
    /**
     * the vertical half size, in pixels, for the spacing between the title and its value
     */
    titleSpacing: {
      type: Number,
      value: 5
    },
    /**
     * Unit currently in use: unit or %
     */
    _internalUnits: {
      type: String,
      computed: '_computeInternalUnits(_currentConfig, usePercentage)'
    },
    _currentConfig: {
      type: String,
      computed: '_computeSeriesId(completeSeriesConfig.*)'
    },
    _forceColorsUpdate: {
      type: Number,
      value: 1
    }
  },

  observers: [
    '_xAxisConfigChanged(xAxisConfig.*)',
    '_yAxisConfigChanged(yAxisConfig.*)',
    '_positionChanged(_center, _radius)',
    '_drawTitle(svg, showTitle, title, _total, _internalUnits, titleSpacing, _stylesUpdated)',
    '_resetColors(seriesColorList.*)'
  ],

  listeners: {
    'iron-resize': '_onIronResize',
    'px-vis-pie-centered-on-slice': '_showPopover',
    'px-vis-pie-mouse-enter-slice': '_showTooltip',
    'px-vis-pie-slice-clicked': '_hideTooltip',
    'px-vis-pie-mouse-leave-slice': '_hideTooltip'
  },

  ready: function() {
    this.xAxisType = 'pie';
    this.yAxisType = 'pie';
    this.includeAllSeries = true;
    window.requestAnimationFrame(function() {
      this.updateStyles();
    }.bind(this));
  },

  attached: function() {
    this._onIronResize();

    //if no data after 500ms draw an empty chart
    setTimeout(function() {
      if(!this.chartData || this.chartData.length === 0) {
        this.set('_empty', true);
      }
    }.bind(this), 500);
  },

  _tooltipConfigChanged: function(conf) {
    if(this._doesObjHaveValues(conf)) {
      this._applyConfigToElement(this.tooltipConfig, this.$.tooltip);
    }
  },

  _registerConfigChanged: function(conf) {
    if(this._doesObjHaveValues(conf)) {
      this._applyConfigToElement(this.registerConfig, this.$.register);
    }
  },

  _drawTitle: function() {
    if(this.hasUndefinedArguments(arguments)) {
      return;
    }

    if(this.showTitle) {
      if(!this._titleGroup) {

        this._titleGroup = this.svg.append('g')
          .attr('class','title-group');

        this._titleGroup.append('text')
          .attr('class','title')
          .attr('fill', this._checkThemeVariable('--px-vis-pie-title-color', 'rgb(0,0,0)'))
          .attr('font-size', this._checkThemeVariable('--px-vis-pie-title-font-size', '45px'))
          .style('font-family',this._checkThemeVariable("--px-vis-font-family", ''))
          .attr('font-style', this._checkThemeVariable("--px-vis-font-family", ''))
          .text(this.title)
          .attr('text-anchor', 'middle')
          .attr('transform','translate(0,' + '-' + this.titleSpacing + ')');

        this._titleGroup.append('text')
          .attr('class','value')
          .attr('fill', this._checkThemeVariable('--px-vis-pie-title-value-color', 'rgb(0,0,0)'))
          .attr('font-size', this._checkThemeVariable('--px-vis-pie-title-value-font-size', '45px'))
          .style('font-family',this._checkThemeVariable("--px-vis-font-family", ''))
          .attr('font-style', this._checkThemeVariable("--px-vis-font-family", ''))
          .text(this._total + ' ' + this._currentConfig.xAxisUnit)
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'hanging')
          .attr('transform','translate(0,' + this.titleSpacing + ')');
      } else {
        this._titleGroup.select('text.title')
          .attr('fill', this._checkThemeVariable('--px-vis-pie-title-color', 'rgb(0,0,0)'))
          .attr('font-size', this._checkThemeVariable('--px-vis-pie-title-font-size', '45px'))
          .style('font-family',this._checkThemeVariable("--px-vis-font-family", ''))
          .attr('font-style', this._checkThemeVariable("--px-vis-font-family", ''))
          .text(this.title)
          .attr('transform','translate(0,' + '-' + this.titleSpacing + ')');

        this._titleGroup.select('text.value')
          .attr('fill', this._checkThemeVariable('--px-vis-pie-title-value-color', 'rgb(0,0,0)'))
          .attr('font-size', this._checkThemeVariable('--px-vis-pie-title-value-font-size', '45px'))
          .style('font-family',this._checkThemeVariable("--px-vis-font-family", ''))
          .attr('font-style', this._checkThemeVariable("--px-vis-font-family", ''))
          .text(this._total + ' ' + this._currentConfig.xAxisUnit)
          .attr('transform','translate(0,' + this.titleSpacing + ')');
      }
    } else if (this._titleGroup) {
      this._titleGroup.remove();
      this._titleGroup = null;
    }
  },

  _getInternalData: function(chartData, completeSeriesConfig) {
    if(this._isObjEmpty(this.completeSeriesConfig)) {
      return;
    }

    var total = 0,
        id = this._returnKeys(this.completeSeriesConfig)[0],
        xKey = this.completeSeriesConfig[id].x,
        yKey = this.completeSeriesConfig[id].y,
        result = [];

    if(!this.chartData || this.chartData.length === 0) {
      this.set('_total', 0);
      this.set('_empty', true);
      this._colorIndexMapping = {};
    } else {
      this.set('_empty', false);

      var usedColors = [];

      //process new data
      for(var i=0; i<this.chartData.length; i++) {

        var colorIndex = this._colorIndexMapping[this.chartData[i][yKey]];

        //calculate total value of all data
        total += this.chartData[i][xKey];
        result.push(JSON.parse(JSON.stringify(this.chartData[i])));

        //store used color indexes
        if(colorIndex && !this.preventColorReuse) {
          usedColors.push(colorIndex);
          result[i].colorIndex = colorIndex;
        }
      }

      //reset color mapping
      this._colorIndexMapping = {};

      //assign colors
      var freeIndex = 0,
          maxColors = this.seriesColorList.length
      for(var i=0; i<result.length; i++) {

        //assign a new color if needed
        if(!result[i].colorIndex) {

          if(usedColors.length === maxColors || usedColors.length > maxColors) {
            //if we have used all colors just start looping again
            freeIndex += 1;
            freeIndex = freeIndex % maxColors;
          } else {
            //find the first available index
            while(usedColors.indexOf(freeIndex) !== -1) {
              freeIndex += 1;
            }
          }

          result[i].colorIndex = freeIndex;
          usedColors.push(freeIndex);
        }

        //rebuild our mapping
        this._colorIndexMapping[result[i][yKey]] = result[i].colorIndex;
      }

      this.set('_total', total.toFixed(this.decimalPercentage));

      //make sure each slice is aware of its percentage value
      for(var i=0; i<result.length; i++) {
        result[i].percentage = ((result[i][xKey]/total) * 100).toFixed(this.decimalPercentage);
      }
    }

    return result;
  },

  /**
   * Process data for the registers, limiting the max number of registers
   */
  _getInternalRegisterData: function(_internalChartData, maxRegisters, completeSeriesConfig, aggregateOtherRegister) {

    if(this.hasUndefinedArguments(arguments)) {
      return;
    }

    var result = [];
    if(!maxRegisters || maxRegisters < 1) {

      result = _internalChartData.slice(0).sort(function(a, b) {
        return b.percentage - a.percentage;
      });

      for(var i=0; i<result.length; i++) {
        result[i].backgroundColor = this._getColor(result[i].colorIndex);
      }

    } else {

      //pass the ('maxRegisters'-1) biggest data slice and aggregate the rest in 'other'
      var id = this._returnKeys(completeSeriesConfig)[0],
          xKey = this.completeSeriesConfig[id].x,
          yKey = this.completeSeriesConfig[id].y,
          mapped = _internalChartData.map(function(el, i) {
            return { index: i, value: el[xKey] };
          }),
          count = 0,
          effectiveMaxRegisters = maxRegisters,
          lastSlice = {percentage: 0,
                      backgroundColor: this.colors['white']};
          lastSlice[xKey] = 0;
          lastSlice[yKey] = 'Other';

      if(maxRegisters > 0 && aggregateOtherRegister) {
        effectiveMaxRegisters -= 1;
      }

      //sort mapped array
      mapped.sort(function(a, b) {
        return b.value - a.value;
      });

      //get slices we're interested in
      mapped.map(function(el) {
        if(count < effectiveMaxRegisters) {
          var slice = {};
          slice = _internalChartData[el.index];
          slice.backgroundColor = this._getColor(_internalChartData[el.index].colorIndex);
          result.push(slice);
        }
         else  if(aggregateOtherRegister) {
          lastSlice[xKey] += Number(_internalChartData[el.index][xKey]);
          lastSlice['percentage'] += Number(_internalChartData[el.index].percentage);
        }

        count++;
      }.bind(this));

      if(aggregateOtherRegister) {
        result.push(lastSlice);
      }
    }

    return result;
  },

  /**
   * Applies the config object to the element. Each key in the config object
   * is the name of the property to be applied
   *
   */
  _applyConfigToElement: function(config, element) {
    if(typeof(config) !== 'object') {
      console.error('Configuration object must be valid JSON: ' + config);
      return;
    }
    if(!element) {
      console.error('Cannot apply config to undefined element');
      return;
    }

    var keys = Object.keys(config);
    for(var i = 0; i < keys.length; i++){
      var key = keys[i];
      element.set(key, config[key])
    }
  },

  // _getSeriesId: function(completeSeriesConfig) {
  //   //should always have only 1 key for pies
  //   return this._returnKeys(completeSeriesConfig)[0];
  // },
  _onIronResize: function() {
    if (this.preventResize){
      return;
    }
    this.debounce('ironresize', function() {
      var wrapperRect = this.$.wrapper.getBoundingClientRect(),
          registerRect = this.$.register.getBoundingClientRect();

      if(this.$.register.type === 'horizontal') {
        this.set('width', Math.max(wrapperRect.width,0));
        this.set('height', Math.max(wrapperRect.height - registerRect.height,0));
      } else {
        this.set('width', Math.max(wrapperRect.width - registerRect.width,0));
        this.set('height', Math.max(wrapperRect.height,0));
      }
    }, this.debounceResizeTiming);
  },

  _repositionTitle: function() {
    this.$.pie._repositionTitle();
  },

  _getAlignment: function(hor, vert, type) {
    if(this.hasUndefinedArguments(arguments)) {
      return;
    }

    var base = '';

    if(type === 'horizontal') {
      if(hor === 'center') {
        base += 'flex--middle ';
      } else if(hor === 'right') {
        base += 'flex--bottom ';
      } else {
        base += 'flex--top ';
      }

      if(vert === 'center') {
        base += 'flex--center';
      } else if(vert === 'bottom') {
        base += 'flex--right';
      } else {
        base += 'flex--left';
      }
    } else {

      //when vertical just align the register at the top until
      //we provide similar config as horizontal
      base += 'flex--top';
    }

    return base;
  },

  _showPopover: function(evt) {
    this.$.popover.popoverTitle = evt.detail.datum.data[this._currentConfig.y];
    this.$.popover.popoverBody = this._getSliceValue(evt.detail.datum);

    this.$.popover.show();
  },

  _showTooltip: function(evt) {
    //get label and value
    if(this._empty) {
      this.set('_ttTitle', 'Empty');
      this.set('_ttMessage', '');
    } else {
      this.set('_ttTitle', evt.detail.datum.data[this._currentConfig.y]);
      this.set('_ttMessage', this._getSliceValue(evt.detail.datum));
    }

    var center = Px.d3.arc().centroid(evt.detail.rotatedDatum),
        rect = this.pxSvgElem.getBoundingClientRect();

    this.$.tooltip.mouseCoords = [ center[0] + rect.left + this._center[0] + window. window.pageXOffset,
                                   center[1] + rect.top + this._center[1] + window. window.pageYOffset];
    this.$.tooltip._show();
  },

  _hideTooltip: function(evt) {
    this.$.tooltip._hide();
  },

  _positionChanged: function() {
    if(this.isVarNumber(this._center) && this.isVarNumber(thie._radius)) {
      this.$.popover.style['top'] = this._center[1] - this._radius;
    }
  },

  _computeInternalUnits: function() {
    if(this.hasUndefinedArguments(arguments)) {
      return;
    }

    return this.usePercentage ? '%' : this._currentConfig.xAxisUnit;
  },

  /**
   * Return the value or the slice datum depending on use of percentages
   */
  _getSliceValue: function(datum) {
    if(this.usePercentage) {
      return datum.data.percentage + this._internalUnits;
    } else {
      return datum.data[this._currentConfig.x] + ' ' + this._internalUnits;
    }
  },

  _computeSeriesId: function(completeSeriesConfig) {
    if(this._doesObjHaveValues(completeSeriesConfig)) {
      return this.completeSeriesConfig[Object.keys(this.completeSeriesConfig)[0]];
    }
  },

  _resetColors: function() {
    if(this._forceColorsUpdate) {
      this._colorIndexMapping = {};
      this.set('_forceColorsUpdate', this._forceColorsUpdate + 1);
    }
  }
});
