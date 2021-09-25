import { graphql, useStaticQuery } from "gatsby"

type BlogConfigProps = {
  blogConfig: {
    basePath: string
    blogPath: string
    postsPath: string
    pagesPath: string
    tagsPath: string
    externalLinks: {
      name: string
      url: string
    }[]
    navigation: {
      title: string
      slug: string
    }[]
    showLineNumbers: boolean
    showCopyButton: boolean
  }
}

const useBlogConfig = () => {
  const data = useStaticQuery<BlogConfigProps>(graphql`
    query {
      blogConfig {
        basePath
        blogPath
        postsPath
        pagesPath
        tagsPath
        externalLinks {
          name
          url
        }
        navigation {
          title
          slug
        }
        showLineNumbers
        showCopyButton
      }
    }
  `)

  return data.blogConfig
}

export default useBlogConfig
