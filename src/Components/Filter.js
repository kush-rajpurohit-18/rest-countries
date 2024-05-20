import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowUpIcon from "@material-ui/icons/ExpandLess";
import ArrowDownIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  dropdown: {
    position: "relative",
    width: "200px",
    backgroundColor: "var(--element)",
    boxShadow: "0 0 12px -5px rgb(0 0 0 / 20%)",
    borderRadius: "5px",
  },
  dropdownLabel: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing(1.75)}px ${theme.spacing(2.5)}px`,
    cursor: "pointer",

    "& span": {
      color: "var(--text)",
      fontSize: "14px",
      fontWeight: 300,
    },
  },
  dropdownOptions: {
    position: "absolute",
    top: "55px",
    width: "200px",
    backgroundColor: "var(--element)",
    color: "var(--text)",
    boxShadow: "0 0 12px -5px rgb(0 0 0 / 20%)",
    borderRadius: "5px",
    zIndex: 5,
    overflow: "hidden",
  },
  option: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3.5)}px`,
    cursor: "pointer",
    transition: "background-color 250ms ease",

    "&:hover": {
      backgroundColor: "rgb(0 0 0 / 10%)",
    },
    "&:first-child": {
      padding: `${theme.spacing(2.5)}px ${theme.spacing(3.5)}px ${theme.spacing(
        1
      )}px ${theme.spacing(3.5)}px`,
    },
    "&:last-child": {
      padding: `${theme.spacing(1)}px ${theme.spacing(3.5)}px ${theme.spacing(
        2.5
      )}px ${theme.spacing(3.5)}px`,
    },
  },
  lightIcon: {
    color: "var(--text)",
  },
  darkIcon: {
    color: "var(--text)",
  },
});

function Filter(props) {
  const { classes, state, handleFetchRegion } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function initListeners() {
      document.getElementById("dropdown").addEventListener("click", (e) => {
        fetchRegion(e.target.dataset.value);
        setOpen(false);
      });
    }

    initListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRegion = (region) => {
    handleFetchRegion(region);
  };

  const handleOpenDropdown = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes.dropdownLabel} onClick={handleOpenDropdown}>
        <span>Filter by Region</span>
        {open ? (
          <ArrowUpIcon
            fontSize="small"
            className={state === "dark" ? classes.darkIcon : classes.lightIcon}
          />
        ) : (
          <ArrowDownIcon
            fontSize="small"
            className={state === "dark" ? classes.darkIcon : classes.lightIcon}
          />
        )}
      </div>
      <div
        id="dropdown"
        className={classes.dropdownOptions}
        style={open ? { display: "block" } : { display: "none" }}
      >
        <div className={classes.option} data-value="Africa">
          Africa
        </div>
        <div className={classes.option} data-value="Americas">
          America
        </div>
        <div className={classes.option} data-value="Asia">
          Asia
        </div>
        <div className={classes.option} data-value="Europe">
          Europe
        </div>
        <div className={classes.option} data-value="Oceania">
          Oceania
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Filter);
