import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Pagination,
} from '@mui/material';
import Search from './components/Search';
import RecipeGroup from './components/RecipeGroup';
import recipes from './data/recipes.json';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes.groups);
  const [allTags, setAllTags] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const uniqueTags = new Set();
    recipes.groups.forEach(group => {
      group.recipes.forEach(recipe => {
        recipe.tags.forEach(tag => uniqueTags.add(tag));
      });
    });
    setAllTags(Array.from(uniqueTags));
  }, []);

  const handleSearch = (query, tags) => {
    setSearchQuery(query);
    setSelectedTags(tags);

    // Split the search query into individual terms and remove empty terms
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.trim() !== '');

    const filtered = recipes.groups.map(group => ({
      ...group,
      recipes: group.recipes.filter(recipe => {
        // Check if ALL search terms match SOME aspect of the recipe
        const matchesQuery = searchTerms.length === 0 ||
            searchTerms.every(term => {
              return recipe.name.toLowerCase().includes(term) ||
                  recipe.description.toLowerCase().includes(term) ||
                  recipe.ingredients.some(ingredient =>
                      ingredient.toLowerCase().includes(term)) ||
                  recipe.tags.some(tag => tag.toLowerCase().includes(term));
            });

        // Check if recipe has selected tags
        const matchesTags = tags.length === 0 ||
            recipe.tags.some(tag => tags.includes(tag));

        return matchesQuery && matchesTags;
      })
    })).filter(group => group.recipes.length > 0);

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const currentGroups = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Recipe Library
      </Typography>
      
      <Search
        onSearch={handleSearch}
        tags={allTags}
      />

      {currentGroups.map((group) => (
        <RecipeGroup key={group.name} group={group} />
      ))}

      {filteredRecipes.length > itemsPerPage && (
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}

export default App;
