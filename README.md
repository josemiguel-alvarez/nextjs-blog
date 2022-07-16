# My personal blog 📝

## Description

This is my personal blog where I will be posting technical content that I've learned and that I've found interesting.

## Development process

This project has been created using the [NextJS blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) project. It uses Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using Markdown files as the data source.

The blog posts are stored in `/_posts` as Markdown files with front matter support.

The blog posts are created with [`react-markdown`](https://github.com/remarkjs/react-markdown) to convert the Markdown files into an HTML string. [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) is used for the syntax highlighting of the code snippets. The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter).

[react-icons](https://github.com/react-icons/react-icons) is used for the icons of the website.

The styling of the components is done using [Tailwind CSS](https://tailwindcss.com) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3).

## Ideas for future development

- Fetch & display comments from GitHub using GitHub API
- Fetch twitter data related to each post
- Add search bar
- Be able to filter posts by categories

## Deployment

The project is deployed using [Vercel](https://vercel.com/).

- Production URL: [jmalvarez.dev](https://www.jmalvarez.dev/)
