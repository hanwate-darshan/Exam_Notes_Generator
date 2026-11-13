/**
 * Searches YouTube Data API v3 for educational lectures matching topic, class, and exam.
 * Uses native fetch (Node 18+). Falls back gracefully to curated queries if API key is pending or quota exhausted.
 */
export async function searchYouTubeLectures({ topic, classLevel = "", examType = "" }) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchQuery = `${topic} ${classLevel} ${examType} one shot revision lecture`.trim();

  // If real API key is present, attempt live YouTube API call
  if (apiKey && apiKey.trim() !== "") {
    try {
      const url = new URL("https://www.googleapis.com/youtube/v3/search");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("q", searchQuery);
      url.searchParams.set("maxResults", "3");
      url.searchParams.set("type", "video");
      url.searchParams.set("relevanceLanguage", "en");
      url.searchParams.set("key", apiKey);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(url.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.items)) {
          return data.items.map((item) => ({
            videoId: item.id?.videoId || "",
            title: item.snippet?.title || `${topic} One Shot Lecture`,
            channelTitle: item.snippet?.channelTitle || "Educational Channel",
            thumbnailUrl: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || "",
            url: `https://www.youtube.com/watch?v=${item.id?.videoId}`
          }));
        }
      }
    } catch (error) {
      console.warn("YouTube API call failed or timed out, using fallback:", error.message);
    }
  }

  // Graceful fallback: Curated educational search recommendations
  const encodedQuery = encodeURIComponent(searchQuery);
  return [
    {
      videoId: "search_1",
      title: `${topic} - Complete One Shot Revision (${classLevel || "Class 11/12"})`,
      channelTitle: "Top Indian Educators (Physics Wallah / Unacademy / Vedantu)",
      thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
      url: `https://www.youtube.com/results?search_query=${encodedQuery}`
    },
    {
      videoId: "search_2",
      title: `${topic} - Key Derivations & Expected Exam Numericals`,
      channelTitle: "Exam Ready Masterclass",
      thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + " important derivations numericals " + examType)}`
    },
    {
      videoId: "search_3",
      title: `${topic} - 30-Minute Fast Track Crash Course`,
      channelTitle: "Concept Booster Academy",
      thumbnailUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + " 30 min revision " + classLevel)}`
    }
  ];
}
