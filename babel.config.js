/* eslint-disable */
const developmentEnvironments = ['development'];

const developmentPlugins = [
  require('react-hot-loader/babel'),
  require('@babel/plugin-proposal-class-properties'),
  require('@babel/plugin-proposal-object-rest-spread')
];


const productionPlugins = [
  require('@babel/plugin-proposal-class-properties'),
  require('@babel/plugin-proposal-object-rest-spread')
]

module.exports = (api) => {

  const development = api.env(developmentEnvironments);

  return {
    presets: [
      [require('@babel/preset-env')],
      [require('@babel/preset-typescript')],
      [require('@babel/preset-react'), { development }]
    ],
    plugins: [
      ...(development ? developmentPlugins : productionPlugins),
    ],
  }
}
