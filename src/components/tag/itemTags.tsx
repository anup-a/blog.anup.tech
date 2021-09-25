/** @jsx jsx */
import { Fragment } from "react"
import { jsx, Link } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
import replaceSlashes from "../../utils/replaceSlashes"
import useBlogConfig from "../../hooks/useBlogConfig"

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}

const ItemTags = ({ tags }: TagsProps) => {
  const { tagsPath, basePath } = useBlogConfig()

  return (
    <Fragment>
      {tags.map((tag, i) => (
        <Fragment key={tag.slug}>
          {!!i && `, `}
          <Link
            as={GatsbyLink}
            //@ts-ignore
            to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
          >
            {tag.name}
          </Link>
        </Fragment>
      ))}
    </Fragment>
  )
}

export default ItemTags
