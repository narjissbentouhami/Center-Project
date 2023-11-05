// ** MUI Import
import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { LinearProgress } from '@mui/material'
const FallbackSpinner = ({ sx, progress }: any) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <img src='/images/logoewane.jpg' alt='' width='100' height='100' />
      {!progress ? (
        <CircularProgress disableShrink sx={{ mt: 6 }} />
      ) : (
        <LinearProgress variant='determinate' value={progress} sx={{ mt: 6, width: 200 }} />
      )}
    </Box>
  )
}

export default FallbackSpinner
