import { screen, render } from "@testing-library/react";
import { Footer } from "../Footer";

describe('Header', () => {
    it('should renders correctly', () => {
        render(<Footer />);

        expect(screen.getByText(/Copyright Text/i)).toBeInTheDocument();
        expect(screen.getAllByRole('link')).toHaveLength(1);
    });
});