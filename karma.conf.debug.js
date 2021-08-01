const path = require('path');
module.exports = function (config) {
    config.set({
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-sourcemap-loader'),
            require('karma-spec-reporter'),
            require('karma-webpack'),
        ],
        browsers: ['Chrome'],
        colors: true,
        files: [path.join(process.cwd(), 'karma.entry.js')],
        frameworks: ['jasmine'],
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap'],
        },
        singleRun: false,
        webpack: {
            devtool: 'inline-source-map',
            mode: 'development',
            module: {
                rules: [
                    {test: /\.ts$/, use: ['ts-loader', 'angular2-template-loader']},
                    {test: /\.html$/, use: ['raw-loader']},
                    {test: /\.less$/, use: ['css-to-string-loader', 'css-loader', 'less-loader']},
                    {
                        exclude: [
                            path.resolve(__dirname, 'node_modules/@angular'),
                            path.resolve(__dirname, 'node_modules/rxjs'),
                        ],
                        include: [path.resolve(__dirname, 'src')],
                        loader: 'istanbul-instrumenter-loader',
                        test: /\.ts$/,
                        enforce: 'post',
                        options: {
                            esModules: true,
                        },
                    },
                ],
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.json', '.js', '.html'],
                modules: [
                    'node_modules',
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'tests'),
                ],
            },
        },
        webpackServer: {
            noInfo: true,
            noLog: true,
        },
    });
};
