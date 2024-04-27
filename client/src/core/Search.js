import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { getCategories, list } from './apiCore';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
  textField: {
    flex: 1,
    borderRadius: 20, // Adjust the value to change the roundness
    backgroundColor: '#f0f0f0', // Adjust the background color
    '& .MuiOutlinedInput-root': {
      borderRadius: 20, // Adjust the value to change the roundness
    },
  },
  iconButton: {
    borderRadius: 20, // Adjust the value to change the roundness
    color: '#000000', // Change the color to black
  },
}));

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;
  const classes = useStyles();

  // Function to load categories
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Function to handle search form submission
  const searchSubmit = (e) => {
    e.preventDefault();
    // Call the searchData function
    searchData();
  };

  // Function to handle changes in input fields
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  // Function to perform search
  const searchData = () => {
    // Check if search query exists
    if (search) {
      list({ search: search || undefined, category: category }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  // Function to render search form
  const searchForm = () => (
    <form onSubmit={searchSubmit} className='d-flex align-items-center'>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>Select</InputLabel>
        <Select
          value={category}
          onChange={handleChange('category')}
          label='Select'
        >
          <MenuItem value='All'>All</MenuItem>
          {categories.map((c, i) => (
            <MenuItem key={i} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={classes.textField}
        variant='outlined'
        label='Search by name'
        onChange={handleChange('search')}
        // InputProps={{
        //   endAdornment: <SearchIcon />,
        // }}
      />
      <IconButton
        className={classes.iconButton}
        type='submit'
      >
        <SearchIcon />
      </IconButton>
    </form>
  );

  // Function to render searched products
  const searchedProducts = () => (
    <div className='row'>
      {results.map((product, i) => (
        <div key={i} className='col-md-4 mb-3'>
          <Card product={product} />
        </div>
      ))}
    </div>
  );

  return (
    <div className='container'>
      <div className='mb-3'>{searchForm()}</div>
      <div>{searched && searchedProducts()}</div>
    </div>
  );
};

export default Search;
