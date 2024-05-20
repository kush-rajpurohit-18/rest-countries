import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { InputBase, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
	lightIcon: {
		color: 'var(--text)',
		opacity: '0.7',
	},
	darkIcon: {
		color: 'var(--text)',
		opacity: '0.7',
	},
});

const InputSearch = withStyles(theme => ({
	root: {
		backgroundColor: 'var(--element)',
		width: '400px',
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(4),
		padding: `${theme.spacing(1.2)}px ${theme.spacing(2.5)}px`,
		borderRadius: '5px',
		boxShadow: '0 0 12px -5px rgb(0 0 0 / 20%)',
	},
	input: {
		backgroundColor: 'transparent',
		fontSize: '14px',
		fontWeight: 300,
		color: 'var(--text)',

		'&::placeholder': {
			fontSize: '12px',
			fontWeight: 300,
			color: 'var(--text)',
		},
	},
}))(InputBase);

function Search(props) {
	const { classes, state, handleFetchSearch } = props;

	React.useEffect(() => {
		function initListeners() {
			document.getElementById('search').addEventListener('input', e => {
				fetchSearch(e.target.value);
			});
		}

		initListeners();
	}, []);

	const fetchSearch = name => {
		handleFetchSearch(name);
	};

	return (
		<InputSearch
			id='search'
			variant='filled'
			placeholder='Search for a country...'
			startAdornment={
				<InputAdornment position='start'>
					<SearchIcon
						fontSize='small'
						className={state === 'dark' ? classes.darkIcon : classes.lightIcon}
					/>
				</InputAdornment>
			}
		/>
	);
}

export default withStyles(styles)(Search);
