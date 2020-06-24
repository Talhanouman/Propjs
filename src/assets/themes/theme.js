import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    overrides: {
        MuiListItem: {
            root: {
                paddingTop: 0
            }
        },
        MuiButton: {
            containedPrimary: {
                color: '#FFF'
            }
        },
        MuiTab: {
            textColorInherit: {
                color: '#FFF'
            }
        },
        MuiOutlinedInput: {
            notchedOutline: {
                borderRadius: 8
            },
            input: {
                padding: 12
            }
        },
    },
    sizes: {
        drawerWidth: 150,
    },
    palette: {
        primary: { main: 'rgb(58, 126, 210)', dark: 'rgb(24, 58, 120)' },
        secondary: { main: '#122b3f' },
        background: { main: '#e9ecf2' },
        success: { main: '#00FF00' },
        textOnPrimary: '#FFF',
    //     textOnSurface: '#000',
    //     backgroundColor: '#fafafa'
    },
    typography: {
    //     fontFamily: [
    //         'Roboto',
    //         'sans-serif'
    //     ].join(','),
    //     h1: {
    //         color: 'inherit',
    //         fontSize: '107.23px',
    //         letterSpacing: '-1.5px'
    //     },
    //     h2: {
    //         color: 'inherit',
    //         fontSize: '60px',
    //         letterSpacing: '-0.5px',
    //         fontWeight: '300'
    //     },
    //     h3: {
    //         color: 'inherit',
    //         fontSize: '53.61px',
    //         letterSpacing: '0px'
    //     },
    //     h4: {
    //         color: 'inherit',
    //         fontSize: '37.98px',
    //         letterSpacing: '0.25px'
    //     },
    //     h5: {
    //         color: 'inherit',
    //         fontSize: '26.81px',
    //         letterSpacing: '0px'
    //     },
    //     h6: {
    //         color: 'inherit',
    //         fontSize: '22.34px',
    //         letterSpacing: '0.25px'
    //     },
    //     body1: {
    //         color: 'inherit',
    //         fontSize: '16px',
    //         letterSpacing: '0.5px',
    //         fontWeight: '300'
    //     },
    //     body2: {
    //         color: 'inherit',
    //         fontSize: '14px',
    //         letterSpacing: '0.25px',
    //         fontWeight: '300'
    //     },
    //     subtitle1: {
    //         color: 'inherit',
    //         fontSize: '17.87px',
    //         letterSpacing: '0.15px'
    //     },
        subtitle2: {
            color: '#FFF'
        }
    //         color: 'inherit',
    //         fontSize: '14px',
    //         letterSpacing: '0.1px',
    //         fontWeight: '500'
    //     },
    //     button: {
    //         color: 'inherit',
    //         fontSize: '15.64px',
    //         letterSpacing: '1.25px',
    //         fontWeight: '300',
    //         textTransform: 'none'
    //     },
    //     caption: {
    //         color: 'inherit',
    //         fontSize: '13.4px',
    //         letterSpacing: '0.4px'
    //     },
    //     overline: {
    //         color: 'inherit',
    //         fontSize: '12px',
    //         letterSpacing: '2px',
    //         fontWeight: '400'
    //     }
    }
});
