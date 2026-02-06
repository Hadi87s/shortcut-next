import { useSettings } from './useSettings'

export const useToggleMode = () => {
  const { settings, saveSettings } = useSettings()
  const mode = settings.mode

  const toggleMode = () => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    saveSettings({ ...settings, mode: nextMode })
  }

  return { mode, toggleMode }
}
