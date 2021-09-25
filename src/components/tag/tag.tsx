/** @jsx jsx */
import { jsx, Link, Divider } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
import replaceSlashes from "../../utils/replaceSlashes"
import { Flex, Heading } from "theme-ui"
import Layout from "../layout"
import Seo from "../lekoartsComponents/seo"
import useBlogConfig from "../../hooks/useBlogConfig"
import BlogListing from "../blog/blogListing"

type Props = {
  data: {
    allPost: {
      nodes: {
        slug: string
        title: string
        date: string
        excerpt: string
        description: string
        timeToRead?: number
        tags: {
          name: string
          slug: string
        }[]
      }[]
    }
    [key: string]: any
  }
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
    [key: string]: any
  }
  [key: string]: any
}

export default function Tag({ data: { allPost }, pageContext }: Props) {
  const { nodes: posts } = allPost
  const { tagsPath, basePath } = useBlogConfig()
  return (
    <Layout>
      <Seo title={`Tag: ${pageContext?.name}`} />
      <Divider />
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
          px: [5],
        }}
      >
        <Heading as="h3" variant="styles.h3" sx={{ marginY: 0 }}>
          {pageContext?.name}
        </Heading>
        <Link
          as={GatsbyLink}
          sx={{ variant: `links.secondary`, marginY: 2 }}
          //@ts-ignore
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          View all tags
        </Link>
      </Flex>
      <BlogListing posts={posts} sx={{ mt: [2, 3] }} />
    </Layout>
  )
}
