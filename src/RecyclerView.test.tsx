import {render, screen} from "@testing-library/react";
import NewsFeed from "./NewsFeed";
import RecyclerView from "./RecyclerView";

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

function getTenMockData() {
    const article = mockFeedData.articles[0];

    return Array(10).fill(null).map((_, i) => ({
        ...article,
        id: i,
        title: `${article.title} ${i + 1}`
    }))
}

describe('RecyclerView Component', () => {
    test('initialNumToRender', async () => {
        const data = getTenMockData();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(data)
            })
        ) as jest.Mock<Promise<Response>>;

        render(
            <RecyclerView
                itemSize={50}
                initialNumToRender={3}
                itemCount={data.length}
                items={data}
                renderItem={(item) => (<>
                    <h2>{item.title}</h2>
                </>)}/>
        );

        expect(await screen.findByText('Sample Title 1')).toBeVisible();
        expect(screen.queryByText('Sample Title 4')).toBeNull();
    })
});
