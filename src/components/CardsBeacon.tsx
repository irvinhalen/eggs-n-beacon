import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

function CardsBeacon() {
  return (
    <Grid container height={1} alignContent={ 'center' }>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card elevation={3} sx={{ margin: '0.5rem 1rem' }}>
                <CardHeader title='Bacons eaten today' />
                <CardContent>
                    <Typography variant='h2' component='div'>
                        69
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card elevation={3} sx={{ margin: '0.5rem 1rem' }}>
                <CardHeader title='Bacons eaten this week' />
                <CardContent>
                    <Typography variant='h2' component='div'>
                        1010
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card elevation={3} sx={{ margin: '0.5rem 1rem' }}>
                <CardHeader title='Smoked Bacons' />
                <CardContent>
                    <Typography variant='h2' component='div'>
                        420
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card elevation={3} sx={{ margin: '0.5rem 1rem' }}>
                <CardHeader title='Eggs' />
                <CardContent>
                    <Typography variant='h2' component='div'>
                        3665
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default CardsBeacon