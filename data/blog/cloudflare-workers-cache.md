title: ""
summary: ""
date: "2022-08-24"
tags: []
images: ["/static/images/nodejs.png"]
draft: false
urls:
[]

---

- Cloudflare Workers provides a [serverlessOpen external link](https://www.cloudflare.com/learning/serverless/what-is-serverless/) execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.
- Wrangler is a command-line tool for building [Cloudflare Workers](https://workers.cloudflare.com/)
- [Supabase](https://app.supabase.com/) is a suite of open-source tools wrapping a PostgreSQL database.
- KV Storage is a cache that Cloudflare makes available within our Workers. It replicates across multiple CDN nodes, making it a super performant way to cache data.
- How to make it work:
  - First check if data is cached
  - If not, fetch it and then store it in the cache.
  - If yes, return the cached data.
- Cache can be automatically updated using database webhooks.

## Create a Cloudflare Worker

- Login to Cloudflare with Wrangler CLI: `npx wrangler login`
  ![](/static/images/wrangler-login.png)

- Go to dash.cloudflare.com, choose Workers in the left sidebar, and choose a subdomain that will be used for your workers.

- Create a new project: `npx wrangler init cloudflare-workers-cache`
  Accept all the default options.

- Run `cd cloudflare-workers-cache && npm start`
  If you see any errors on the terminal, press `l` to turn on local mode.

  ```ts
  export default {
    async fetch(): Promise<Response> {
      return new Response("Hello World!");
    },
  };
  ```

## Setup a Supabase database

- Create a new project at https://app.supabase.com/
- Create a table using the SQL Editor with the following script:

```sql
create table if not exists articles (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null
);
```

- And insert some data:

```sql
insert into articles(title, content)
values
	('First blog', 'This is my very first blog'),
	('Second blog', 'I am really enjoying writing blogs'),
	('Third blog', 'Okay, this is getting hard to maintain');
```

## Query Supabase from the Cloudflare Worker

- `npm i @supabase/supabase-js`

- Go to Settings > API in Supabase
  ![](/static/images/settings-api-supabase.png)

- Add a secret for SUPABASE_URL `npx wrangler secret put SUPABASE_URL`
- Add a secret for SUPABASE_ANON_KEY `npx wrangler secret put SUPABASE_ANON_KEY`

## Resources

- [🤠Learn more about the Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler)
- [📖Check out the Workers docs](https://developers.cloudflare.com/workers)
