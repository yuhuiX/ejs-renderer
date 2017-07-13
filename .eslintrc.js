
module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jasmine": true,
    "node": true
  },
  "extends": ["eslint:recommended", "google"],
  "globals": {},
  "rules": {
    "arrow-body-style": ["error", "always"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": "error",
    "eqeqeq": ["error", "always"],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-extra-semi": "error",
    "no-mixed-spaces-and-tabs": ["error"],
    "no-unused-vars": [2, {"args": "after-used"}], // Change google
    "space-in-parens": ["error","never"],
    "space-infix-ops": "error"
  }
};
