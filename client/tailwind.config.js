module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  theme: {
    fontFamily: {
      display: ['PT Sans'],
      body: ['PT Sans Narrow'],
    },

    extend: {
        width: {
        'container': '31%',
        'md-container': '46%',
        }
    },
},
variants: {},
plugins: [],

};
