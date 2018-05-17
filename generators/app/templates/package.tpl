{
  "name": "<%= appName %>",
  "version": "0.0.1",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    <% if (useJest) { %>
    "test": "jest",
    <% } %>
    "dev": "tsc -p src/tsconfig.dev.json -w",
    "build": "tsc -p tsconfig.json",
    <% if (useTslint) { %>
    "lint": "tslint --project ./src/tsconfig.dev.json --fix"
    <% } %>
  },
  "devDependencies": {
    <% if (useJest) { %>
      "@types/jest": "^22.2.3",
    <% } %>
      "@types/node": "^9.6.16",
    <% if (useJest) { %>
      "jest": "^22.4.3",
    <% } %>
    <% if (useTslint) { %>
      "prettier": "^1.12.1",
    <% } %>
    <% if (useJest) { %>
      "ts-jest": "^22.4.6",
    <% } %>
      "ts-node": "^5.0.1",
    <% if (useTslint) { %>
     "tslint": "^5.10.0",
     "tslint-plugin-prettier": "^1.3.0",
    <% } %>
    "typescript": "^2.8.3"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
