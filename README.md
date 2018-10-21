# Meteor ApexCharts
This packages wraps [ApexCharts](https://apexcharts.com/) [NPM package](https://www.npmjs.com/package/apexcharts) in a meteor package. It provides a template that embeds one ApexChart.

This package is unofficial and it's not supported by ApexCharts team. Any bugs within the ApexCharts library itself must be posted in its official [github repo](https://github.com/apexcharts/apexcharts.js). I'll try to keep npm dependency version up to date, but feel free to PR version updates if you test it before.

## Install
As simple as any other meteor package:
```
meteor add luixal:meteor-apexcharts
```
## Usage
Just include the template in your html:
```html
{{> apexChart options}}
```
and provide options form a helper:
```javascript
Template.myTemplate.helpers({
  options() {
    return {
      options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }
    }
  },
});
```
## Extra Options
As you can see in the example above, we are returning an object with an `options` field inside. This is not redundant, it's because we have added some extra options to our template:

| Option | Type | Description | Default Value |
| ------ | ---- | ----------- | ------------- |
| `containerId` | String | ID to set in chart container div | 'apexChartId' |
| `callbacks` | Object | Object containig callbacks (see below) | none |
| `options`| Object | ApexCharts options object | none |

#### containerId
The template provided is rendered to an html code like this:
```html
<div id="{{containerId}}"></div>
```
and then the ApexChart is built passing a selector with that `containerId`. It's useful to pass a custom `containerId` in case you need to render more than one chart.

#### callbacks
There are to callbacks available:
* `beforeRender`: this function is called once the ApexChart object is built, but before calling `chart.render()`. It's called with two params `chart` (the ApexChart instance) and template `context` (the same you passed to the template).
* `afterRender`: this function is called once the `chart.render()` function has been called. It's called with the params of `beforeRender`.

These callbacks are useful to get the chart instance so you can manipulate the chart later (for updating options, appending data, etc...).

## Full Example
```javascript
Template.main.helpers({
  options() {
    let template = Template.instance();
    return {
      containerId: 'luixalsContainer',
      callbacks: {
        // beforeRender: function(chart, context) { console.log(chart) },
        afterRender: function(chart, context) {
          console.log(chart);
          template.chart = chart;
        },
      },
      options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }
    }
  },
});
```
