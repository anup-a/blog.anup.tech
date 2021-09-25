/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import useBlogConfig from "../../hooks/useBlogConfig"
import replaceSlashes from "../../utils/replaceSlashes"
import useSiteMetadata from "./../../hooks/useSiteMetadata"

export const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata()
  const { basePath, blogPath } = useBlogConfig()

  return (
    <Link
      to={replaceSlashes(`/${basePath}/${blogPath}`)}
      aria-label={`${siteTitle} - Back to home`}
      sx={{ color: `heading`, textDecoration: `none` }}
    >
      <div
        sx={{
          my: 0,
          fontWeight: `semibold`,
          fontSize: [3, 4],
          fontFamily: "Poppins",
        }}
      >
        {siteTitle}
      </div>
    </Link>
  )
}
