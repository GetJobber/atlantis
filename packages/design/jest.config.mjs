export default {
  preset: "ts-jest",
  testEnvironment: "node",
  // If you're using ECMAScript modules, you might need the following configuration
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest", // Only needed if you're using Babel for JavaScript files
  },
  // Specify file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  babel: {
    plugins: ["@babel/plugin-syntax-import-attributes"], // Only needed if you're using
  },
};
