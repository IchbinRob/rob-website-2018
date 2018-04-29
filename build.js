const Metalsmith  = require('metalsmith');
const markdown    = require('metalsmith-markdown');
const layouts     = require('metalsmith-layouts');
const permalinks  = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');

Metalsmith(__dirname)
  .source('./src')
  .destination('./dist')
  .use(collections({
        sections: {
            pattern: '*.md',
            sortBy: 'weight'
        }
  }))
  .use(markdown())
  // .use(permalinks(
  //   pattern: ':title',
  //   smartypants: true,
  //   gfm: true,
  //   tables: true,
  //   langPrefix: 'language-'
  // ))
  .use(layouts({
    engine: 'nunjucks',
    default: 'default.njk'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
