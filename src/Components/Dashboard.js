import React from 'react';
import axios from 'axios';
import Media from 'react-media';
import withStyles from '@material-ui/core/styles/withStyles';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Appbar from './Appbar';
import Search from './Search';
import Filter from './Filter';
import Country from './Country';
import Skeleton from './Skeleton';
import {
  API_URL_ALL,
  API_URL_NAME,
  API_URL_REGION,
} from '../Constants/constants';

const styles = (theme) => ({
  wrapperDashboard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
    backgroundColor: 'transparent',
  },
  header: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
    margin: `calc(64px + ${theme.spacing(4.5)}px) 0 ${theme.spacing(4.5)}px 0`,
    padding: `0 calc(4vw + ${theme.spacing(2)}px)`,
    backgroundColor: 'transparent',
  },
  main: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '1440px',
    height: 'auto',
    backgroundColor: 'transparent',
    padding: '0 4vw',
    marginBottom: theme.spacing(5),
  },
});

function Dashboard(props) {
  const { classes, state, setState } = props;
  const [loading, setLoading] = React.useState(true);
  const [countries, setCountries] = React.useState([]);
  let history = useHistory();

  React.useEffect(() => {
    const fetchCountries = () => {
      axios.get(API_URL_ALL).then(({ data }) => {
        setCountries(data);
        setLoading(false);
      });
    };
    countries.length === 0 ? fetchCountries() : setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchRegion = async (region) => {
    setLoading(true);
    const countriesRegion =
      region === 'All'
        ? await axios.get(API_URL_ALL)
        : await axios.get(API_URL_REGION(region));
    setCountries(countriesRegion.data);
    setLoading(false);
  };

  const handleFetchSearch = async (name) => {
    setLoading(true);
    const countriesSearch =
      name === ''
        ? await axios.get(API_URL_ALL)
        : await axios.get(API_URL_NAME(name));
    setCountries(countriesSearch.data);
    setLoading(false);
  };

  const handleTabState = (tab) => {
    const url = String(tab);
    localStorage.setItem('tab', url);
    history.push(`/${url}`);
  };

  return (
    <Grid container className={classes.wrapperDashboard}>
      <Appbar state={state} setState={setState} />
      <Grid container className={classes.header}>
        <Search state={state} handleFetchSearch={handleFetchSearch} />
        <Filter state={state} handleFetchRegion={handleFetchRegion} />
      </Grid>
      <Media query={{ maxWidth: 560 }}>
        {(matches) =>
          matches ? (
            <main className={classes.main} style={{ justifyContent: 'center' }}>
              {loading ? (
                <Skeleton />
              ) : (
                <Country datas={countries} onClickCard={handleTabState} />
              )}
            </main>
          ) : (
            <main
              className={classes.main}
              style={{ justifyContent: 'space-between' }}
            >
              {loading ? (
                <Skeleton />
              ) : (
                <Country datas={countries} onClickCard={handleTabState} />
              )}
            </main>
          )
        }
      </Media>
    </Grid>
  );
}

export default withStyles(styles)(Dashboard);
