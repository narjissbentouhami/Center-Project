import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import { CardHeader } from '@mui/material'

const AnalyticsDashboard = () => {
  return (
    <div>
      <Grid
        container
        spacing={3}
        maxWidth={1200}
        style={{
          margin: 'auto'
        }}
      >
        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <Icon icon='icon-park-solid:energy-socket' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Energie
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
              onClick={() => {
                window.open('/dashboards/workflow/', '_self')
              }}
            >
              <Icon icon='ep:tools' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Maintenance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
              onClick={() => {
                window.open('/apps/user/view/overview/', '_self')
              }}
            >
              <Icon icon='bi:tools' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Support technique
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
              onClick={() => {
                window.open('/dashboards/occupation/', '_self')
              }}
            >
              <Icon icon='ic:baseline-manage-accounts' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Gestion des espaces
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <Icon icon='material-symbols:fact-check-outline' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Inventaire
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <Icon icon='la:certificate' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Certifications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
              onClick={() => {
                window.open('/pages/account-settings/account/', '_self')
              }}
            >
              <Icon icon='et:documents' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                GED
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={4}>
          <Card
            style={{
              height: '250px',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
              cursor: 'pointer'
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center'
              }}
              onClick={() => {
                window.open('/dashboards/analyticsGestion', '_self')
              }}
            >
              <Icon icon='mdi:people-group' fontSize='5rem' />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Gestion
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default AnalyticsDashboard
