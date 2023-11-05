// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
export default function ListPart(props: any) {
  const { data } = props

  return (
    <Card>
      <CardHeader title='Properties' />
      <CardContent className='contentobject2'>
        {data.map((val: any) => (
          <Box key={`item-${val.name}-${val.description}`}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    lineHeight: 1.71,
                    letterSpacing: '0.22px',
                    fontSize: '0.875rem !important'
                  }}
                >
                  {val.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1, color: 'text.secondary', verticalAlign: 'middle' }
                  }}
                >
                  <Typography variant='caption'>{val.description}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
    // <List
    //   sx={{
    //     width: '100%',
    //     maxWidth: 360,
    //     bgcolor: 'background.paper',
    //     position: 'relative',
    //     overflow: 'auto',
    //     maxHeight: 300,
    //     '& ul': { padding: 0 }
    //   }}
    // >
    //   {data.map((val: any) => (
    //     <ListItem key={`item-${val.name}-${val.description}`}>
    //       <ListItemText primary={`${val.name}-${val.description}`} />
    //     </ListItem>
    //   ))}
    // </List>
  )
}
