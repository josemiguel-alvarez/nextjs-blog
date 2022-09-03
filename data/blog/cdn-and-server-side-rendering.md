---
title: "CDN Caching, Static Site Generation and Server Side Rendering"
summary: "Here we are analyzing the different types of pre rendering a website and its combination with a CDN."
date: "2022-09-04"
tags: ["static-site-generation", "server-side-rendering", "cdn", "cache"]
images: ["/static/images/cdn-and-server-side-rendering.png"]
draft: false
urls:
  [
    "https://dev.to/jmalvarez/cdn-caching-static-site-generation-and-server-side-rendering-4hom",
  ]
dev_to: "https://dev.to/jmalvarez/cdn-caching-static-site-generation-and-server-side-rendering-4hom"
---

<TOCInline toc={props.toc} asDisclosure />

Here we are analyzing the different types of pre-rendering a website and its combination with a CDN.

## Static Site Generation

Every single page of a website is first built and then uploaded to a CDN. The best part of this is that, as the website is static, the user does not have to interact with the server. The CDN can directly return the static generated site, so the user gets a **fast response**.

The disadvantage is that every time you want to update the website you have to build the whole website again and upload it to the CDN. This costs money.

## Server Side Rendering without CDN

Pages are built on demand with Server Side Rendering. When a user requests a page the user has to wait until the page is built and returned from the server. Because of this, **response time is slow**.

Every visit to a page generates a build. In comparison to Static Site Generation where every page is always built, here **only the pages that are visited are built**. If no one visits a page, it is never built.

The disadvantage is that for every request we have to build the page.

## Server Side Rendering with CDN

In this case the first visitor of a page requests the page to the CDN and the CDN requests it to the server which builds it and returns it back. But for the second visitor the CDN will already have the page at cache and can directly return it without generating a new build.

The problem here is that every next visitor is going to receive the build that was generated for the first visitor. What happens if the page is stale?
With [max-age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#response_directives) we can control how long the page can be cached. When the page is stale, the CDN will request a new build on the next request after `max-age`. Depending on the kind of the page we could set a different `max-age`.

We can combine `max-age` with `s-maxage`. The CDN will cache a page using `s-maxage` instead of `max-age` if it is present. User's browser will ignore `s-maxage`. This can be very useful if we purge the website pages in the CDN when they are rebuilt.

As we don't have control over the user's browser, we should have a `max-age` that is lower than the `s-maxage`, otherwise, we could have an updated version of a page in the CDN which the user would never request because the user's browser had an older version which would be still valid according to `max-age`.

For example, we could set a `max-age` of one minute or one day and a `s-maxage` of one year. This way the user would request the page to the CDN frequently and the CDN would never request a new build because according to `s-maxage` the page would still be valid. We would update the cache on the CDN by purging the previous page and uploading the new one.

## Incremental Static Site Regeneration

Initially the whole website is built and uploaded to the CDN as with Static Site Generation. But here if a user requests a page the CDN will return the current cached page and it will also request to the server a new build of **only that page**. This way, **the next user will get the new build** and the CDN will again request a new one to the server.

Every user gets a fast response and only the pages that are requested are updated.

This is a technique used by Next.js, I recommend reading [their documentation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) to get a better understanding of this.

## Server Side Rendering with Stale While Revalidate

[stale-while-revalidate](https://web.dev/stale-while-revalidate/) can be added to the `cache-control` header. What does it do? If a request comes after `max-age` the CDN returns a stale version of the page while the server is building a fresh one. `stale-while-revalidate` specifies in seconds for how long can the stale version be returned.

The first time a user requests a page it will be generated in the server and uploaded to the CDN. If a new request comes before `max-age` then the CDN will just return it. If a request comes after `max-age` then the CDN will return the stale version but this time it will request the server a new fresh copy. Every user that requests the page while it is being built will get the stale version.

If after `max-age` a request comes and `stale-while-revalidate` has also passed, then the CDN won't return a stale version and it will wait until a new version is generated in the server.

From the user's perspective it is exactly the same as Incremental Static Site Regeneration. Only that here we don't have to build the whole website for the first deployment, the first visitor will trigger the build of the page that he's visiting.

## Resources

- [Next.js documentation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Web.dev stale-while-revalidate](https://web.dev/stale-while-revalidate/)
- [MDN cache-control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Youtube.com CDN Caching, Static Site Generation, and Server Side Rendering](https://www.youtube.com/watch?v=bfLFHp7Sbkg)
