const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
	const CleanCSS = require('clean-css');

	eleventyConfig.addPlugin(pluginRss);

	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
	});

	eleventyConfig.addPassthroughCopy("_src/_assets");
	eleventyConfig.addPassthroughCopy("_src/sw.js");
	eleventyConfig.addPassthroughCopy("_src/admin/");
	eleventyConfig.addPassthroughCopy("_redirects");

	eleventyConfig.addFilter(
		'cssmin',
		code => new CleanCSS({}).minify(code).styles
	);

	// All posts:
	eleventyConfig.addCollection("posts", function(collection) {
		return collection.getAllSorted().filter(function(item) {
			return item;
		});
	});

	return {
		templateFormats: [
			"md",
			"njk",
			"html"
		],

		pathPrefix: "/",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		passthroughFileCopy: true,
		dir: {
			input: "_src",
			includes: "_templates",
			data: "_data",
			output: "_site"
		}
	};
};
