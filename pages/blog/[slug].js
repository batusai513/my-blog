import React from 'react';
import axios from 'axios';

export default function Item({ post }) {
  if (Object.keys(post).length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
    </React.Fragment>
  );
}

export function getStaticPaths() {
  return axios
    .get(`${process.env.HOST_NAME}/wp-json/wp/v2/posts`)
    .then(response => {
      return {
        paths: response.data.map(post => `/blog/${post.slug}`), // ['/blog/hello-world', '/blog/titulo']
        fallback: false,
      };
    });
}

export function getStaticProps({ params }) {
  const { slug } = params;
  return axios
    .get(`${process.env.HOST_NAME}/wp-json/wp/v2/posts/?slug=${slug}`)
    .then(response => {
      return {
        props: {
          post: response.data[0] || {},
        },
      };
    });
}
