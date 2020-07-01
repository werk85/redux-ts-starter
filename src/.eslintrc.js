const path = require('path')

module.exports = {
  extends: [
    'werk85/react'
  ],
  plugins: [
    'filenames'
  ],
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json')
  },
  rules: {
    'filenames/match-regex': 'off',
    'filenames/match-exported': 'error',
    'filenames/no-index': 'off'
  }
}
