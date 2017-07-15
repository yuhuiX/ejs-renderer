
# ejs-renderer

Use EJS to render HTML files by reading individual configuration files

## Usage

Add module to your `package.json`
```javascript
// either in devDependencies, or dependencies:
{
  "ejs-renderer": "https://github.com/YuhuiCF/ejs-renderer.git" // additionally with #master or #X.XX.XX
}
```

If you have a `--contentFile` in `test/integration/content/test.html.js`
```javascript
module.exports = {
  _templateFile: 'template.html', // file name of the ejs template for the content

  // contents for the ejs file
  h1: 'H1',
};
```

If your template file `template.html` in `-templateFolder` `test/integration/templates` is simply
```html
<h1><%= h1 %></h1>
```

If you would create the files in the `--destFolder` `test/integration/dist`

Then just run
```shell
node app/index.js --contentFile test/integration/content/test.html.js --templateFolder test/integration/templates --destFolder test/integration/dist
```
