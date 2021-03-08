import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Paper, IconButton, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import logo from './logo.jpeg'
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    margin: 4,
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
    <div className="header-container">
      <img
        src={logo}
        height="50"
      />
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Global Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Paper>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </div>
  );
}

export default Header;
