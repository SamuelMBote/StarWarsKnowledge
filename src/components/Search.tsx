import React from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  CircularProgress,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  LinkProps,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import {APIContext} from '../providers/APIStorage';
import ResourceCard from './ResourceCard';
import {IResource} from '../interfaces/IResouce';

import {useNavigate, useParams, Link as RouterLink} from 'react-router-dom';

const Search = ({resource}: {resource: string}) => {
  const {idpage} = useParams();
  const SEARCH = useFetch();
  const {API_ROOT_URL, FETCH_RESOURCE_LIST} = React.useContext(APIContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    const {url, options} = FETCH_RESOURCE_LIST(resource, idpage);
    SEARCH.request(url, options);
  }, [idpage]);

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

  if (SEARCH && SEARCH.loading) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <LinkRouter to="/" underline="hover" color={'inherit'}>
                Home
              </LinkRouter>
              {idpage ? (
                <LinkRouter
                  to={`/${resource}`}
                  underline="hover"
                  color={'inherit'}
                >
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </LinkRouter>
              ) : (
                <Typography color="text.primary">
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </Typography>
              )}
              {idpage ? (
                <Typography color="text.primary">Page: {idpage}</Typography>
              ) : null}
            </Breadcrumbs>
          </div>
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
  } else if (SEARCH && SEARCH.data) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <LinkRouter to="/" underline="hover" color={'inherit'}>
                Home
              </LinkRouter>
              {idpage ? (
                <LinkRouter
                  to={`/${resource}`}
                  underline="hover"
                  color={'inherit'}
                >
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </LinkRouter>
              ) : (
                <Typography color="text.primary">
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </Typography>
              )}
              {idpage ? (
                <Typography color="text.primary">Page: {idpage}</Typography>
              ) : null}
            </Breadcrumbs>
          </div>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            height={'5vh'}
          >
            <Button
              variant="contained"
              disabled={SEARCH.data.previous === null ? true : false}
              onClick={(event) => {
                event.preventDefault();
                navigate(
                  `/${resource}/page/${new URLSearchParams(
                    SEARCH.data.previous.replace(
                      `${API_ROOT_URL}${resource}/`,
                      '',
                    ),
                  ).get('page')}`,
                );
              }}
            >
              Previous
            </Button>
            <Typography>
              {SEARCH.data.count}
              <Typography variant="h6" component={'span'}>
                {' '}
                {resource.charAt(0).toUpperCase() + resource.slice(1)}{' '}
              </Typography>
              found
            </Typography>
            <Button
              variant="contained"
              disabled={SEARCH.data.next === null ? true : false}
              onClick={(event) => {
                event.preventDefault();
                navigate(
                  `/${resource}/page/${new URLSearchParams(
                    SEARCH.data.next.replace(`${API_ROOT_URL}${resource}/`, ''),
                  ).get('page')}`,
                );
              }}
            >
              Next
            </Button>
          </Stack>
          <Grid
            container
            spacing={2}
            direction={'row'}
            justifyContent={'space-evenly'}
            alignItems={'center'}
            height={'90vh'}
            p={5}
          >
            {SEARCH.data &&
              Array.isArray(SEARCH.data.results) &&
              SEARCH.data.results.map((resource: IResource) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={resource.url}>
                    <ResourceCard url_resource={resource.url} />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </Box>
    );
  } else if (SEARCH && SEARCH.error) {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <LinkRouter to="/" underline="hover" color={'inherit'}>
                Home
              </LinkRouter>
              {idpage ? (
                <LinkRouter
                  to={`/${resource}`}
                  underline="hover"
                  color={'inherit'}
                >
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </LinkRouter>
              ) : (
                <Typography color="text.primary">
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </Typography>
              )}
              {idpage ? (
                <Typography color="text.primary">Page: {idpage}</Typography>
              ) : null}
            </Breadcrumbs>
          </div>
          <Stack
            spacing={2}
            direction={'row'}
            justifyContent={'space-around'}
            alignItems={'center'}
            height={'100vh'}
          >
            <Typography>{SEARCH.error}</Typography>
          </Stack>
        </Container>
      </Box>
    );
  } else {
    return (
      <Box component={'section'}>
        <Container maxWidth={'xl'}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <LinkRouter to="/" underline="hover" color={'inherit'}>
                Home
              </LinkRouter>
              {idpage ? (
                <LinkRouter
                  to={`/${resource}`}
                  underline="hover"
                  color={'inherit'}
                >
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </LinkRouter>
              ) : (
                <Typography color="text.primary">
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </Typography>
              )}
              {idpage ? (
                <Typography color="text.primary">Page: {idpage}</Typography>
              ) : null}
            </Breadcrumbs>
          </div>
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

export default Search;
