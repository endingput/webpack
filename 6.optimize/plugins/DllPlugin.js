const path = require("path");

class DllPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("DllPlugin", (compilation, callback) => {
      compilation.chunks.forEach((chunk) => {
		const name = this.options.name;
        const targetPath = this.options.path;
        const manifest = {
          name,
          content: Array.from(chunk.modulesIterable, (module) => {
            if (module.libIdent) {
              return { ident: module.id, data: { id: module.id } };
            }
          })
            .filter(Boolean)
            .reduce((obj, item) => {
              obj[item.ident] = item.data;
              return obj;
            }, Object.create(null)),
		};
        let manifestContent = JSON.stringify(manifest);
        const content = Buffer.from(manifestContent, "utf8");
        compiler.outputFileSystem.mkdirp(path.dirname(targetPath), (err) => {
          compiler.outputFileSystem.writeFile(targetPath, content, callback);
        });
      });
    });
  }
}
module.exports = DllPlugin;
