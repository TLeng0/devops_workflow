// 11ty configuration
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/style.css");
    // 11ty defaults
    return {
  
      dir: {
        input: 'src',
        output: 'build'
      }
  
    };
  };