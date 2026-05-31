import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../utils/testing";
import { MealList } from '../MealList';

describe('MealList', () => {
    it('should render correctly', () => {
        renderWithRouter(
            <MealList
                meals={[
                    {
                        strMeal: "Cheese cake",
                        idMeal: "123",
                        strMealThumb: "/meal.png"
                    },
                    {
                        strMeal: "Chocolate cake",
                        idMeal: "456",
                        strMealThumb: "/choco.png"
                    }
                ]}
            />
        );

        expect(screen.getByRole('list')).toMatchSnapshot();
    });
});