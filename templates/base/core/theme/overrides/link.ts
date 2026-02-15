// TODO: TEST

export default {
  MuiLink: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        color: theme.palette.primary.main,
        textDecoration: 'none',
        position: 'relative',
        fontWeight: 500,
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '0%',
          height: '2px',
          bottom: '-2px',
          left: '0',
          backgroundColor: theme.palette.primary.main,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '&:hover': {
          color: theme.palette.primary.dark,
          textDecoration: 'none',
          '&::after': {
            width: '100%'
          }
        },
        '&:active': {
          color: theme.palette.secondary.main,
          transform: 'scale(0.98)'
        },
        '&:visited': {
          color: theme.palette.mode === 'dark' ? theme.palette.brand[400] : theme.palette.brand[600]
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '4px',
          borderRadius: '2px'
        }
      })
    }
  }
}
