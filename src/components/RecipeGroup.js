import React from 'react';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';
import Recipe from './Recipe';

const RecipeGroup = ({ group }) => {
  return (
    <Paper elevation={3} style={{ marginBottom: '20px' }}>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          {group.name}
        </Typography>
        {group.recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </Paper>
  );
};

export default RecipeGroup;
