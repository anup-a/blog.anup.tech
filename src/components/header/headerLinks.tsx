/** @jsx jsx */
import { jsx, Link as TLink } from "theme-ui"
import useBlogConfig from "../../hooks/useBlogConfig"
import { Fragment } from "react"

interface Props {}

const HeaderLinks = (props: Props) => {
  const { externalLinks } = useBlogConfig()

  return (
    <Fragment>
      {externalLinks && externalLinks.length > 0 && (
        <div
          sx={{ "a:not(:first-of-type)": { ml: 3 }, fontSize: [0, 1, `18px`] }}
        >
          {externalLinks.map(link => (
            <TLink key={link.url} href={link.url}>
              {link.name}
            </TLink>
          ))}
        </div>
      )}
    </Fragment>
  )
}

export default HeaderLinks
