import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as webpack from 'webpack'
import WebpackBar from 'webpackbar'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { withFallback } from 'io-ts-types/lib/withFallback'
import * as t from 'io-ts'
import pkg from './package.json'
import { Config, Platform, Environment } from './src/config'
import { cast } from './util'

export const Env = t.type(
  {
    dev: withFallback(t.boolean, false),
    stage: withFallback(t.boolean, false),
    prod: withFallback(t.boolean, true),
    platform: Platform
  },
  'Env'
)
export interface Env extends t.TypeOf<typeof Env> {}

const tsconfigPath = path.join(__dirname, 'src/tsconfig.json')

function config(unsafeEnv: unknown = {}): webpack.Configuration {
  const env = cast(Env)(unsafeEnv)
  const environment: Environment = env.dev ? 'development' : env.stage ? 'stage' : 'production'

  const config: Config = {
    environment,
    platform: env.platform,
    title: 'effe-ts Starter',
    version: pkg.version
  }

  return {
    devtool: 'source-map',

    entry: {
      styles: ['./styles/app.css'],
      main: './src/index.tsx'
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js'
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, 'src'),
          loaders: [
            'cache-loader',
            {
              loader: 'thread-loader',
              options: {
                workers: 2
              }
            },
            {
              loader: 'babel-loader',
              options: {
                plugins: ['@babel/plugin-transform-runtime'],
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'entry',
                      corejs: 3
                    }
                  ]
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: tsconfigPath,
                happyPackMode: true,
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(jpg|gif|png|ttf|svg|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets'
          }
        }
      ]
    },

    plugins: [
      new WebpackBar(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: tsconfigPath,
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          }
        }
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        title: config.title
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'window.APP_CONFIG': JSON.stringify(Config.encode(config))
      })
    ],

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },

    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })]
    },

    stats: 'errors-only'
  }
}

export default config
