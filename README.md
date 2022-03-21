# Devops Project 2: CI/CD

## Deploying a static website: Creating a static website using eleventy and deploying to GitHub Pages.

This repo contains code to generate a static website using [eleventy](https://www.11ty.dev/) and an action to deploy it to Github Pages whenever a push is made to the repo. 


| Files | Description |
| ----------- | ----------- |
| src/index.md | Eleventy generates html files from markdown files |
| src/style.css | CSS file |
| src/\_includes | Files to be used in the build process but not rendered eg. templates |
| src/\_includes/page.njk | Nunjucks template file. |
| .eleventy.js | Configuration file |
| .gitignore | Indicates files that are not pushed to git |
| .nojekyll | An empty file that tells github not to use jekyll |

### Files in `src`

1. Markdown files

Eleventy takes markdown files located in the `src` folder and build html files from them. 
Content between `---` are metadata about the page. In here you will include a reference to the template file if needed.
```
---
title: Github Page
layout: "page.njk"
---
```
2. Templates

If templates are used, they are to be included under `src\_includes` which will tell eleventy to use them when refereced.
There are a variety of template languages that can be used such as `html`, `nunjucks`, `liquid`. In this repo, `nunjucks` is used.

3. `.eleventy.js`

`.eleventy.js` is a configuration file. In this repo it is used to indicate the `input` and `output` directory. 
As a `CSS` file is also included, we have to tell eleventy to copy it to the output folder using `Passthrough File Copy`. 
This feature can also be used to pass images to the output folder.

```
module.exports = function(eleventyConfig) 
  eleventyConfig.addPassthroughCopy("./src/style.css");
```

4. `.nojekyll`

An empty file that tells Github not to use Jekyll.


### Github Action to deploy to Github Pages
The workflow file to build and deploy the website is found at `.github/workflow/build.yml`.

It is automatically triggered once a push is made to the repo under the `main` branch.
```
on:
  push:
    branches:
      - main
```

Thereafter, it checks out the repo to allow the workflow to access it using ```actions/checkout@v3```
The ```node.js``` version to be used is then set up with ```actions/setup-node@v1```. 

```npm ci``` is then run, which is similar to ```npm install``` but used for automated environments such as a workflow.

```npm run build``` runs the ```build``` script indicated in ```package.json```.
In this case, it asks eleventy to generate the build using ```npx eleventy```. 
We add a path prefix to deploy to the specific subdirectory ```/devops_workflow```.
This path prefix is inserted at the beginning of all absolute url href links so that links don't break when deployed to Github pages.
```
npx eleventy --pathprefix 'devops_workflow'
```

Next, ```peaceiris/actions-gh-pages@v3``` is used to deploy the static files to Github pages. 
In this worflow, ```GITHUB_TOKEN``` is used to authenticate.
As the ```output``` folder is specified as ```build``` in the ```.eleventy.js``` config file, it also has to be specified in this workflow to publish to ```build``` using ```publish_dir: build```.

By default, this action will commit the static files to the ```gh-pages``` branch and deploy it from there.


