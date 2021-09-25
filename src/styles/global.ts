export const getGlobalStyles = (theme: any) => {
  return {
    "*": {
      boxSizing: `inherit`,
    },
    html: {
      WebkitTextSizeAdjust: `100%`,
    },
    img: {
      borderStyle: `none`,
    },
    pre: {
      fontFamily: `monospace`,
      fontSize: `1em`,
    },
    "[hidden]": {
      display: `none`,
    },
    "::selection": {
      backgroundColor: theme.colors.text,
      color: theme.colors.background,
    },
    a: {
      transition: `all 0.3s ease-in-out`,
      color: `text`,
    },
  } as const
}
