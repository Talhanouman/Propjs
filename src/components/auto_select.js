
import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    cursor: 'default',
    borderColor: '#eee',
    padding: 0,
    minHeight: '56px',
    height: 'auto',
  },
  error: {
    border: 'solid 2px red'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    padding: theme.spacing(1, 1),
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 'inherit',
    fontFamily: theme.typography.fontFamily,
    '&.disabled': {
      color: 'rgba(0, 0, 0, 0.38)'
    }
  },
  placeholder: {
    position: 'absolute',
    left: 16,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily
  },
  paper: {
    position: 'absolute',
    marginTop: 0,
    left: 0,
    zIndex: 99,
    right: 0,
  },
  divider: {
    height: theme.spacing(2)
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {

  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      InputProps={{
        inputComponent,
        inputProps: {
          className: classNames(
            props.selectProps.classes.input
          ),
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      InputLabelProps={{
        shrink: props.menuIsOpen || props.hasValue || props.isFocused,
      }}
      {...props.selectProps.TextFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      disabled={props.data.disabled}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={classNames(
      props.selectProps.classes.singleValue,
      {'disabled': props.isDisabled}
      )} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class IntegrationReactSelect extends React.Component {
  render() {
    const { classes, theme } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.primary.dark,
        '& input': {
          font: 'inherit'
        },
      }),
    };
    // console.log('Selected', this.props.selectedValue)
    // console.log('Options', this.props.options)
    return (
      <div className={classes.root}>
          <Select
            classes={classes}
            styles={selectStyles}
            name={this.props.name || ''}
            TextFieldProps={this.props.textFieldProps}
            options={this.props.options}
            components={components}
            value={this.props.selectedValue}
            isClearable={!this.props.blockTyping}
            isSearchable={!this.props.blockTyping}
            isDisabled={this.props.disabled}
            onFocus={this.props.handleAutoSelectTextChange ? this.props.handleAutoSelectTextChange() : null}
            onInputChange={this.props.handleAutoSelectTextChange ? this.props.handleAutoSelectTextChange() : null}
            onChange={this.props.handleAutoSelectChange(this.props.name)}
            placeholder={this.props.placeholder || ''}
            isMulti={this.props.isMulti}
          />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
