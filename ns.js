const flexcontainer = document.querySelector('#flexcon')
flexcontainer.innerHTML = ''





function get(url) {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const videoids = data.items.map(item => item.id.videoId).join(',')
            const channelids = data.items.map(item => item.snippet.channelId).join(',')
            return fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=' + videoids + '&key=AIzaSyB6ACeRBkSoDfyKEcBEli-xSmRcsxMmuM4')
        })
        .then(res => res.json())
        .then(data => {
            data.items.forEach(video => {
                if (video.statistics.viewCount > 1000 && video.statistics.viewCount < 1000000){
                    var x = video.statistics.viewCount/1000
                    var New = x.toFixed(1) + "K"
                }
                else if (video.statistics.viewCount < 1000){
                    
                    var New = video.statistics.viewCount
                }
                else{
                    var x = video.statistics.viewCount/1000000
                    var New = x.toFixed(1) + "M"
                }
                
                const div1 = document.createElement("div")
                div1.setAttribute("class", "mainpart")
                const div2 = document.createElement('div')
                div2.setAttribute("class", "one")
                const image1 = document.createElement('img')
                image1.setAttribute("class", 'image')
                const SVG = document.createElement('svg')
                SVG.setAttribute("class", "morevert")
                const div3 = document.createElement('div')
                div3.setAttribute("class", 'bottom')
                const div4 = document.createElement('div')
                div4.setAttribute("class", 'channelimage')
                const videothumbnail = document.createElement('img')
                videothumbnail.setAttribute("class", 'img')
                const info = document.createElement('div')
                info.setAttribute("class", 'info')
                const videotitle = document.createElement('h3')
                videotitle.setAttribute("class", "videotitle")
                const channeltitle = document.createElement('h6')
                channeltitle.setAttribute("class", "channelname")
                const date = document.createElement("span")
                date.setAttribute("class", 'date')
                const Views = document.createElement("h6")
                Views.setAttribute("class", 'views')
                Views.appendChild(date)
                info.appendChild(Views)
                info.appendChild(channeltitle)
                info.appendChild(videotitle)
                div4.appendChild(videothumbnail)
                div3.appendChild(info)
                div3.appendChild(div4)
                div2.appendChild(SVG)
                div2.appendChild(image1)
                div1.appendChild(div2)
                div1.appendChild(div3)
                videoHTML = `
                <div class="mainpart">
        <div class="one">
            <img src="${video.snippet.thumbnails.high.url}" class="image">
            <svg xmlns="http://www.w3.org/2000/svg" class="morevert" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        </div>
        <div class="bottom">
            <div class="channelimage">
                <img class="img" src="./G3.jpg">
            </div>
            <div class="info">
                <h3 class="videotitle">${video.snippet.title.substr(0,11) + "..."}</h5>
                <h6 class="channelname">${video.snippet.channelTitle}</h6>
                <h6 class="views">${New} views.<span class="date">10 months ago</span></h5> 
            </div>
        </div>
    </div>
    `
                flexcontainer.innerHTML += videoHTML
               
            
                
             
            })
        })
}

document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('#flexcon').innerHTML = '';
    let searchvalue = document.querySelector('#searchbar').value
    console.log(searchvalue)

    if (searchvalue) {
        get('https://www.googleapis.com/youtube/v3/search?part=snippet&&key=AIzaSyB6ACeRBkSoDfyKEcBEli-xSmRcsxMmuM4&q=' + searchvalue + '&type=video&maxResults=50')
        searchvalue = '';
    }

}) 
document.querySelector('#icon').addEventListener("click",(e) => {
    document.querySelector('#flexcon').innerHTML = '';
    let searchvalue = document.querySelector('#searchbar').value
    if (searchvalue) {
        get('https://www.googleapis.com/youtube/v3/search?part=snippet&&key=AIzaSyB6ACeRBkSoDfyKEcBEli-xSmRcsxMmuM4&q=' + searchvalue + '&type=video&maxResults=100')
        searchvalue = '';
    }

})
