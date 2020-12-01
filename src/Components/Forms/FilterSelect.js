import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function FilterSelect({ fields = [], addToList = null, removeFromList = null }) {


  const classes = useStyles();

  const [filteredFields, setFilterList] = useState([])
  const [filterTerm, setFilterTerm] = useState('')
  const handleFilter = (event) => {
    setFilterTerm(event.target.value)
    let arr = fields.filter((d) => d.includes(filterTerm))
    setFilterList(arr)
  }
  return (
    <div>
      <TextField variant="outlined" label="Filter by..." onChange={handleFilter} />


      <List className={classes.root} subheader={<li />}>
        {filteredFields.map((d) => <p id={d} onClick={addToList} class="chip">{d}</p>)}
      </List>
    </div>
  )
}

