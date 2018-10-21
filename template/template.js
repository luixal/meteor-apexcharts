import ApexCharts from 'apexcharts';

Template.apexChart.onRendered(function() {
  if (Match.test(this.data.options, Object)) {
    // getting callbacks:
    let callbacks = this.data.callbacks || {};
    // creating chart in template context:
    this.chart = new ApexCharts(
      document.querySelector('#' + (this.data.containerId || 'apexChartId')),
      this.data.options
    );
    // calling before render callback if present:
    if (callbacks.beforeRender) callbacks.beforeRender(this.chart, this.data);
    // rendering chart:
    this.chart.render();
    // calling after render callback if present:
    if (callbacks.afterRender) callbacks.afterRender(this.chart, this.data);

  } else {
    console.log('You must pass an options object');
  }
});

Template.apexChart.helpers({

  'containerId'() {
    return this.containerId || 'apexChartId';
  }

});
