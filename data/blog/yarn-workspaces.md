---
title: "Introduction to Monorepos with Yarn Workspaces"
summary: "A monorepo is a repository that contains multiple projects inside of it. Learn here how to setup a monorepo with Yarn."
date: "2022-07-18"
tags: ["yarn", "monorepo"]
draft: false
---

<TOCInline toc={props.toc} asDisclosure />

A monorepo is a repository that contains multiple projects inside of it. For example, a monorepo could contain a frontend app and a backend app. Inside the project there could also be shared libraries. In monorepos it is very easy to make changes to multiple projects at one time.

A monorepo is not the same as a monolith. When you make a change in a monorepo you only have to rebuild the projects that are affected by the change. This is an important point because it lets the teams work independently and improve the developer experience. In a monolith everything is released together. In a monorepo you have flexibility to decide when and what to release.

## Configure workspaces in your package.json

Yarn Workspaces allows us to setup multiple packages in a single repository.

Start by creating a `package.json` in the root of the project and adding the following:

```json:package.json
{
  "private": true,
  "workspaces": ["project-a", "project-b"]
}
```

Each project should be listed in the `workspaces` array.

Then create one subfolder per workspace and add a `package.json` in those subfolders. Let's add some dependencies to see how Yarn handles it.

```json:project-a/package.json
{
  "name": "@jmalvarez/project-a",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "4.17.21",
    "@jmalvarez/project-b": "1.0.0"
  }
}
```

```json:project-b/package.json
{
  "name": "@jmalvarez/project-b",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "4.17.21"
  }
}
```

Our setup is ready. Execute now `yarn install`.

![Project structure](/static/images/yarn-workspaces/project-structure.png)

As you can see, only one `node_modules` folder is created to handle all the dependencies. There are no dependencies duplicated. Furthermore, we didn't need to use `yarn link` to require `project-b` from `project-a`.

## How to run commands

To add new dependencies, you just have to run the appropriate command inside the project subfolder.

```bash
cd project-a
yarn add uuid
```

Another possibility to run commands from the root folder is using `yarn workspace <workspace_name> <command>`. For example, to add a new dependency from the root folder we could do the following:

```bash
yarn workspace @jmalvarez/project-a add uuid
```

If we wanted to execute the same command in every workspace we could do it with `yarn workspaces run <command>`. For example:

```bash
yarn workspaces run test
```

## Resources

- [Yarn Workspaces](https://yarnpkg.com/features/workspaces)
- [yarn workspaces | Yarn](https://classic.yarnpkg.com/en/docs/cli/workspaces)
- [yarn workspace | Yarn](https://yarnpkg.com/cli/workspace)
- [Misconceptions about Monorepos: Monorepo != Monolith](https://blog.nrwl.io/misconceptions-about-monorepos-monorepo-monolith-df1250d4b03c)
