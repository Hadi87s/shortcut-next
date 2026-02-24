'use client'

import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { ExternalLink, Link, Pin, PinOff } from 'lucide-react'
import { useFavorites } from '../FavoritesContext'

interface NavItemContextMenuProps {
  anchorPosition: { top: number; left: number } | null
  onClose: () => void
  item: { path?: string; title: string; icon?: string }
}

export default function NavItemContextMenu({ anchorPosition, onClose, item }: NavItemContextMenuProps) {
  const { pinItem, unpinItem, isPinned } = useFavorites()
  const pinned = item.path ? isPinned(item.path) : false
  const hasPath = Boolean(item.path)

  const handleOpenNewTab = () => {
    window.open(item.path, '_blank')
    onClose()
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + item.path)
    onClose()
  }

  const handlePinToggle = () => {
    if (!item.path) return
    if (pinned) {
      unpinItem(item.path)
    } else {
      pinItem({ path: item.path, title: item.title, icon: item.icon })
    }
    onClose()
  }

  return (
    <Menu
      open={anchorPosition !== null}
      onClose={onClose}
      anchorReference='anchorPosition'
      anchorPosition={anchorPosition ?? undefined}
    >
      {hasPath && (
        <MenuItem onClick={handleOpenNewTab}>
          <ListItemIcon><ExternalLink size={16} /></ListItemIcon>
          <ListItemText>Open in new tab</ListItemText>
        </MenuItem>
      )}
      {hasPath && (
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon><Link size={16} /></ListItemIcon>
          <ListItemText>Copy link</ListItemText>
        </MenuItem>
      )}
      {hasPath && <Divider />}
      <MenuItem onClick={handlePinToggle} disabled={!hasPath}>
        <ListItemIcon>{pinned ? <PinOff size={16} /> : <Pin size={16} />}</ListItemIcon>
        <ListItemText>{pinned ? 'Unpin' : 'Pin to sidebar'}</ListItemText>
      </MenuItem>
    </Menu>
  )
}
