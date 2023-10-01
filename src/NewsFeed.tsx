import React, {useEffect, useState} from 'react';
import RecyclerView from "./RecyclerView";

interface Source {
    id?: string;
    name: string;
}

interface Feed {
    author?: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage?: string;
}

type Feeds = Feed[];

const NewsFeed: React.FC = () => {
    const [feeds, setFeeds] = useState<Feeds>([]);

    useEffect(() => {
        // Example of fetching data from an API endpoint
        fetch('https://newsapi.org/v2/top-headlines?country=us', {
            headers: {
                "X-Api-Key": "9f6482a584804376874b848980b7a044"
            }
        })
            .then(response => response.json())
            .then(data => {
                setFeeds(data.articles);
            });
    }, []);

    return (
        <div className="news-feed-container">
            {feeds.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <RecyclerView
                    // initialNumToRender
                    keyExtractor={(item) => item.title}
                    itemCount={feeds.length}
                    items={feeds}
                    renderItem={(feed,) =>
                        (
                            <div key={feed.url} className="news-feed-item">
                                <h2>{feed.title}</h2>
                                <p><strong>Author:</strong> {feed.author || 'Unknown'}</p>
                                <p><strong>Source:</strong> {feed.source.name}</p>
                                <p>{feed.description}</p>
                                <p>{feed.content}</p>
                                <a href={feed.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                <img src={feed.urlToImage} alt={feed.title}/>
                                <p><strong>Published At:</strong> {new Date(feed.publishedAt).toLocaleString()}</p>
                            </div>
                        )
                    }/>
            )}
        </div>
    );
}

export default NewsFeed;
