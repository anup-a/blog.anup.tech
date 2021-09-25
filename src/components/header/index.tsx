/** @jsx jsx */
import { jsx } from "theme-ui"
import { HeaderTitle } from "./headerTitle"
import { useColorMode } from "theme-ui"
import { Flex } from "theme-ui"
import ColorModeToggle from "../lekoartsComponents/colormodeToggle"
import HeaderLinks from "./headerLinks"

interface Props {}

const Header = (props: Props) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`

  const toggleColorMode = (e: any) => {
    e.preventDefault()
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <header sx={{ mb: [3, 4] }}>
      <Flex sx={{ alignItems: `center`, justifyContent: "space-between" }}>
        <HeaderTitle />

        <Flex
          sx={{
            alignItems: "center",
          }}
        >
          <div
            sx={{
              display: `flex`,
              mt: 1,
              mr: 4,
              color: `secondary`,
              a: { color: `secondary`, ":hover": { color: `heading` } },
            }}
          >
            {/* <Navigation nav={nav} /> */}
            <HeaderLinks />
          </div>
          <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
        </Flex>
      </Flex>
    </header>
  )
}

export default Header
