import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import { OwnerStateThemeType } from './'

const Tooltip = () => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: 7,
          lineHeight: 1.455,
          backgroundColor: hexToRGBA(theme.palette.customColors.tooltipBg, 0.9),
          color: theme.palette.mode === 'light' ? '#FFF8F1' : '#FEF7ED',
          '& .MuiTypography-root': {
            color: 'inherit'
          }
        }),
        arrow: ({ theme }: OwnerStateThemeType) => ({
          color: hexToRGBA(theme.palette.customColors.tooltipBg, 0.9)
        })
      }
    }
  }
}

export default Tooltip
