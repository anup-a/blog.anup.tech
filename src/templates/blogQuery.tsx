import { graphql } from "gatsby"
import BlogComponent from "../components/blog"

export default BlogComponent

export const query = graphql`
  query ($formatString: String!) {
    allPost(sort: { fields: date, order: DESC }) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        banner {
          childImageSharp {
            gatsbyImageData(quality: 10)
          }
        }
        timeToRead
        tags {
          name
          slug
        }
      }
    }
  }
`
