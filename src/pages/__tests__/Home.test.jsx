import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../utils/testing';
import * as api from '../../api';
import { categories } from '../../mocks/mocks-data';
import { Home } from '../Home';

const apiSpy = jest.spyOn(api, 'getAllCategories');

describe('Home', () => {
    it('should render Home', async () => {
        apiSpy.mockResolvedValueOnce({ categories });

        renderWithRouter(<Home />);

        const preloader = screen.getByRole('progressbar');

        expect(preloader).toBeInTheDocument();
        expect(screen.getByRole('searchbox')).toBeInTheDocument();

        await waitForElementToBeRemoved(preloader);

        expect(screen.getAllByRole('article')).toHaveLength(3);
    });

    it('should render Home with search', async () => {
        apiSpy.mockResolvedValueOnce({ categories });

        // в MemoryRouter есть особая опция,
        // которая называется initialEntries.
        // initialEntries - это массив с конкретными страницами.
        // у нас есть результат поиска(если  пользователь что-то
        // искал на странице и перезагрузил страницу), а это начит,
        // что по этому результату поиска на странице будет
        // осуществляться (setFilteredCatalog) фильтрация.
        // Судя по поиску first, должна остаться только перая категория.
        renderWithRouter(<Home />, {
            initialEntries: ['/?search=first'],
        });

        const preloader = screen.getByRole('progressbar');

        expect(preloader).toBeInTheDocument();

        await waitForElementToBeRemoved(preloader);

        expect(screen.getAllByRole('article')).toHaveLength(1);
    });

    it('should render Home with search user interaction', async () => {
        // так как мы проверяем поиск, то запрос к данным
        // будет не один раз, поэтому mockResolvedValueOnce (как выше),
        // нам уже не подходит.
        apiSpy.mockResolvedValue({ categories });

        renderWithRouter(<Home />);

        const preloader = screen.getByRole('progressbar');
        const input = screen.getByRole('searchbox');

        expect(preloader).toBeInTheDocument();

        await waitForElementToBeRemoved(preloader);

        expect(screen.getAllByRole('article')).toHaveLength(3);

        // ждём пока пользователь что-то введёт
        // в поиск и останется отфильтрованный списаок
        await userEvent.type(input, 'first');
        await userEvent.click(screen.getByRole('button'));

        expect(screen.getAllByRole('article')).toHaveLength(1);
    });
});