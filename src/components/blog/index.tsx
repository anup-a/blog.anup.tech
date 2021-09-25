/** @jsx jsx */
import { Flex, jsx } from "theme-ui"
import Layout from "../layout"
import Seo from "../lekoartsComponents/seo"
import BlogListing from "./blogListing"

type Props = {
  data: {
    allPost: {
      nodes: {
        slug: string
        title: string
        date: string
        excerpt: string
        banner?: any
        description: string
        timeToRead?: number
        tags?: {
          name: string
          slug: string
        }[]
      }[]
    }
  }
  [key: string]: any
}

const Blog = ({ data }: Props) => {
  const posts = data.allPost.nodes

  return (
    <Layout>
      <Seo title="Blog" />
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `flex-end`,
          flexFlow: `wrap`,
        }}
      >
        {/* <Link
          as={GatsbyLink}
          sx={{ variant: `links.secondary`, marginY: 2 }}
          //@ts-ignore
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          View all tags
        </Link> */}
      </Flex>
      <BlogListing posts={posts} />
    </Layout>
  )
}

export default Blog
