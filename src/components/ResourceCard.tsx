import React from 'react';
import {
  Card,
  Skeleton,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Zoom,
  Stack,
} from '@mui/material';
import convertToRoman from '../functions/ToRomanNumeral';
import {useNavigate} from 'react-router-dom';
import {APIContext} from '../providers/APIStorage';
import useFetch from '../hooks/useFetch';
import {checkIsFilm} from '../interfaces/IFilm';
import {checkIsPeople} from '../interfaces/IPeople';
import {checkIsPlanet} from '../interfaces/IPlanet';
import {checkIsSpecie} from '../interfaces/ISpecie';
import {checkIsStarship} from '../interfaces/IStarship';
import {checkIsVehicle} from '../interfaces/IVehicle';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

const ResourceCard = ({url_resource}: {url_resource: string}) => {
  const {API_ROOT_URL, FETCH_RESOURCE} = React.useContext(APIContext);
  const linkTo = url_resource.replace(`${API_ROOT_URL}`, '');
  const {data, loading, error, request} = useFetch();

  React.useEffect(() => {
    const {url, options} = FETCH_RESOURCE(url_resource);
    request(url, options);
  }, []);

  const navigate = useNavigate();
  if (loading) {
    return (
      <Card>
        <CardActionArea sx={{minHeight: 200}}>
          <CardContent>
            <Typography variant="h3">
              <Skeleton />
            </Typography>
            <Typography variant="subtitle1">
              <Skeleton />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{minHeight: 50}}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={(event) => {
              event.preventDefault();
              navigate(`/${linkTo}`);
            }}
          >
            MORE ABOUT
          </Button>
        </CardActions>
      </Card>
    );
  } else if (data) {
    return (
      <Card>
        <Zoom in={loading === false}>
          <CardActionArea sx={{minHeight: 200}}>
            <CardContent>
              {checkIsFilm(data) && (
                <React.Fragment>
                  <Typography variant="h3">{data.title}</Typography>
                  <Typography variant="subtitle1">
                    Episode: {convertToRoman(data.episode_id)}
                  </Typography>
                </React.Fragment>
              )}
              {checkIsPeople(data) && (
                <Typography variant="h3">{data.name}</Typography>
              )}
              {checkIsPlanet(data) && (
                <React.Fragment>
                  <Typography variant="h3">{data.name}</Typography>
                  <Typography variant="subtitle1">
                    Population {data.population}
                  </Typography>
                </React.Fragment>
              )}
              {checkIsSpecie(data) && (
                <Typography variant="h3">{data.name}</Typography>
              )}
              {checkIsStarship(data) && (
                <React.Fragment>
                  <Typography variant="h3">{data.name}</Typography>
                  <Typography variant="subtitle1">
                    Model {data.model}
                  </Typography>
                </React.Fragment>
              )}
              {checkIsVehicle(data) && (
                <React.Fragment>
                  <Typography variant="h3">{data.name}</Typography>
                  <Typography variant="subtitle1">
                    Model {data.model}
                  </Typography>
                </React.Fragment>
              )}
            </CardContent>
          </CardActionArea>
        </Zoom>
        <CardActions sx={{minHeight: 50}}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={(event) => {
              event.preventDefault();
              navigate(`/${linkTo}`);
            }}
          >
            MORE ABOUT
          </Button>
        </CardActions>
      </Card>
    );
  } else if (error) {
    return (
      <Card>
        <CardActionArea sx={{minHeight: 200}}>
          <CardContent>
            <Stack
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <ErrorOutlinedIcon />
              <Typography color={'red'} variant="body1">
                {error}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{minHeight: 50}}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={(event) => {
              event.preventDefault();
              navigate(`/${linkTo}`);
            }}
          >
            MORE ABOUT
          </Button>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardActionArea sx={{minHeight: 200}}>
          <CardContent>
            <Typography>Not Found</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{minHeight: 50}}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={(event) => {
              event.preventDefault();
              navigate(`/${linkTo}`);
            }}
          >
            MORE ABOUT
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export default ResourceCard;
