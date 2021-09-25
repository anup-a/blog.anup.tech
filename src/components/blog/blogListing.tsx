/** @jsx jsx */
import { jsx } from "theme-ui"
import BlogListItem from "./blogListItem"
import { useColorMode } from "theme-ui"

type ListingProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    banner?: any
    tags?: {
      name: string
      slug: string
    }[]
  }[]
  className?: string
  showTags?: boolean
}

const BlogListing = ({
  posts,
  className = ``,
  showTags = true,
}: ListingProps) => {
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`

  return (
    <section
      sx={{
        mb: [4, 4, 6],
        px: [5],
        py: [5],
        backgroundColor: isDark ? `#1A202C9a` : "#ffffff9d",
      }}
      className={className}
    >
      {posts.map(post => (
        <BlogListItem key={post.slug} post={post} showTags={showTags} />
      ))}
    </section>
  )
}

export default BlogListing
