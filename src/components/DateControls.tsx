import * as React from "react";

import { Typography, Box, Tooltip, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

import PreviousIcon from './icons/PreviousIcon';
import NextIcon from './icons/NextIcon';
import TodayIcon from './icons/TodayIcon';
import MoreIcon from './icons/MoreIcon';

function today(): Date {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

type DateControlsProps = {
  onDateChange: (date: Date) => void
}

type DateControlsState = {
  date: Date,
  dateMenuAnchor?: HTMLElement
}

export default class DateControls extends React.Component<DateControlsProps, DateControlsState> {

  constructor(props: DateControlsProps) {
    super(props);
    this.state = {
      date: today(),
      dateMenuAnchor: null
    };
  }

  private dateString() {
    return this.state.date.toLocaleDateString()
  }

  render() {
    return (
      <React.Fragment>
        <Box display={{ xs: 'none', sm: 'block' }} alignItems="center">
          <Tooltip title="Previous day">
            <IconButton
                aria-label="Previous day"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
                onClick={this.handleDatePreviousClick.bind(this)}>
              <PreviousIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="button" noWrap>
            {this.dateString()}
          </Typography>
          <Tooltip title="Next day">
            <IconButton
                aria-label="Next day"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
                onClick={this.handleDateNextClick.bind(this)}>
              <NextIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Today">
            <IconButton
                aria-label="Today"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
                onClick={this.handleDateTodayClick.bind(this)}>
              <TodayIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display={{ xs: 'block', sm: 'none' }}>
          <Tooltip title="Menu">
            <IconButton
                id="date-menu-more"
                aria-label="Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleDateMenuMoreClick.bind(this)}>
              <MoreIcon />
            </IconButton>
          </Tooltip>
          <Menu
              id="date-menu"
              anchorEl={this.state.dateMenuAnchor}
              open={Boolean(this.state.dateMenuAnchor)}
              onClose={this.handleDateMenuClose.bind(this)}>
            <MenuItem disabled={true}>
              <ListItemText primary="Selected date:" secondary={this.dateString()} />
            </MenuItem>
            <MenuItem onClick={this.handleDatePreviousClick.bind(this)}>Previous day</MenuItem>
            <MenuItem onClick={this.handleDateNextClick.bind(this)}>Next day</MenuItem>
            <MenuItem onClick={this.handleDateTodayClick.bind(this)}>Today</MenuItem>
          </Menu>
        </Box>
      </React.Fragment>
    );
  }

  private handleDatePreviousClick(event: React.MouseEvent<HTMLElement>) {
    let date = new Date(this.state.date);
    date.setDate(date.getDate() - 1);
    this.setState({date: date});
    this.props.onDateChange(date);
  }

  private handleDateNextClick(event: React.MouseEvent<HTMLElement>) {
    let date = new Date(this.state.date);
    date.setDate(date.getDate() + 1);
    if (date <= new Date()) {
      this.setState({date: date});
      this.props.onDateChange(date);
    }
  }

  private handleDateTodayClick(event: React.MouseEvent<HTMLElement>) {
    let date = today();
    this.setState({date: date});
    this.props.onDateChange(date);
  }

  private handleDateMenuMoreClick(event: React.MouseEvent<HTMLElement>) {
    this.setState({dateMenuAnchor: event.currentTarget});
  }

  private handleDateMenuClose() {
    this.setState({dateMenuAnchor: null});
  }
}
