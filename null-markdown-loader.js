/* eslint-env node */

/**
 * Null Loader works great for javascript files but, as it leaves a js
 * style comment it isn't great for content files. This works the same
 * as Null Loader but is intended for files such as MDX where we don't
 * want a JS comment.
 */

module.exports = function () {
  this.cacheable();
  return "";
};
