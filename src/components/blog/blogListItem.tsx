/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box, Flex, Link } from "@theme-ui/components"
import React from "react"
import ItemTags from "../tag/itemTags"
import { Link as GatsbyLink } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type BlogListItemProps = {
  post: {
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
  }
  showTags?: boolean
}

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => {
  const { banner } = post
  const bannerImg = getImage(banner)

  return (
    <Flex
      sx={{
        width: "100%",
        mb: 4,
        flexWrap: "nowrap",
        flexDirection: ["column-reverse", "row", "row"],
      }}
    >
      <Box
        mb={4}
        sx={{
          maxWidth: ["100%", "70%", "70%"],
          mr: [0, 0, 4],
          mt: [4, 0, 0],
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link
          as={GatsbyLink}
          //@ts-ignore
          to={post.slug}
          sx={{
            fontSize: [2, 2, 3],
            color: `text`,
            fontWeight: "semibold",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            // fontFamily: "Wotfard",
          }}
        >
          {post.title}
        </Link>
        <p
          sx={{
            color: `text`,
            mt: 1,
            a: { color: `secondary` },
            fontSize: [0],
          }}
        >
          <time>{post.date}</time>
          {post.tags && showTags && (
            <React.Fragment>
              {` — `}
              <ItemTags tags={post.tags} />
            </React.Fragment>
          )}
        </p>
        <p
          sx={{
            fontSize: [1],
            fontWeight: "light",
            fontFamily: "IBM plex sans",
          }}
        >
          {post.excerpt}
        </p>
      </Box>
      {bannerImg && (
        <GatsbyImage
          image={bannerImg}
          alt=""
          sx={{
            maxWidth: ["100%", "30%", "30%"],
            height: ["150px", "150px", "150px"],
            borderRadius: 6,
          }}
        />
      )}
    </Flex>
  )
}

export default BlogListItem
