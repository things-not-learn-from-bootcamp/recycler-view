import NewsFeed from './NewsFeed';
import {render, screen} from "@testing-library/react";

const mockFeedData = {
    articles: [
        {
            author: null,
            content: "Sample Content",
            description: "Sample Description",
            publishedAt: "2023-09-29T04:50:53Z",
            source: {
                id: null,
                name: "NDTV News"
            },
            title: "Sample Title",
            url: "https://www.sampleurl.com",
            urlToImage: "https://www.sampleimageurl.com",
        }
    ]
};

describe('NewsFeed Component', () => {

    it('renders news feed items', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockFeedData)
            })
        ) as jest.Mock<Promise<Response>>;

        render(<NewsFeed/>);

        expect(await screen.findByText('Sample Title')).toBeVisible();
        expect(screen.getByText('Sample Description')).toBeInTheDocument();
        expect(screen.getByText('Sample Content')).toBeInTheDocument();
        expect(screen.getByText('NDTV News')).toBeInTheDocument();
        expect(screen.getByAltText('Sample Title')).toBeInTheDocument();
        expect(screen.getByText(/Read more/).closest('a')).toHaveAttribute('href', 'https://www.sampleurl.com');
    });

    it('renders loading', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([])
            })
        ) as jest.Mock<Promise<Response>>;

        render(<NewsFeed/>);

        expect(await screen.findByText('Loading...')).toBeVisible();
    });
});
