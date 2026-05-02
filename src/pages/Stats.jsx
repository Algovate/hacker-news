import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchItem, fetchStoryIds } from "../api/hn";
import "./Stats.css";

function buildStats(items) {
  const activeItems = items.filter(Boolean);

  if (activeItems.length === 0) {
    return {
      summary: {
        stories: 0,
        avgScore: 0,
        avgComments: 0,
      },
      leaderboard: [],
    };
  }

  const totalScore = activeItems.reduce((sum, item) => sum + (item.score ?? 0), 0);
  const totalComments = activeItems.reduce(
    (sum, item) => sum + (item.descendants ?? 0),
    0,
  );

  const leaderboard = activeItems
    .map((item) => ({
      name: (item.title || "Untitled").slice(0, 32),
      score: item.score ?? 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return {
    summary: {
      stories: activeItems.length,
      avgScore: Math.round(totalScore / activeItems.length),
      avgComments: Math.round(totalComments / activeItems.length),
    },
    leaderboard,
  };
}

export default function Stats() {
  const [stats, setStats] = useState(() =>
    buildStats([]),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      setLoading(true);
      setError("");

      try {
        const ids = await fetchStoryIds("top");
        const items = await Promise.all(ids.slice(0, 12).map((id) => fetchItem(id)));

        if (isMounted) {
          setStats(buildStats(items));
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load statistics right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="stats-page animate-fade-in">
      <header className="stats-header">
        <h2 className="heading-display text-gradient">Top Story Snapshot</h2>
        <p className="stats-subtitle">
          A quick read on the current front page signal.
        </p>
      </header>

      {loading ? (
        <div className="stats-empty glass-panel">Loading analytics…</div>
      ) : error ? (
        <div className="stats-empty glass-panel">{error}</div>
      ) : (
        <>
          <div className="stats-summary">
            <article className="stats-card glass-panel">
              <span className="stats-label">Stories sampled</span>
              <strong>{stats.summary.stories}</strong>
            </article>
            <article className="stats-card glass-panel">
              <span className="stats-label">Average score</span>
              <strong>{stats.summary.avgScore}</strong>
            </article>
            <article className="stats-card glass-panel">
              <span className="stats-label">Average comments</span>
              <strong>{stats.summary.avgComments}</strong>
            </article>
          </div>

          <div className="stats-chart glass-panel">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={stats.leaderboard}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#141416",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="score" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </section>
  );
}
