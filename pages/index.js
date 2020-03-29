import React from 'react';
import Link from 'next/link';
import Axios from 'axios';

export default function Blog({ posts }) {
  return (
    <React.Fragment>
      <h1>Blog</h1>
      {posts.map(post => {
        return (
          <h2 key={post.id}>
            <Link href={`/blog/[slug]`} as={`/blog/${post.slug}`}>
              <a>{post.title.rendered}</a>
            </Link>
          </h2>
        );
      })}
    </React.Fragment>
  );
}

export function getStaticProps() {
  return Axios.get(`${process.env.HOST_NAME}/wp-json/wp/v2/posts`).then(
    response => {
      return {
        props: {
          posts: response.data,
        },
      };
    }
  );
}
