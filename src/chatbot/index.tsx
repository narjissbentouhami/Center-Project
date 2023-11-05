import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LinksBar from 'src/components/layouts/LinksBar'
import config from '../utility/chatbot/config'
import ActionProvider from '../utility/chatbot/ActionProvider'
import MessageParser from '../utility/chatbot/MessageParser'
import styles from '../styles/Home.module.css'
import Chatbot from 'react-chatbot-kit'

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='demo-positioned-button'
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        // onClick={handleClick}
      >
        Helpdesk
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        style={{
          height: '500px'
        }}
      >
        {/* <div className={styles.links}>
          <LinksBar />
        </div> */}
        {<Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />}
      </Menu>
    </div>
  )
}
