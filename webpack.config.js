import webpack from 'webpack'
import path from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const cssBundle = new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import CleanWebpackPlugin from 'clean-webpack-plugin'
export const dist = path.join(__dirname, 'dist')
export default (env) => {
  const dev = o => (env.dev ? o : null)
  const prod = p => (env.prod ? p : null)

  const cssLoader = [
    dev({
      loader: 'style-loader',
      options: {
        hmr: false, // cause hmr breaks inserting in empty clases in css see - https://github.com/webpack-contrib/style-loader/issues/320
      },
    }),
    `css-loader?modules&importLoaders=1&localIdentName=${
    env.dev ? '[name]__[local]' : '[hash:base64:5]'
    }&minimize=${!!env.prod}&context=/`,
    'sass-loader'].filter(Boolean)

  // console.log(cssBundle.extract(cssLoader))
  return {
    mode: env.dev ? 'development' : 'production',
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    },
    entry: [
      '@babel/polyfill',
      dev('react-hot-loader/patch'),
      dev('webpack-hot-middleware/client'),
      path.join(__dirname, 'app/index.tsx'),
    ].filter(Boolean),
    output: {
      path: dist,
      filename: 'build.js',
      publicPath: '/',
    },
    devtool: env.dev ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: env.dev ? cssLoader : cssBundle.extract(cssLoader),
        }, {
          test: [/\.jsx?$/, /\.tsx?$/],
          exclude: /node_modules/,
          loaders: 'babel-loader',
          include: path.join(__dirname, 'app'),
        },
        { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
        { test: /\.(otf|ttf|eot)$/, loader: 'file-loader' },
        { test: /\.(png|jpg|gif)$/, loader: 'file-loader' }],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.dev ? '"development"' : '"production"',
        },
      }),
      prod(cssBundle),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss() {
            return [autoprefixer({
              browsers: ['> 1%',
                'last 3 version'],
            })]
          },
        },
      }),
      dev(new webpack.HotModuleReplacementPlugin()),
      dev(new webpack.NoEmitOnErrorsPlugin()),
    ].filter(Boolean),
  }
}
