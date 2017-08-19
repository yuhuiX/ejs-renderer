
# ejs-renderer

A CLI tool using EJS to render HTML files by reading individual configuration files

## Options

Option long | short | Description
--- | --- | ---
`--input` | `-i` | file or directory where the content configurations are defined
`--templateDirectory` | `-t` | directory where the templates are defined
`--output` | `-o` | directory where the content files are exported

## Usage

Add module to your `package.json`
```javascript
// either in devDependencies, or dependencies:
{
  "ejs-renderer": "https://github.com/YuhuiCF/ejs-renderer.git" // additionally with #master or #X.XX.XX
}
```

If you have a `--input` `test/integration/content/test.html.js` used to render a file with name `test.html` (content file name withouth the `.js` extension)
```javascript
module.exports = {
  _templateFile: 'template.html', // file name of the ejs template for the content

  // contents for the ejs file
  h1: 'H1',
};
```

If your template file `template.html` in `--templateDirectory` `test/integration/templates` is simply
```html
<h1><%= h1 %></h1>
```

If you would create the files in the `--output` `test/integration/dist` with name `test.html`

Then create a npm script to run, for example
```shell
npm run renderHtml
```
where the npm script renderHtml is
```javascript
{
  "renderHtml": "ejs-renderer --input test/integration/content/test.html.js --templateDirectory test/integration/templates --output test/integration/dist"
}
```

## Documentation

[Link](https://yuhuicf.github.io/ejs-renderer/tests.html) for integration tests, even usage examples
