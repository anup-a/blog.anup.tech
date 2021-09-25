import React from "react"
import { preToCodeBlock } from "mdx-utils"
import { Text, jsx } from "theme-ui"
import Code from "../components/lekoartsComponents/code"
import Title from "../components/title"

const components = {
  Text: ({ children, ...props }) => <Text {...props}>{children}</Text>,
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
  wrapper: ({ children }) => <>{children}</>,
}

export default components
