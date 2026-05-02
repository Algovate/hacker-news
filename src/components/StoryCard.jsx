import React from "react";
import { MessageCircle, TrendingUp, UserRound } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function storyHost(url) {
  if (!url) return "news.ycombinator.com";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "external";
  }
}

export default function StoryCard({ story, rank }) {
  const {
    by,
    descendants,
    score,
    time,
    title,
    url,
  } = story;

  const publishedAt = time
    ? formatDistanceToNow(new Date(time * 1000), { addSuffix: true })
    : "recently";

  return (
    <article className="story-card glass-panel animate-fade-in">
      <div className="story-rank">{rank}</div>

      <div className="story-content">
        <div className="story-meta-row">
          <span className="story-badge">{storyHost(url)}</span>
          <span className="story-time">{publishedAt}</span>
        </div>

        <a
          className="story-title"
          href={url || `https://news.ycombinator.com/item?id=${story.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {title || "Untitled story"}
        </a>

        <div className="story-stats">
          <span>
            <TrendingUp size={16} />
            {score ?? 0} points
          </span>
          <span>
            <MessageCircle size={16} />
            {descendants ?? 0} comments
          </span>
          <span>
            <UserRound size={16} />
            {by || "unknown"}
          </span>
        </div>
      </div>
    </article>
  );
}
