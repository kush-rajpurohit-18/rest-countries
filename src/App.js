import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Dashboard from './Components/Dashboard';
import CountryDetails from './Components/CountryDetails';

const theme = {
	typography: {
		h1: {
			fontSize: 'clamp(16px, 2vw, 20px)',
			fontWeight: 800,
		},
		h2: {
			fontSize: '17px',
			fontWeight: 800,
			marginBottom: '1rem',
		},
		body1: {
			fontSize: '14px',
			fontWeight: 300,
		},
		body2: {
			fontSize: '14px',
			fontWeight: 600,
		},
	},
};

function App() {
	const [state, setState] = React.useState('light');

	return (
		<ThemeProvider theme={createMuiTheme(theme)}>
			<Router>
				<Switch>
					<Route path='/' exact>
						<Dashboard state={state} setState={setState} />
					</Route>
					<Route path='/:name' exact>
						<CountryDetails state={state} setState={setState} />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
