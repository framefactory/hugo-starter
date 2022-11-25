import path from "path";
import TerserPlugin from "terser-webpack-plugin";

export default function config(env, argv)
{
    return {
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-map' : false,
       
        entry: {
            "index": "./src/index.ts",
        },
        output: {
            path: path.resolve(process.cwd(), "static"),
        },
        watchOptions: {
            aggregateTimeout: 200,
            ignored: [ "**/node_modules" ],
        },
        resolve: {
            modules: [ "node_modules" ],
            alias: {
                "@ffweb/core": "libs/core/src",
                "@ffweb/browser": "libs/browser/src",
            },
            extensions: [".ts", ".js", ".json" ],
            extensionAlias: {
                '.js': ['.js', '.ts'],
                '.mjs': ['.mjs', '.mts'],
            },
        },
        optimization: {
            minimize: env.production,

            minimizer: [
                new TerserPlugin({ parallel: true }),
            ],
        },
        module: {
            rules: [
                {
                    // Enforce source maps for all javascript files
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader",
                },
                {
                    // Typescript
                    test: /\.tsx?$/,
                    use: [{
                        loader: "ts-loader",
                        options: { compilerOptions: { noEmit: false } },
                    }],
                },
            ]
        },
    }
}
