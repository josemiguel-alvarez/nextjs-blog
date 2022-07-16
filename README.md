# My personal blog 📝

## Description

This is my personal blog where I will be posting technical content that I've learned and that I've found interesting.

## Development process

This project has been created using the [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) project. It uses Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using Markdown files as the data source.

The blog posts are stored in `/data/blog` as Markdown files with front matter support. It also supports Markdown with JSX (`.mdx` files).

### Features

- Easy styling customization with [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) and primary color attribute
- Near perfect lighthouse score - [Lighthouse report](https://www.webpagetest.org/result/210111_DiC1_08f3670c3430bf4a9b76fc3b927716c5/)
- Lightweight, 45kB first load JS, uses Preact in production build
- Mobile-friendly view
- Light and dark theme
- Self-hosted font with [Fontsource](https://fontsource.org/)
- Supports [plausible](https://plausible.io/), [simple analytics](https://simpleanalytics.com/) and google analytics
- [MDX - write JSX in markdown documents!](https://mdxjs.com/)
- Server-side syntax highlighting with line numbers and line highlighting via [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)
- Math display supported via [KaTeX](https://katex.org/)
- Citation and bibliography support via [rehype-citation](https://github.com/timlrx/rehype-citation)
- Automatic image optimization via [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- Flexible data retrieval with [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)
- Support for tags - each unique tag will be its own page
- Support for multiple authors
- Blog templates
- TOC component
- Support for nested routing of blog posts
- Newsletter component with support for mailchimp, buttondown, convertkit, klaviyo, revue, and emailoctopus
- Supports [giscus](https://github.com/laymonage/giscus), [utterances](https://github.com/utterance/utterances) or disqus
- Projects page
- Preconfigured security headers
- SEO friendly with RSS feed, sitemaps and more!

## Ideas for future development

- Improve landing page
- Fetch Twitter engagement data and display it in the post
- Load comments when scrolling down

## Deployment

The project is deployed using [Vercel](https://vercel.com/).

- Production URL: [jmalvarez.dev](https://www.jmalvarez.dev/)
