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
        browsers: ['ChromeHeadless'],
        colors: true,
        client: {
            captureConsole: true,
            mocha: {
                bail: true,
            },
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox'],
            },
        },
        files: [path.join(process.cwd(), 'karma.entry.js')],
        frameworks: ['jasmine'],
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap'],
        },
        reporters: ['spec'],
        singleRun: true,
        webpack: {
            devtool: 'inline-source-map',
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: [
                            'ts-loader',
                            'angular2-template-loader',
                        ],
                    },
                    {test: /\.html$/, use: ['raw-loader']},
                    {test: /\.less$/, use: ['css-to-string-loader', 'css-loader', 'less-loader']},
                    {
                        exclude: [/\.spec\.ts$/, path.resolve(__dirname, 'node_modules')],
                        include: [path.resolve(__dirname, 'src')],
                        loader: 'istanbul-instrumenter-loader',
                        test: /\.ts$/,
                        options: {
                            esModules: true,
                        },
                        enforce: 'post',
                    },
                ],
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.json', '.js', '.html'],
                modules: ['node_modules', path.resolve(__dirname, 'src')],
            },
        },
        webpackServer: {
            noInfo: true,
            noLog: true,
        },
    });

    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }
};
