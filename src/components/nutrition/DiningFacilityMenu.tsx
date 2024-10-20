import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Tabs, Tab, Box, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { getMenuForDate, getWeeklyMenu, DailyMenu, MenuCategory } from '../../services/menuService';
import { format, addDays } from 'date-fns';

const DiningFacilityMenu: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [menuData, setMenuData] = useState<DailyMenu | null>(null);
  const [weeklyMenu, setWeeklyMenu] = useState<DailyMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuData();
  }, [selectedDate]);

  const fetchMenuData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dailyMenu = await getMenuForDate(selectedDate);
      setMenuData(dailyMenu);
      const weekly = await getWeeklyMenu();
      setWeeklyMenu(weekly);
    } catch (err) {
      setError('Failed to fetch menu data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedDate(addDays(new Date(), newValue));
  };

  const renderMealSection = (mealType: string, categories: MenuCategory[]) => (
    <Box key={mealType} mb={3}>
      <Typography variant="h6" gutterBottom>
        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
      </Typography>
      {categories.map((category, index) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle1">{category.title}</Typography>
          <List dense>
            {category.items.map((item, itemIndex) => (
              <ListItem key={itemIndex}>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {item.description}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Calories: {item.calories} | Allergens: {item.allergens}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Dining Facility Menu
        </Typography>
        <Tabs
          value={weeklyMenu.findIndex(menu => menu.date === format(selectedDate, 'EEEE'))}
          onChange={handleDateChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {weeklyMenu.map((menu, index) => (
            <Tab key={index} label={menu.date} />
          ))}
        </Tabs>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {menuData && !loading && !error && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              {menuData.date}
            </Typography>
            {Object.entries(menuData.meals).map(([mealType, categories]) =>
              renderMealSection(mealType, categories)
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DiningFacilityMenu;