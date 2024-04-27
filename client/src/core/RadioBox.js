import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  radioLabel: {
    marginLeft: theme.spacing(1),
    fontSize: '1rem',
  },
}));

const RadioBox = ({ prices, handleFilters }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div>
      {prices.map((p, i) => (
        <div className={classes.radioContainer} key={i}>
          <Radio
            checked={value === `${p._id}`}
            onChange={handleChange}
            value={`${p._id}`}
            name={p}
            inputProps={{ 'aria-label': 'A' }}
          />
          <label className={classes.radioLabel}>{p.name}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioBox;
