import React, { useState } from 'react';
import {
  TextField,
  Box,
  Chip,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Search = ({ onSearch, tags }) => {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, selectedTags);
  };

  const handleTagClick = (tag) => {
    setSelectedTags([...selectedTags, tag]);
    onSearch(query, [...selectedTags, tag]);
  };

  const handleTagRemove = (tagToRemove) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    onSearch(query, newTags);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                onClick={() => setQuery('')}
                disabled={!query}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ minWidth: '100px' }}
        >
          Search
        </Button>
      </form>

      <Box style={{ marginTop: '10px' }}>
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleTagRemove(tag)}
            style={{ marginRight: '5px' }}
          />
        ))}
      </Box>

      <Box style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            clickable
            onClick={() => handleTagClick(tag)}
            style={{
              backgroundColor: selectedTags.includes(tag) ? '#007bff' : 'transparent',
              color: selectedTags.includes(tag) ? 'white' : undefined,
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default Search;
