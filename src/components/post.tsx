/** @jsx jsx */
import { Fragment } from "react"
import { jsx, Heading, useColorMode } from "theme-ui"
import Layout from "./layout"
import Seo from "./lekoartsComponents/seo"
import ItemTags from "./tag/itemTags"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box } from "theme-ui"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type Props = {
  data: {
    post: {
      slug: string
      title: string
      date: string
      tags?: {
        name: string
        slug: string
      }[]
      description?: string
      canonicalUrl?: string
      body: string
      excerpt: string
      timeToRead?: number
      banner?: any
    }
    [key: string]: any
  }
  [key: string]: any
}

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map(v => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

export default function BlogPost({ data: { post } }: Props) {
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const { banner } = post
  const bannerImg = banner ? getImage(banner) : undefined

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
        pathname={post.slug}
        canonicalUrl={post.canonicalUrl}
      />

      <Box
        sx={{
          pb: 3,
          mt: 0,
          backgroundColor: isDark ? `#1A202C9a` : "#ffffff9d",
        }}
      >
        {bannerImg && (
          <GatsbyImage image={bannerImg} alt="" sx={{ maxHeight: "400px" }} />
        )}
        <Box px={5}>
          <Heading as="h4" variant="styles.h2" mt={5}>
            {post.title}
          </Heading>
          <p
            sx={{
              color: `secondary`,
              mt: 3,
              a: { color: `secondary` },
              fontSize: [1, 1, 2],
            }}
          >
            <time>{post.date}</time>
            {post.tags && (
              <Fragment>
                {` — `}
                <ItemTags tags={post.tags} />
              </Fragment>
            )}
            {post.timeToRead && ` — `}
            {post.timeToRead && <span>{post.timeToRead} min read</span>}
          </p>
          <section
            sx={{
              my: 5,
              ".gatsby-resp-image-wrapper": {
                my: [4, 4, 5],
                boxShadow: shadow.join(`, `),
              },
              variant: `layout.content`,
              fontFamily: `IBM plex sans`,
            }}
          >
            <MDXRenderer>{post.body}</MDXRenderer>
          </section>
        </Box>
      </Box>
    </Layout>
  )
}
