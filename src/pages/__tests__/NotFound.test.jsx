import { screen, render } from "@testing-library/react";
import { NotFound } from '../NotFound';

describe('About', () => {
    it('should render correctly', () => {
        render(<NotFound />);

        expect(screen.getByRole('heading')).toMatchSnapshot();
    });
});