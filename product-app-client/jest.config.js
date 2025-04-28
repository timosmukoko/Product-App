module.exports = {
  preset: 'react',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Transforms .js, .jsx, .ts, .tsx files
    '^.+\\.[m]js$': 'babel-jest', // Transform mjs files (for modules)
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Include axios to be transformed by babel-jest
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'], // Recognize .mjs as a valid extension
};
