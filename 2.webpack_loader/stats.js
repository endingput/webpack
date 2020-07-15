{
  errors: [],
  warnings: [
    './src/index.js 2:19-23\n' +
      `"export 'name' was not found in './title'\n` +
      '    at HarmonyImportSpecifierDependency._getErrors (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_webpack@4.43.0@webpack\\lib\\dependencies\\HarmonyImportSpecifierDependency.js:109:11)\n' +
      '    at HarmonyImportSpecifierDependency.getWarnings (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_webpack@4.43.0@webpack\\lib\\dependencies\\HarmonyImportSpecifierDependency.js:60:15)\n' +
      '    at Compilation.reportDependencyErrorsAndWarnings (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_webpack@4.43.0@webpack\\lib\\Compilation.js:1454:24)\n' +
      '    at C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_webpack@4.43.0@webpack\\lib\\Compilation.js:1258:10\n' +
      '    at AsyncSeriesHook.eval [as callAsync] (eval at create (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_tapable@1.1.3@tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:15:1)\n' +
      '    at AsyncSeriesHook.lazyCompileHook (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_tapable@1.1.3@tapable\\lib\\Hook.js:154:20)\n' +
      '    at Compilation.finish (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_webpack@4.43.0@webpack\\lib\\Compilation.js:1253:28)\n' +
      '    at C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_webpack@4.43.0@webpack\\lib\\Compiler.js:672:17\n' +
      '    at _done (eval at create (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_tapable@1.1.3@tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:9:1)\n' +
      '    at eval (eval at create (C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_tapable@1.1.3@tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:32:22)'
  ],
  version: '4.43.0',
  hash: '9900a88a1e293cc70c8c',
  time: 173,
  builtAt: 1593606517953,
  publicPath: '',
  outputPath: 'C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\dist',
  assetsByChunkName: { main: 'main.js' },
  assets: [
    {
      name: 'index.html',
      size: 294,
      chunks: [],
      chunkNames: [],
      info: {},
      emitted: true,
      isOverSizeLimit: undefined
    },
    {
      name: 'main.js',
      size: 5631,
      chunks: ['main'],
      chunkNames: ['main'],
      info: {},
      emitted: true,
      isOverSizeLimit: undefined
    }
  ],
  filteredAssets: 0,
  entrypoints: {
    main: {
      chunks: [Array],
      assets: [Array],
      children: [Object: null prototype] {},
      childAssets: [Object: null prototype] {},
      isOverSizeLimit: undefined
    }
  },
  namedChunkGroups: {
    main: {
      chunks: [Array],
      assets: [Array],
      children: [Object: null prototype] {},
      childAssets: [Object: null prototype] {},
      isOverSizeLimit: undefined
    }
  },
  chunks: [
    {
      id: 'main',
      rendered: true,
      initial: true,
      entry: true,
      recorded: undefined,
      reason: undefined,
      size: 690,
      names: [Array],
      files: [Array],
      hash: '158de897a4340bff71f8',
      siblings: [],
      parents: [],
      children: [],
      childrenByOrder: [Object: null prototype] {},
      modules: [Array],
      filteredModules: 0,
      origins: [Array]
    }
  ],
  modules: [
    {
      id: './node_modules/_webpack@4.43.0@webpack/buildin/harmony-module.js',
      identifier: 'C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\node_modules\\_webpack@4.43.0@webpack\\buildin\\harmony-module.js',
      name: '(webpack)/buildin/harmony-module.js',
      index: 2,
      index2: 0,
      size: 573,
      cacheable: true,
      built: true,
      optional: false,
      prefetched: false,
      chunks: [Array],
      issuer: 'C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\src\\title.js',
      issuerId: './src/title.js',
      issuerName: './src/title.js',
      issuerPath: [Array],
      profile: undefined,
      failed: false,
      errors: 0,
      warnings: 0,
      assets: [],
      reasons: [Array],
      providedExports: null,
      optimizationBailout: [],
      depth: 2,
      source: 'module.exports = function(originalModule) {\n' +
        '\tif (!originalModule.webpackPolyfill) {\n' +
        '\t\tvar module = Object.create(originalModule);\n' +
        '\t\t// module.parent = undefined by default\n' +
        '\t\tif (!module.children) module.children = [];\n' +
        '\t\tObject.defineProperty(module, "loaded", {\n' +
        '\t\t\tenumerable: true,\n' +
        '\t\t\tget: function() {\n' +
        '\t\t\t\treturn module.l;\n' +
        '\t\t\t}\n' +
        '\t\t});\n' +
        '\t\tObject.defineProperty(module, "id", {\n' +
        '\t\t\tenumerable: true,\n' +
        '\t\t\tget: function() {\n' +
        '\t\t\t\treturn module.i;\n' +
        '\t\t\t}\n' +
        '\t\t});\n' +
        '\t\tObject.defineProperty(module, "exports", {\n' +
        '\t\t\tenumerable: true\n' +
        '\t\t});\n' +
        '\t\tmodule.webpackPolyfill = 1;\n' +
        '\t}\n' +
        '\treturn module;\n' +
        '};\n'
    },
    {
      id: './src/index.js',
      identifier: 'C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\src\\index.js',
      name: './src/index.js',
      index: 0,
      index2: 2,
      size: 67,
      cacheable: true,
      built: true,
      optional: false,
      prefetched: false,
      chunks: [Array],
      issuer: null,
      issuerId: null,
      issuerName: null,
      issuerPath: null,
      profile: undefined,
      failed: false,
      errors: 0,
      warnings: 0,
      assets: [],
      reasons: [Array],
      providedExports: [],
      optimizationBailout: [],
      depth: 0,
      source: 'import title, { name } from "./title";\r\nconsole.log(title, name);\r\n'
    },
    {
      id: './src/title.js',
      identifier: 'C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\src\\title.js',
      name: './src/title.js',
      index: 1,
      index2: 1,
      size: 50,
      cacheable: true,
      built: true,
      optional: false,
      prefetched: false,
      chunks: [Array],
      issuer: 'C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\src\\index.js',
      issuerId: './src/index.js',
      issuerName: './src/index.js',
      issuerPath: [Array],
      profile: undefined,
      failed: false,
      errors: 0,
      warnings: 0,
      assets: [],
      reasons: [Array],
      providedExports: [Array],
      optimizationBailout: [],
      depth: 1,
      source: "\r\nmodule.exports = {\r\n\r\n}\r\nexport default 'hello';"
    }
  ],
  filteredModules: 0,
  logging: {
    'webpack.buildChunkGraph.visitModules': { entries: [], filteredEntries: 2, debug: false }
  },
  children: [
    {
      errors: [],
      warnings: [],
      publicPath: '',
      outputPath: 'C:\\anormal\\zhufengwebpack2020\\1.webpack_bundle\\dist',
      assetsByChunkName: [Object],
      assets: [Array],
      filteredAssets: 0,
      entrypoints: [Object],
      namedChunkGroups: [Object],
      chunks: [Array],
      modules: [Array],
      filteredModules: 0,
      logging: [Object],
      children: [],
      name: 'HtmlWebpackCompiler'
    }
  ]
}























































































































































































































































