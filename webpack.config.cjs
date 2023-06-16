
module.exports = {
    entry: {
        main:'./src/public/scripts/index.js',
            },
    output: {
        path: "C:\\Users\\user\\WebstormProjects\\lab3\\build_webpack",
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    }
}