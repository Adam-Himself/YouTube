const flexcontainer = document.querySelector('#flexcon')
flexcontainer.innerHTML = ''
function timeSince(date) {
    const now = new Date();
    const videoDate = new Date(date);
    console.log(videoDate)
    const seconds = Math.floor((now - videoDate) / 1000);
    
    let interval = Math.floor(seconds / 31536000); // Years
    if (interval >= 1) {
        return interval === 1 ? `${interval} year ago` : `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000); // Months
    if (interval >= 1) {
        return interval === 1 ? `${interval} month ago` : `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400); // Days
    if (interval >= 1) {
        return interval === 1 ? `${interval} day ago` : `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600); // Hours
    if (interval >= 1) {
        return interval === 1 ? `${interval} hour ago` : `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60); // Minutes
    if (interval >= 1) {
        return interval === 1 ? `${interval} minute ago` : `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
}


async function get(url) {
    try {
      // Fetch video data
      const res1 = await fetch(url);
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
  
      // Loop through each video item
      data3.items.forEach((video, index) => {
        const imageUrl = imageUrls[index];
        const publishedAt = video.snippet.publishedAt;
       
        const timeAgo = timeSince(publishedAt);
  
        // Regex to extract hours, minutes, and seconds from duration
        const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
        const matches = video.contentDetails.duration.match(regex);
        const hours = matches[1] ? parseInt(matches[1]) : 0;
        const minutes = matches[2] ? parseInt(matches[2]) : 0;
        const seconds = matches[3] ? parseInt(matches[3]) : 0;
  
        // Format duration
        let dur;
        if (hours > 0 && seconds < 10 && minutes < 10) {
          dur = `${hours}:0${minutes}:0${seconds}`;
        }else if (hours <= 0 && seconds < 10 && minutes < 10) {
          dur = `${minutes}:0${seconds}`;
        }
        else if (minutes > 0) {
          dur = `${minutes}:${seconds}`;
        }else if (minutes > 0 && seconds < 10) {
          dur = `${minutes}:0${seconds}`;
        }
        else {
          dur = `${hours}:${minutes}:${seconds}`;
        }
  
        // Format views
        let viewCount = video.statistics.viewCount;
        let viewText = viewCount;
        if (viewCount > 1000 && viewCount < 1000000) {
          viewText = (viewCount / 1000).toFixed(1) + 'K';
        } else if (viewCount >= 1000000) {
          viewText = (viewCount / 1000000).toFixed(1) + 'M';
        }
        console.log(video.id)
  
        // Generate HTML for each video
        const videoHTML = `
          <div class="mainpart">
            <div class="one" data-video-id="${video.id}">
              <img src="${video.snippet.thumbnails.high.url}" class="image">
              <svg xmlns="http://www.w3.org/2000/svg" class="morevert" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
              </svg>
              <div class='duration'>${dur}</div>
            </div>
            <div class="bottom">
              <div class="channelimage">
                <img class="img" src="${imageUrl}">
              </div>
              <div class="info">
                <h3 class="videotitle">${video.snippet.title.substr(0, 11) + "..."}</h3>
                <h6 class="channelname">${video.snippet.channelTitle}</h6>
                <h6 class="views">${viewText} views.<span class="date">${timeAgo}</span></h6>
              </div>
            </div>
          </div>
        `;
  
        // Append the generated HTML to the container
        document.getElementById('flexcon').innerHTML += videoHTML;
      });
      
      document.querySelectorAll(".one").forEach(video => {
        video.addEventListener("click", () => {
          const VIDEOID = video.getAttribute('data-video-id')
          window.location.href = (`index3.html?VIDEOID=${VIDEOID}`)
        })
      }
      )
  
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }
  


document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('#flexcon').innerHTML = '';
    let searchvalue = document.querySelector('#searchbar').value
    console.log(searchvalue)

    if (searchvalue) {
        get('https://www.googleapis.com/youtube/v3/search?part=snippet&&key=AIzaSyC57MB4QxtEQtmqW9zWXzX4jHf631HFL04&q=' + searchvalue + '&type=video&maxResults=50')
        searchvalue = '';
    }

}) 
document.querySelector('#icon').addEventListener("click",(e) => {
    document.querySelector('#flexcon').innerHTML = '';
    let searchvalue = document.querySelector('#searchbar').value
    if (searchvalue) {
        get('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC57MB4QxtEQtmqW9zWXzX4jHf631HFL04&q=' + searchvalue + '&type=video&maxResults=100')
        searchvalue = '';
    }

})
