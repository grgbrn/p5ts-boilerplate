# p5.js + typescript boilerplate

A very simple project boilerplate for using [TypeScript]( http://www.typescriptlang.org) with [p5.js](https://p5js.org)

Doesn't require [VSCode](https://code.visualstudio.com) but works well with it!

:penguin:

# Setup

> npm install

...to install the latest p5.js type files.

Then, you need to run `tsc` to translate your `.ts` files into javascript. VSCode can do this with "Run Build Command" (`Ctrl/⌘ + Shift + B`). Choose `tsc watch` if you want it to run every time you save your sketch (recommended)

If you want to use some other editor, just run the same command in a terminal

> tsc --watch *.ts

Don't forget to look at what `tsc` has to say if you start encountering strange problems!

:hamster:

## Writing your Sketch

The main file you need to edit is `sketch/sketch.ts`.
You may also need to edit `index.html` if you want to customize the webpage to add some CSS or something.

The default `sketch.ts` template gives you a single sketch in [global mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)

If you're using VSCode, you should get code completion and type hints without any further configuration

## Libraries

If you want to use [p5.dom](https://p5js.org/reference/#/libraries/p5.dom) or [p5.sound](https://p5js.org/reference/#/libraries/p5.sound), just uncomment the relevant script tag in the `index.html` page.

## Live preview

Whether you use VSCode or not, you need to run a web server if you want live previews. I like `live-server` better than many of the other options. Run it with:

> npx live-server --watch=build

:seedling:

# Examples

A few of the [p5js examples](https://p5js.org/examples/) have been translated to TypeScript and left in the `examples` directory if you want a quick into to TypeScript.

:mouse:

# Notes

For better or worse, I'm just linking to the p5.js libs directly from the index.html page. This isn't great, but installing it through `npm` and including it as a "regular" ES6-style module doesn't seem to work very well right now. Maybe in the future!

I don't yet fully understand the `global.d.ts` file or some of the TypeScript warnings. I'll try to remember to update this as I learn more!

# References

XXX links to the source of the magic global.d.ts file

XXX where do the actual type files live
