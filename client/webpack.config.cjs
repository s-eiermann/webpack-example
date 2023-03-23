const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/ts/index.ts',
  target: 'web',
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
    }
  },
  output: {
    filename: isProd ? 'app.min.js' : 'app.js',
    path: path.resolve(__dirname, 'dist/'),
    sourceMapFilename: 'app.js.map',
  },
  devtool: 'eval-source-map',
  mode: isProd ? 'production' : 'development',
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  watch: process.env.WEBPACK_WATCH === 1 ? true : false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? 'app.min.css' : 'app.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        include: [
          path.resolve(__dirname, "src/css"),
        ],
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          }
        ],
      }
    ],
  },
  externals: {
    select2: 'jQuery.select2',
    pleasejs: 'Please',
    jquery: 'jQuery',
    qrcode: 'QRCode',
    'chart.js': 'Chart',
    'chart.js/auto': 'Chart',
    'ion-rangeslider': '"ion-rangeslider"',
    'chartjs-plugin-datalabels': 'ChartDataLabels',
  }
}
