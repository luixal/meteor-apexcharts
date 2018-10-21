Package.describe({
  name: 'luixal:meteor-apexcharts',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'ApexCharts Meteor Package',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/luixal/meteor-apexcharts',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8');
  api.use('ecmascript');
  api.use('templating@1.0.0');
  api.use('check');

  Npm.depends({
    'apexcharts': '2.1.5'
  });

  api.addFiles(
    [
      'template/template.html',
      'template/template.js'
    ],
    'client'
  );

  api.mainModule('meteor-apexcharts.js');
});
