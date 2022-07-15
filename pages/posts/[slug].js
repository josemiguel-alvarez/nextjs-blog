import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Code } from "../../components/code";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import { getAllPosts, getPostBySlug } from "../../lib/api";

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title}</title>
                <meta
                  property="og:image"
                  content={`https://www.jmalvarez.dev${post.ogImage.url}`}
                />
                <meta
                  property="og:url"
                  content={`https://www.jmalvarez.dev${router.asPath}`}
                />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody>
                <ReactMarkdown
                  components={{
                    code: (props) => (
                      <Code className={props.className}>{props.children}</Code>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </PostBody>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "excerpt",
  ]);
  const content = post.content || "";

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
