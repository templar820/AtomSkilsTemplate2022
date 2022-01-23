const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const OptimizeCssAssetWebPackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('isDev', isDev);
const filename = ext => (isDev ? `[name].${ext}` : `[name].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [new OptimizeCssAssetWebPackPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const getEnv = () => {
  const env = dotenv.config({ path: '../.env' }).parsed;
  return Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
};

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.tsx'],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.png'],
    modules: [path.resolve(__dirname), 'node_modules/'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@icons': path.resolve(__dirname, 'public', 'static', 'icons'),
      '@images': path.resolve(__dirname, 'public', 'static', 'images'),
      '@fonts': path.resolve(__dirname, 'public', 'static', 'fonts'),
    },
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/',
  },
  optimization: optimization(),
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: false,
    overlay: false,
    hot: true,
    port: 3000,
    stats: {
      modules: false,
    },
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    },
    // https: {
    //   key: fs.readFileSync('./public/static/ssl/localhost.key'),
    //   cert: fs.readFileSync('./public/static/ssl/localhost.crt'),
    // },
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'HackTemplate',
      template: 'public/index.html',
      filename: 'index.html',
      favicon: 'public/static/images/favicon.png',
    }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // }),
    new MiniCssExtractPlugin({

      filename: 'static/css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '.' }
      ]
    }),
    new CleanWebpackPlugin({
      root: path.join(__dirname, './build'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
    new webpack.DefinePlugin({
      APPMODE: JSON.stringify(process.env.NODE_ENV),
      ENDPOINT: process.env.ENDPOINT,
      'process.env.NODE_ENV': '"production"',
      ...getEnv(),
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'), // Path to .env file (this is the default)
    }),
    new LodashModuleReplacementPlugin(),

  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'sass-loader', options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/fonts/[name].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
    ],
  },

};
