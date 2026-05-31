import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../utils/testing";
import { CategoryList } from '../CategoryList';

describe('CategoryList', () => {
    it('should renders correctly', () => {
        renderWithRouter(
        <CategoryList
            catalog={[
                {
                    idCategory: "1",
                    strCategory: "Beef",
                    strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
                    strCategoryDescription: "Beef description"
                },
                {
                    idCategory: "2",
                    strCategory: "Chicken",
                    strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png",
                    strCategoryDescription: "Chicken description"
                }
            ]}
        />);

        expect(screen.getByRole('list')).toMatchSnapshot();
    });

    it('should render correctly with no items', () => {
        renderWithRouter(<CategoryList />);

        expect(screen.getByRole('list')).toMatchSnapshot();
    });
});