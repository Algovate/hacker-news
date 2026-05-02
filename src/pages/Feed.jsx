import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStoryIds, fetchItem } from '../api/hn';
import StoryCard from '../components/StoryCard';
import './Feed.css';

export default function Feed() {
  const { feedType } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    async function loadFeed() {
      setLoading(true);
      setStories([]);
      setError('');
      try {
        const type = feedType || 'top';
        const ids = await fetchStoryIds(type);
        // Load first 30 stories
        const firstPageIds = ids.slice(0, 30);
        
        const items = await Promise.all(
          firstPageIds.map(id => fetchItem(id))
        );
        
        if (isMounted) {
          setStories(items.filter(Boolean));
        }
      } catch (err) {
        console.error('Failed to load feed:', err);
        if (isMounted) {
          setError('Unable to load this feed right now.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFeed();
    
    return () => { isMounted = false; };
  }, [feedType]);

  return (
    <div className="feed-container animate-fade-in">
      <header className="feed-header">
        <h2 className="heading-display text-gradient capitalize">{feedType} Stories</h2>
        <p className="feed-subtitle">Real-time updates from Hacker News</p>
      </header>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Fetching the latest news...</p>
        </div>
      ) : error ? (
        <div className="empty-state glass-panel">
          <p>{error}</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="empty-state glass-panel">
          <p>No stories found for this feed.</p>
        </div>
      ) : (
        <div className="story-list">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
