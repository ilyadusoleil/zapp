module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  theme: {
      fontFamily: {
          'display': ['PT Sans'],
          'body': ['PT Sans Narrow'],
      },
    extend: {
        keyframes: {
            wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
            }
        },

        animation: {
            wiggle: 'wiggle 1s ease-in-out infinite',
            },
    },
  },
  variants: {},
  plugins: [],
};
