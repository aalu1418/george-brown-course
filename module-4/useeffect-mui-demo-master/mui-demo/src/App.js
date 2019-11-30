import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100,
      backgroundColor: "red"
    }
  };
});

function App() {
  const [spacing, setSpacing] = React.useState(0);
  const [isChecked, setChecked] = React.useState(false);
  const [isRow, setRow] = React.useState(true);
  const [labelText, setLabelText] = React.useState("Row");
  const classes = useStyles();
  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };
  return (
    <div className="App">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <FormControlLabel
            labelPlacement="top"
            label={labelText}
            control={
              <Switch
                checked={isChecked}
                onChange={() => {
                  setChecked(!isChecked);
                  setRow(isChecked);
                  setLabelText(!isChecked ? "Column" : "Row");
                }}
              />
            }
          />
        </Grid>
        <Grid container justify="center">
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Settings
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RadioGroup
                name="spacing"
                value={spacing.toString()}
                onChange={handleChange}
                row={isRow}
              >
                {[0, 1, 2, 5, 7, 9].map(value => (
                  <FormControlLabel
                    key={value}
                    control={<Radio />}
                    label={value}
                    value={value.toString()}
                  />
                ))}
              </RadioGroup>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
