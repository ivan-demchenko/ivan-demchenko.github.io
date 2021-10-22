const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

async function createBlogPages(graphql, createPage) {
  const { data } = await graphql(`
    query {
      blog: allMarkdownRemark {
        posts: nodes {
          frontmatter {
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  const { posts } = data.blog;

  posts.forEach((post) => {
    const { slug } = post.fields;
    const { tags } = post.frontmatter;
    createPage({
      path: slug,
      component: path.resolve("./src/dynamicPages/blog-post.tsx"),
      context: { slug, tags },
    });
  });
}

async function createTagsPages(graphql, createPage) {
  const { data } = await graphql(`
    query {
      tags: allMarkdownRemark {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  const tagsSet = new Set();
  const { nodes } = data.tags;
  nodes.forEach(({ frontmatter }) => {
    frontmatter.tags.forEach((tag) => tagsSet.add(tag));
  });
  Array.from(tagsSet).forEach((tag) => {
    createPage({
      path: `/tag/${tag}`,
      component: path.resolve("./src/dynamicPages/tag.tsx"),
      context: { tags: [tag] },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await createBlogPages(graphql, createPage);
  await createTagsPages(graphql, createPage);
};
