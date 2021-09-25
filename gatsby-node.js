const { createFilePath } = require("gatsby-source-filesystem")
const kebabCase = require(`lodash.kebabcase`)
//@ts-ignore
const blogConfig = require("./blog.config")
//@ts-ignore
const withDefaults = require("./utils/withDefaults")
const path = require("path")

// These template are only data-fetching wrappers that import components
const blogTemplate = require.resolve(`./src/templates/blogQuery.tsx`)
const postTemplate = require.resolve(`./src/templates/postQuery.tsx`)
const tagTemplate = require.resolve(`./src/templates/tagQuery.tsx`)
const tagsTemplate = require.resolve(`./src/templates/tagsQuery.tsx`)

// While creating Post Node from MarkdownRemark node, we need extra resolver to fetch the html & excerpt.
// Since, HTML was not available during PostNode Creation (Investigate)
const mdHTMLResolver =
  (fieldName, subfield = null) =>
  async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`)
    const mdNode = context.nodeModel.getNodeById({
      id: source.parent,
    })
    console.log(type.getFields()[fieldName])
    const resolver = type.getFields()[fieldName].resolve
    const result = await resolver(mdNode, args, context, {
      fieldName,
    })

    const resolvedObject = subfield
      ? result[subfield]
        ? result[subfield]
        : ""
      : result

    console.log(
      "🚀 ~ file: gatsby-node.js ~ line 30 ~ resolvedObject",
      fieldName,
      subfield,
      resolvedObject
    )

    return resolvedObject
  }

exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { createTypes, createFieldExtension } = actions

  // resolver
  createFieldExtension({
    name: `mdHTML`,
    args: {
      fieldName: `String!`,
      subfield: `String`,
    },
    extend({ fieldName, subfield }) {
      return {
        resolve: mdHTMLResolver(fieldName, subfield),
      }
    },
  })

  // creating custom types to create custom nodes
  createTypes(`
      type Post implements Node {
        id: ID!
        slug: String!
        title: String!
        date: Date! @dateformat
        excerpt(pruneLength: Int = 160): String! @mdHTML(fieldName: "excerpt")
        body: String! @mdHTML(fieldName: "body")
        timeToRead: Int @mdHTML (fieldName: "timeToRead")
        tableOfContents: String
        tags: [PostTag]
        banner: File @mdHTML(fieldName: "frontmatter", subfield: "banner") @fileByRelativePath
      }

      type PostTag {
        name: String
        slug: String
      }
      
      type BlogConfig implements Node {
        basePath: String
        blogPath: String
        postsPath: String
        pagesPath: String
        tagsPath: String
        externalLinks: [ExternalLink]
        navigation: [NavigationEntry]
        showLineNumbers: Boolean
        showCopyButton: Boolean
      }
  
      type ExternalLink {
        name: String!
        url: String!
      }
  
      type NavigationEntry {
        title: String!
        slug: String!
      }`)
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions
  createNode({
    ...withDefaults(blogConfig),
    id: createNodeId("custom-blog-config"),
    parent: null,
    children: [],
    internal: {
      type: `BlogConfig`,
      contentDigest: createContentDigest(blogConfig),
      content: JSON.stringify(blogConfig),
      description: `Config Options for Blog`,
    },
  })
}

exports.onCreateNode = ({
  node,
  getNode,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  const { createNodeField, createNode, createParentChildLink } = actions

  if (node.internal.type === "Mdx") {
    // Basically we are modifying remark node by adding a slug field depending upon the fileName
    // createFilePath helps in providing neat slug for each routes
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    // // creates a field inside node with provided data, we are not explicitly modifying the existing node.
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })

    let modifiedTags

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map(tag => ({
        name: tag,
        slug: kebabCase(tag),
      }))
    } else {
      modifiedTags = null
    }

    const fieldData = {
      slug: node.fields.slug ? node.fields.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      timeToRead: node.timeToRead,
      tags: modifiedTags,
    }

    const mdPostId = createNodeId(`${node.id} >>> MdPost`)

    createNode({
      ...fieldData,
      id: mdPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `Post`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Md implementation of the Post interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdPostId) })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const { basePath, blogPath, tagsPath, formatString, postsPrefix } =
    withDefaults(blogConfig)

  createPage({
    path: `/${basePath}`.replace(/\/\/+/g, `/`),
    component: blogTemplate,
    context: {
      formatString,
    },
  })

  createPage({
    path: `/${basePath}/${tagsPath}`.replace(/\/\/+/g, `/`),
    component: tagsTemplate,
  })

  const result = await graphql(`
    query {
      allPost(sort: { fields: date, order: DESC }) {
        nodes {
          slug
        }
      }
      tags: allPost(sort: { fields: tags___name, order: DESC }) {
        group(field: tags___name) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    if (result.errors) {
      reporter.panicOnBuild(
        `There was an error loading your posts or pages`,
        result.errors
      )
      return
    }
  }

  const posts = result.data.allPost.nodes

  if (!posts) {
    console.log("No posts found")
  } else {
    posts.forEach(post => {
      createPage({
        path: `/${postsPrefix}${post.slug}`.replace(/\/\/+/g, `/`),
        component: postTemplate,
        context: {
          slug: post.slug,
          formatString,
        },
      })
    })
  }

  const tags = result.data.tags.group

  if (tags && tags.length > 0) {
    tags.forEach(tag => {
      createPage({
        path: `/${basePath}/${tagsPath}/${kebabCase(tag.fieldValue)}`.replace(
          /\/\/+/g,
          `/`
        ),
        component: tagTemplate,
        context: {
          slug: kebabCase(tag.fieldValue),
          name: tag.fieldValue,
          formatString,
        },
      })
    })
  }
}
