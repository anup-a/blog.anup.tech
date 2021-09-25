/** @jsx jsx */
import { Fragment } from "react"
import { jsx, Link } from "theme-ui"
import { Link as GatbsyLink } from "gatsby"
import replaceSlashes from "../utils/replaceSlashes"
import useBlogConfig from "../hooks/useBlogConfig"

type NavigationProps = {
  nav: {
    title: string
    slug: string
  }[]
}

function AsLink(props: any) {
  return <GatbsyLink activeClassName="active" {...props} />
}

const Navigation = ({ nav }: NavigationProps) => {
  const { basePath } = useBlogConfig()

  return (
    <Fragment>
      {nav && nav.length > 0 && (
        <nav
          sx={{
            "a:not(:last-of-type)": { mr: 3 },
            fontSize: [1, `18px`],
            ".active": { color: `heading` },
          }}
        >
          {nav.map(item => (
            <Link
              key={item.slug}
              as={AsLink}
              //@ts-ignore
              to={replaceSlashes(`/${basePath}/${item.slug}`)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </Fragment>
  )
}

export default Navigation
