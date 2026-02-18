import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import type { Coordinates } from '@/utils/geo';

const { mockGetZipCoordinatesForUsZip } = vi.hoisted(() => {
  return {
    mockGetZipCoordinatesForUsZip:
      vi.fn<(zipCode: string, signal?: AbortSignal) => Promise<Coordinates | null>>()
  };
});

vi.mock('@/utils/geo', async () => {
  const actual = await vi.importActual<typeof import('@/utils/geo')>('@/utils/geo');
  return {
    ...actual,
    getZipCoordinatesForUsZip: mockGetZipCoordinatesForUsZip
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    mockGetZipCoordinatesForUsZip.mockReset();
    mockGetZipCoordinatesForUsZip.mockImplementation(async (zipCode) => {
      const coordinatesByZip: Record<string, Coordinates> = {
        '30517': { lat: 34.1106, lng: -83.7624 },
        '30533': { lat: 34.5306, lng: -83.984 },
        '30528': { lat: 34.5947, lng: -83.7632 },
        '30143': { lat: 34.4765, lng: -84.4297 },
        '30512': { lat: 34.8762, lng: -83.9582 }
      };

      return coordinatesByZip[zipCode] ?? null;
    });
  });

  it('sorts wineries by distance when a ZIP code is provided', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/your zip code/i), '30517');

    await waitFor(() => {
      expect(screen.getByText(/sorted by distance \(nearest first\)\./i)).toBeInTheDocument();
    });

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);
    expect(headings.indexOf('Chateau Elan Winery & Resort')).toBeLessThan(
      headings.indexOf('Wolf Mountain Vineyards & Winery')
    );

    expect(screen.getByText(/0.0 miles away/i)).toBeInTheDocument();
  });
});
