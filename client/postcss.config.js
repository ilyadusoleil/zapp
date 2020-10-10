// TOOD: decide if commented code below is required

// const tailwindcss = require('tailwindcss');

// const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// const plugins = [ tailwindcss ];

// This is if you want to include your custom config

//TODO: Add this back in alter when you want to optimize production builds
// if (!IS_DEVELOPMENT) {
//     const purgecss = require('@fullhuman/postcss-purgecss');

//     class TailwindExtractor {
//         static extract(content) {
//             return content.match(/[A-z0-9-:\\/]+/g) || [];
//         }
//     }

//     plugins.push(
//         purgecss({
//             content: ['src/*.html'],
//             extractors: [
//                 {
//                     extractor: TailwindExtractor,
//                     extensions: ['html']
//                 }
//             ],
//         })
//     );
// }

// module.exports = { plugins }

// module.exports = {
//     plugins: [
//       // ...
//       require('tailwindcss'),
//       require('autoprefixer'),
//       // ...
//     ]
//   }.

module.exports = { plugins: ['tailwindcss'] };
