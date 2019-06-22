const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
	css: {
		sourceMap: true,
		loaderOptions: {
			sass: {
				data: '@import "@/scss/settings.scss";'
			}
		}
	},
	devServer: {
		overlay: {
			warnings: true,
			errors: true
		}
	},
	lintOnSave: true,
	chainWebpack: config => {
		config.module
			.rule('svg')
			.use('file-loader')
			.loader('svg-sprite-loader')
			.options({
				extract: false,
				spriteFilename: 'icons-sprite.svg',
				publicPath: '/'
			});

		config.plugin('svg-sprite-loader-plugin').use(require('svg-sprite-loader/plugin'), [{
			plainSprite: true
		}]);

		config.resolve.alias
			.set('@', resolve('src'))
			.set('@Components', resolve('src/components'));
	}
};
