module.exports = {
  app: 'src/',
  dist: 'dist/',
  test: 'test/',
  bower: 'src/bower_components/',
  tmp: 'tmp',
  revManifest: 'tmp/rev-manifest.json',
  port: 9000,
  liveReloadPort: 35729,
  uri: 'http://localhost:',
  constantTemplate:
        '(function () {\n' +
        '  \'use strict\'\n' +
        '    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n' +
        '    angular\n' +
        '        .module(\'<%- moduleName %>\')\n' +
        '<% constants.forEach(function(constant) { %>        .constant(\'<%- constant.name %>\', <%= constant.value %>)\n<% }) %>;\n' +
        '})();\n'
}