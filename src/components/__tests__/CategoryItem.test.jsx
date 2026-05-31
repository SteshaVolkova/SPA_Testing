import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../utils/testing";
import { CategoryItem } from '../CategoryItem';

describe('CategoryItem', () => {
    it('should renders correctly', () => {
        renderWithRouter(
        <CategoryItem
            strCategory="Beef"
            strCategoryThumb="https://www.themealdb.com/images/category/beef.png"
            strCategoryDescription="Beef description"
        />);

        expect(screen.getByRole('article')).toMatchSnapshot();
    });
});