const ExternalModule = require('webpack/lib/ExternalModule');
const path = require('path');
//const resolver = require('resolver');
class DllReferencePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      "DllReferencePlugin",
      (normalModuleFactory) => {
        normalModuleFactory.hooks.factory.tap(
          "DllReferencePlugin",
          (factory) => (data, callback) => {
			let request = data.request;
			if(!request.startsWith('.')){
				let resource = require.resolve(request);
				let ident = "."+resource.slice(compiler.context.length).replace(/\\/g,'/');
				if (this.options.manifest.content[ident]) {
				  callback(null, new ExternalModule(ident, `window[${this.options.name}]`, request));
				} else {
				  factory(data, callback);
				}
			}else{
				factory(data, callback);
			}
          }
        );
      }
    );
  }
}

module.exports = DllReferencePlugin;
