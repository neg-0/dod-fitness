import { addDays, format } from 'date-fns';

export interface MenuItem {
  name: string;
  description: string;
  calories: string;
  allergens: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface DailyMenu {
  date: string;
  meals: {
    [key: string]: MenuCategory[];
  };
}

const mockMenuItems: MenuItem[] = [
  { name: 'Grilled Chicken Breast', description: 'Lean protein option', calories: '200', allergens: 'None' },
  { name: 'Steamed Broccoli', description: 'Nutrient-rich vegetable', calories: '55', allergens: 'None' },
  { name: 'Brown Rice', description: 'Whole grain carbohydrate', calories: '216', allergens: 'None' },
  { name: 'Salmon Fillet', description: 'Rich in omega-3 fatty acids', calories: '367', allergens: 'Fish' },
  { name: 'Mixed Green Salad', description: 'Fresh vegetable mix', calories: '33', allergens: 'None' },
  { name: 'Whole Wheat Pasta', description: 'Complex carbohydrate option', calories: '174', allergens: 'Wheat, Gluten' },
  { name: 'Turkey Sandwich', description: 'Lean protein with whole grains', calories: '320', allergens: 'Wheat, Gluten' },
  { name: 'Fresh Fruit Cup', description: 'Assorted seasonal fruits', calories: '60', allergens: 'None' },
];

const generateMockDailyMenu = (date: Date): DailyMenu => {
  const meals = ['breakfast', 'lunch', 'dinner'];
  const mealCategories = ['Main Course', 'Side Dish', 'Dessert'];

  const dailyMenu: DailyMenu = {
    date: format(date, 'EEEE'),
    meals: {},
  };

  meals.forEach(meal => {
    dailyMenu.meals[meal] = mealCategories.map(category => ({
      title: category,
      items: [mockMenuItems[Math.floor(Math.random() * mockMenuItems.length)]],
    }));
  });

  return dailyMenu;
};

export const getMenuForDate = async (date: Date): Promise<DailyMenu | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(generateMockDailyMenu(date));
    }, 500); // Simulate network delay
  });
};

export const getWeeklyMenu = async (): Promise<DailyMenu[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const weeklyMenu = Array.from({ length: 7 }, (_, i) => 
        generateMockDailyMenu(addDays(new Date(), i))
      );
      resolve(weeklyMenu);
    }, 500); // Simulate network delay
  });
};