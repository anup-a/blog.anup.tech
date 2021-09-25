/** @jsx jsx */
import replaceSlashes from "../../utils/replaceSlashes"
import { Box, Flex, Heading, jsx, Link } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
import Layout from "../layout"
import Seo from "../lekoartsComponents/seo"
import useBlogConfig from "../../hooks/useBlogConfig"
//@ts-ignore
import kebabCase from "lodash.kebabcase"

type Props = {
  data: {
    allPost: {
      group: {
        fieldValue: string
        totalCount: number
      }[]
    }
  }
  [key: string]: any
}

export default function Tags({ data }: Props) {
  const { basePath, tagsPath } = useBlogConfig()
  const list = data.allPost.group
  return (
    <Layout>
      <Seo title="Tags" />
      <Heading as="h1" variant="styles.h1">
        Tags
      </Heading>
      <Box mt={[4, 5]}>
        {list.map(listItem => (
          <Flex
            key={listItem.fieldValue}
            mb={[1, 1, 2]}
            sx={{ alignItems: `center` }}
          >
            <Link
              as={GatsbyLink}
              sx={{ variant: `links.listItem`, mr: 2 }}
              //@ts-ignore
              to={replaceSlashes(
                `/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`
              )}
            >
              {listItem.fieldValue}{" "}
              <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </Link>
          </Flex>
        ))}
      </Box>
    </Layout>
  )
}
