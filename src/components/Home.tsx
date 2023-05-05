import React from 'react';
import {
  Box,
  Grid,
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';

import {useNavigate} from 'react-router-dom';
import {APIContext} from '../providers/APIStorage';

const Home = () => {
  const navigate = useNavigate();
  const {API_ROOT_URL, ROOT_RESOURCES} = React.useContext(APIContext);
  function linkTo(link: string): string {
    const to = link.replace(API_ROOT_URL, '');
    return to;
  }

  if (ROOT_RESOURCES && ROOT_RESOURCES.loading) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <Stack
            spacing={2}
            direction={'row'}
            justifyContent={'space-around'}
            alignItems={'center'}
            height={'100vh'}
          >
            <CircularProgress />
          </Stack>
        </Container>
      </Box>
    );
  } else if (ROOT_RESOURCES && ROOT_RESOURCES.data) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <Grid
            container
            spacing={2}
            direction={'row'}
            justifyContent={'space-evenly'}
            alignItems={'center'}
            height={'100vh'}
            p={5}
          >
            {Object.entries(ROOT_RESOURCES.data)
              .sort()
              .map((option) => {
                if (option[1] && typeof option[1] === 'string') {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={option[0]}>
                      <Card variant="outlined">
                        {' '}
                        <CardContent>
                          <Typography variant="h2" component="h2">
                            {option[0].charAt(0).toUpperCase() +
                              option[0].slice(1)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            href={linkTo(option[1])}
                            onClick={(event) => {
                              event.preventDefault();
                              if (option[1] && typeof option[1] === 'string')
                                navigate(linkTo(option[1]));
                            }}
                          >
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                } else {
                  return null;
                }
              })}
          </Grid>
        </Container>
      </Box>
    );
  } else if (ROOT_RESOURCES && ROOT_RESOURCES.error) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <Stack
            spacing={2}
            direction={'row'}
            justifyContent={'space-around'}
            alignItems={'center'}
            height={'100vh'}
          >
            <Typography>{ROOT_RESOURCES.error}</Typography>
          </Stack>
        </Container>
      </Box>
    );
  } else {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <Stack
            spacing={2}
            direction={'row'}
            justifyContent={'space-around'}
            alignItems={'center'}
            height={'100vh'}
          >
            <Typography>Home</Typography>
          </Stack>
        </Container>
      </Box>
    );
  }
};

export default Home;
