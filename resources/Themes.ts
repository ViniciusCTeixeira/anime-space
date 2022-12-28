import {ThemesColorsProps} from "../types/Themes";

export const lightTheme: ThemesColorsProps = {
    dark: false,
    colors: {
        primary: '#90caf9',
        secondary: '#ce93d8',
        error: '#e57373',
        warning: '#ffb74d',
        info: '#4fc3f7',
        success: '#81c784',
        disabled : 'rgba(0, 0, 0, 0.26)',
        background: '#e3f2fd',
        backgroundPaper: '#f3e5f5',
        backgroundPaper2 : 'rgba(0, 0, 0, 0.12)',
        textPrimary: 'rgba(0, 0, 0, 0.87)',
        textSecondary: 'rgba(0, 0, 0, 0.6)',
        textDisabled: 'rgba(0, 0, 0, 0.38)',
        buttonActive : 'rgba(0, 0, 0, 0.54)',
        buttonHover : 'rgba(0, 0, 0, 0.04)',
        buttonSelected : 'rgba(0, 0, 0, 0.08)',
        divider: 'rgba(0, 0, 0, 0.12)'
    }
}

export const darkTheme: ThemesColorsProps = {
    dark: true,
    colors: {
        primary: '#42a5f5',
        secondary: '#ab47bc',
        error: '#d32f2f',
        warning: '#f57c00',
        info: '#0288d1',
        success: '#388e3c',
        disabled : 'rgba(255, 255, 255, 0.3)',
        background: '#010101',
        backgroundPaper: '#121212',
        backgroundPaper2 : 'rgba(255, 255, 255, 0.12)',
        textPrimary: '#fff',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        textDisabled: 'rgba(255, 255, 255, 0.5)',
        buttonActive : '#fff',
        buttonHover : 'rgba(255, 255, 255, 0.08)',
        buttonSelected : 'rgba(255, 255, 255, 0.16)',
        divider: 'rgba(255, 255, 255, 0.12)'
    }
}