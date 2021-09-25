import React from "react"
import hastToHyperscript from "hast-to-hyperscript"

// Source - https://michal.miskernik.sk/2018-12-16-rendering-html-in-gatsby/
export const renderHtmlToReact = (node: any) => {
  return hastToHyperscript(React.createElement, node)
}
