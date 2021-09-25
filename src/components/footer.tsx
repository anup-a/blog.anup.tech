/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import useSiteMetadata from "../hooks/useSiteMetadata"

const Footer = () => {
  const { siteTitle } = useSiteMetadata()

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
        fontSize: [1],
      }}
    >
      <div sx={{}}>
        &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
      </div>
      <div>
        by
        {` `}
        <Link aria-label="Author" href="https://anup.tech">
          Anup Aglawe
        </Link>
      </div>
    </footer>
  )
}

export default Footer
