import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const Recipe = ({ recipe }) => {
  return (
    <Accordion>
      <AccordionSummary >
        <Typography variant="h6" style={{ flex: 1 }}>
          {recipe.name}
        </Typography>
        <Box>
          {recipe.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              style={{ margin: '2px' }}
            />
          ))}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Card>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              {recipe.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Ingredients:
            </Typography>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <Typography variant="subtitle1" gutterBottom>
              Instructions:
            </Typography>
            <Typography variant="body1">
              {recipe.instructions}
            </Typography>
          </CardContent>
        </Card>
      </AccordionDetails>
    </Accordion>
  );
};

export default Recipe;
