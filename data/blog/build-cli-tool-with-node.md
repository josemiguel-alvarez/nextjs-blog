---
title: "Get Started Building CLI Tools with Node.js"
summary: "Learn the basics about building CLI tools with Node.js"
date: "2022-07-21"
tags: ["node", "javascript", "tools"]
images: ["/static/images/nodejs.png"]
draft: false
---

<TOCInline toc={props.toc} asDisclosure />

In this post we will see how to build a CLI tool with Node.js. The only requirement is to use Node v18+. You can use a lower version of Node, but you will need to adapt some of the code to make it work.

## Initialize project

Create a folder for your project and run `npm init` in this folder. This will create a `package.json` file in the root of your project. You can pass the `-y` flag to accept the default values.

```sh
npm init -y
```

```json showLineNumbers
{
  "name": "cli-course",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

By default, the module system in the project is going to be CommonJS or CJS. Imports and exports in CJS work like this:

```js {1, 5, 6, 7} showLineNumbers
var myModule = require("my-module");

var result = myModule.doSomething();

module.exports = {
  result,
};
```

In ECMAScript modules or ESM it works like this:

```js {1, 3} showLineNumbers
import myModule from "my-module";

export const result = myModule.doSomething();
```

If we want to use ESM we have to enable it in `package.json` by setting the `type` property to `module`.

```json {12} showLineNumbers
{
  "name": "cli-course",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

## Parse arguments

In Node we can access the [process](https://nodejs.org/api/process.html) variable globally. If you print to the console the content of `process` you will see a lot of information. In the `argv` property you can access the arguments passed to the script. For example, running `node index.js` will print something similar to:

```js showLineNumbers
console.log(process.argv);

/**
 * Output:
 * ["/usr/local/bin/node", "/projects/node-cli-course/index.js"]
 */
```

As you can see, the first two elements of the array are the path to the node executable and the path to the script. If we pass more arguments to the command, they will be added to the `argv` array. For example, running `node index.js --name=Jose` will print this:

```json showLineNumbers
["/usr/local/bin/node", "/projects/node-cli-course/index.js", "--name=jose"]
```

We can easily parse the flags passed to the script checking which arguments start with a `-` character.

```js {4:5} showLineNumbers
const flags = [];

process.argv.forEach((arg) => {
  if (arg.startsWith("-")) {
    flags.push(arg.replaceAll("-", ""));
  }
});
```

Using the command (`node index.js --hi`) the `flags array` would equal `['hi']`.
And then we can do something with the flag.

```js showLineNumbers
if (flags.includes("hi")) {
  console.log("Hello World!");
}
```

## Read user input

Node has a built-in module to read user input called [Readline](https://nodejs.org/api/readline.html).

To read user input we have to create a new `interface` and associate it with an input and output. In this case we are going to use the standard input and output which is directly available in the `process` variable. Using the interface object we can very easily ask questions to the user.

Once we finish, we have to close the interface to stop the process.

```js showLineNumbers
import * as readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const answer = await rl.question("What's your name? ");

console.log(`Your name is ${answer}`);

rl.close();

/**
 * Output:
 * What's your name? Jose
 * Your name is Jose
 */
```

## Make script globally executable

An easy way of making the script globally executable is to create a new file which will execute the script.
The name of this new file has to be the same as the command name. For example, in our case I want to use the command name `cli-course`. So I created a file called `cli-course` that executes my script file.

```bash:cli-course
node index.js
```

And then run `chmod +x cli-course` to make the new file executable.

Finally, add the path of the project to the `PATH` environment variable.

```bash
export PATH=$PATH:/path/to/project/
```

Now you can run globally the script by typing `cli-course` in the terminal.

```bash
$ cli-course
What's your name? Jose
Your name is Jose
```

## Conclusion

Following these steps you can create a basic CLI tool with Node.js. We've learned how to print text to the console, how to parse arguments, how to read user input and how to make the script globally executable.

If this is not enough you can use libraries like [Inquirer.js](https://www.npmjs.com/package/inquirer). With this library you can:

- provide error feedback
- ask questions
- parse input
- validate answers
- manage hierarchical prompts

It is up to you to decide if you need an external library or not for your tool.

## Resources

- [process - Node.js documentation](https://nodejs.org/api/process.html)
- [Readline - Node.js documentation](https://nodejs.org/api/readline.html)
- [Inquirer.js](https://www.npmjs.com/package/inquirer)
