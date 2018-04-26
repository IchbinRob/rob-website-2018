var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .source('./src')
  .destination('./dist')
  .use(markdown())
  .use(permalinks(
    smartypants: true,
    gfm: true,
    tables: true,
    langPrefix: 'language-'
  ))
  .use(layouts({
    engine: 'nunjucks',
    default: 'default.njk'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
