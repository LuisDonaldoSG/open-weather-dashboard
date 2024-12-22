import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "@components/common/Search";
import SelectableCitiesAndDetails from "@components/home/SelectableCitiesAndDetails";
import { dummyDashboardData } from "@utils/staticData";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn().mockReturnValue({
        replace: jest.fn(),
    }),
    useSearchParams: jest.fn(),
    usePathname: jest.fn().mockReturnValue("/"),
}));

describe("Search component", () => {
    it("renders the form and allows user interaction with search", async () => {
        render(<Search />);

        const inputSearch = screen.getByPlaceholderText('Search');

        await userEvent.type(inputSearch, "London");
        expect(inputSearch).toHaveValue("London");

        const button = screen.getByRole('button', { name: 'Search' });
        expect(button).toBeEnabled();
    });

    it("disables the submit button when no search input or operator is selected", async () => {
        render(<Search />);
        const button = screen.getByRole('button', { name: 'Search' });
        expect(button).toBeDisabled();
    });
});

describe("Dashboard render", () => {
    it("renders the search and cities info components", async () => {
        render(<SelectableCitiesAndDetails data={dummyDashboardData} />);
        const cityName = screen.getByText("Mexico City, MX");
        expect(cityName).toBeInTheDocument();
    });
})