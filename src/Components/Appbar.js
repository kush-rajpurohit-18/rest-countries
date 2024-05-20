import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import {
	AppBar,
	Toolbar,
	useScrollTrigger,
	Slide,
	Typography,
	Button,
} from '@material-ui/core';
import MoonFillIcon from '@material-ui/icons/Brightness2';
import MoonOutlinedIcon from '@material-ui/icons/Brightness2Outlined';

const styles = theme => ({
	appbar: {
		backgroundColor: 'var(--appbar)',
		color: 'var(--text)',
		boxShadow: '0 5px 10px -5px rgb(0 0 0 / 10%)',
		padding: `0 calc(4vw + ${theme.spacing(2)}px)`,
	},
	spaceBetween: {
		justifyContent: 'space-between',
	},
	button: {
		color: 'var(--text)',
		textTransform: 'capitalize',
		fontSize: '14px',
		fontWeight: 600,
	},
});

function HideOnScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

function Appbar(props) {
	const { classes, state, setState } = props;

	const handleLightMode = () => {
		setState('light');
		document.documentElement.setAttribute('data-theme', 'light');
	};

	const handleDarkMode = () => {
		setState('dark');
		document.documentElement.setAttribute('data-theme', 'dark');
	};

	return (
		<HideOnScroll {...props}>
			<AppBar className={classes.appbar} elevation={0}>
				<Toolbar disableGutters className={classes.spaceBetween}>
					<Typography variant='h1' component='h1'>
						Where in the world?
					</Typography>
					<Button
						onClick={state === 'dark' ? handleLightMode : handleDarkMode}
						className={classes.button}
						startIcon={
							state === 'dark' ? <MoonFillIcon /> : <MoonOutlinedIcon />
						}
					>
						Dark Mode
					</Button>
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	);
}

export default withStyles(styles)(Appbar);
