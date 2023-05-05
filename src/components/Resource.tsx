import React from 'react';
import {useParams} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {APIContext} from '../providers/APIStorage';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  Grow,
  Link,
  LinkProps,
  Breadcrumbs,
} from '@mui/material';
import ResourceCard from './ResourceCard';
import {Link as RouterLink} from 'react-router-dom';
const Resource = ({resource_url}: {resource_url: string}) => {
  const {id} = useParams();
  const RESOURCE = useFetch();
  const {API_ROOT_URL} = React.useContext(APIContext);
  const RegexpURL = new RegExp(
    /\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
  );

  React.useEffect(() => {
    RESOURCE.request(`${API_ROOT_URL}${resource_url}/${id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
  }, [id, resource_url]);

  React.useEffect(() => {
    if (RESOURCE.data && 'url' in RESOURCE.data) {
      console.log(RESOURCE.data);
      console.log(RegexpURL.test(RESOURCE.data.url));
    }
  }, [RESOURCE.data]);
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }
  interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
  }
  function LinkRouter(props: LinkRouterProps) {
    return <Link {...props} component={RouterLink as any} />;
  }
  if (RESOURCE && RESOURCE.loading) {
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
  } else if (RESOURCE && RESOURCE.data) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <LinkRouter to="/" underline="hover" color={'inherit'}>
                Home
              </LinkRouter>
              <LinkRouter
                to={`/${resource_url}`}
                underline="hover"
                color={'inherit'}
              >
                {resource_url.charAt(0).toUpperCase() + resource_url.slice(1)}
              </LinkRouter>
              <Typography color="text.primary">
                {RESOURCE.data.name || RESOURCE.data.title}
              </Typography>
            </Breadcrumbs>
          </div>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant="h2" component={'h2'}>
              {RESOURCE.data.title || RESOURCE.data.name}
            </Typography>
          </Stack>
          {Object.entries(RESOURCE.data).map((info) => {
            if (typeof info[1] === 'string' && RegexpURL.test(info[1])) {
              return (
                <React.Fragment key={info[0]}>
                  {' '}
                  <Typography
                    variant="body1"
                    component={'p'}
                    sx={{fontWeight: 'bold'}}
                    py={1}
                  >
                    {info[0].charAt(0).toUpperCase() + info[0].slice(1)} :
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    direction={'row'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                  >
                    <Grid item xs={12} md={6} lg={4}>
                      <ResourceCard url_resource={info[1]} />
                    </Grid>
                  </Grid>
                </React.Fragment>
              );
            } else if (typeof info[1] === 'string') {
              return (
                <Typography
                  key={info[0]}
                  variant="body1"
                  component={'p'}
                  sx={{fontWeight: 'bold'}}
                  py={1}
                >
                  {info[0].charAt(0).toUpperCase() + info[0].slice(1)} :{' '}
                  <Grow in={RESOURCE.loading === false}>
                    <Typography variant="body1" component={'span'}>
                      {info[1]}
                    </Typography>
                  </Grow>
                </Typography>
              );
            } else if (Array.isArray(info[1])) {
              return (
                <React.Fragment key={info[0]}>
                  {' '}
                  <Typography
                    variant="h5"
                    component={'p'}
                    sx={{fontWeight: 'bold'}}
                    py={1}
                  >
                    {info[0].charAt(0).toUpperCase() + info[0].slice(1)} :
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    direction={'row'}
                    alignItems={'center'}
                  >
                    {info[1].map((item) => {
                      return (
                        <Grid key={item} item xs={12} md={6} lg={4}>
                          <ResourceCard
                            key={item}
                            url_resource={item}
                          ></ResourceCard>
                        </Grid>
                      );
                    })}
                  </Grid>
                </React.Fragment>
              );
            } else {
              return null;
            }
          })}
        </Container>
      </Box>
    );
  } else if (RESOURCE && RESOURCE.error) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <Stack
            spacing={2}
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100vh'}
          >
            <ErrorOutlinedIcon fontSize={'large'} sx={{fontSize: 42}} />
            <Typography color={'red'}>{RESOURCE.error}</Typography>
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
            <Typography>Search</Typography>
          </Stack>
        </Container>
      </Box>
    );
  }
};

export default Resource;
