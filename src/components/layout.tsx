/** @jsx jsx */
import { Box, Flex, jsx } from "theme-ui"
import { Global } from "@emotion/react"
import Seo from "./lekoartsComponents/seo"
import SkipNavLink from "./lekoartsComponents/skip-nav"
import Header from "./header"
import CodeStyles from "./../styles/code"
import Footer from "./footer"
import { getGlobalStyles } from "../styles/global"
import { useColorMode } from "theme-ui"
import { Container } from "theme-ui"

interface Props {
  children: React.ReactNode
  className?: string
}

const Layout = ({ children, className }: Props) => {
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`

  return (
    <div
      sx={{
        backgroundAttachment: "fixed",
        backgroundImage: isDark
          ? "radial-gradient(20.11% 31.28% at 19.47% 19.75%, #3B3A7E 0%, rgba(26, 32, 44, 0) 100%), radial-gradient(39.72% 54.4% at 99.14% 3.22%, #830076 0%, rgba(26, 32, 44, 0) 68.23%), radial-gradient(27.05% 69.25% at 1.17% 74.06%, #830076 0%, rgba(26, 32, 44, 0) 68.75%), radial-gradient(20.45% 37.34% at 87.3% 70.59%, #3B3A7E 0%, #16194F 0.01%, #1A202C 100%)"
          : "radial-gradient(20.11% 31.28% at 19.47% 19.75%, #8AFFCE 0%, rgba(255, 255, 255, 0) 79.09%), radial-gradient(39.72% 54.4% at 99.14% 3.22%, #F2FFBE 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(27.05% 69.25% at 1.17% 74.06%, #F2FFBE 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(21.75% 39.72% at 82.4% 72.97%, #B8FFD4 0%, #84FEB4 0.01%, #FFFFFF 100%)",
      }}
    >
      <Global styles={(t: any) => getGlobalStyles(t)} />
      <Seo />
      <SkipNavLink>Skip to content</SkipNavLink>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box
          id="skip-nav"
          sx={{ ...CodeStyles, flexGrow: 1 }}
          className={className}
        >
          {children}
        </Box>
        <Footer />
      </Container>
    </div>
  )
}

export default Layout
