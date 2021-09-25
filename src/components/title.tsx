/** @jsx jsx */
import * as React from "react"
import { jsx, Box } from "theme-ui"

type TitleProps = {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  text: string
}

const Title = ({ text, children, as = `h2`, className = `` }: TitleProps) => (
  <div
    sx={{
      justifyContent: `space-between`,
      alignItems: `center`,
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
      mb: 4,
      flexFlow: `wrap`,
      boxSizing: `border-box`,
      display: `flex`,
    }}
  >
    <Box
      as={as}
      sx={{
        fontWeight: `light`,
        fontSize: [1, 2],
        fontFamily: `heading`,
        lineHeight: `heading`,
        color: `heading`,
      }}
      className={className}
    >
      {text}
    </Box>
    <div
      sx={{
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
      }}
    >
      {children}
    </div>
  </div>
)

export default Title
