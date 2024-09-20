async function getvideos() {
    const res1 = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC57MB4QxtEQtmqW9zWXzX4jHf631HFL04&q=bankai&type=video&maxResults=3');
    const data1 = await res1.json();

    const videoIds = data1.items.map(item => item.id.videoId).join(',');
    const channelIds = data1.items.map(item => item.snippet.channelId).join(',');

    // Fetch channel thumbnails
    const res2 = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=AIzaSyC57MB4QxtEQtmqW9zWXzX4jHf631HFL04`);
    const data2 = await res2.json();
    const imageUrls = data2.items.map(item => item.snippet.thumbnails.high.url);

    // Fetch video statistics and details
    const res3 = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=AIzaSyC57MB4QxtEQtmqW9zWXzX4jHf631HFL04`);
    const data3 = await res3.json();
    console.log(data3.items[0].snippet.thumbnails.maxres.url)

}
console.log(getvideos())