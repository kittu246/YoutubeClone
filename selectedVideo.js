const API_KEY = "AIzaSyDc9OOshV9-8IUjdQYgD1G0y3_QZl0xXKA";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

let urlParam = new URLSearchParams(window.location.search);

let videoID = urlParam.get("videoId");
let VideoContainer = document.getElementById("mainVideo");

// window.postMessage(message, "http://127.0.0.1:5500");

window.addEventListener("load", () => {
  if (YT) {
    new YT.Player(VideoContainer, {
      height: "400",
      width: "780",
      videoId: videoID,
    });
  }
});

let selectedVideoInfo = document.getElementById("mainVideoInfo");

selectedVideoInfo.innerHTML = `
<h3>Video Title</h3>
        <div class="videoInfo">
          <div class="channel">
            <img />
            <div>
              <h4>Channel Name</h4>
              <p>subscribers</p>
            </div>
            <button class="subscribe">Subscribe</button>
          </div>

          <div class="channel">
            <button class="likeButton">
                <i class="fa-regular fa-thumbs-up" style="color: #080808;"></i>
                <p>like</p>
                <div class="horizontalLine"></div>
                <i class="fa-regular fa-thumbs-down" style="color: #080808;"></i>
            </button>
            <button class="likeButton">
                <i class="fa-regular fa-share-from-square" style="color: #0a0a0a;"></i>
                Share
            </button>
            <button class="likeButton">
                <i class="fa-solid fa-ellipsis" style="color: #0c0d0d;"></i>
            </button>
          </div>
        </div>`;

// get comments
async function getComments(specificvideoID) {
  try {
    // let response = await fetch(`${BASE_URL}/commentThreads?key=${API_KEY}&videoId=${specificvideoID}&maxResults=25&part=snippet`)
    let response = await fetch("./comments.json");

    const data = await response.json();

    let commentsArr = data.items;

    // console.log(commentsArr);
    displayComments(commentsArr);
  } catch (err) {
    console.log(err);
  }
}

getComments(videoID);

let userCommentDiv = document.getElementById("userCommentSection");

function displayComments(data) {
  for (let ele of data) {

    // console.log(ele);
    let individualCommentDiv = document.createElement("div");

    individualCommentDiv.innerHTML = `
<div class="userComment channel">
            
              <img src="${ele.snippet.topLevelComment.snippet.authorProfileImageUrl
              }">
              
          
          <div class="userCommented">
              <p>@${ele.snippet.topLevelComment.snippet.authorDisplayName}</p>
              <p>${ele.snippet.topLevelComment.snippet.textDisplay}</p>
          </div>
          </div>
          <div class="comentLikeDislike">
           <div>
            <i class="fa-regular fa-thumbs-up" style="color: #080808"></i>

            <i class="fa-regular fa-thumbs-down" style="color: #080808"></i>
          </div>
          <p>Reply</p>

          </div>
`;
    userCommentDiv.appendChild(individualCommentDiv);
  }
}


// get recommended videos

async function getRecommendedVideos (specificvideoID){

  try{
    // console.log(specificvideoID);
   

    let response = await fetch(`${BASE_URL}/search?key=${API_KEY}&relatedToVideoId=${specificvideoID}&type=video&maxResults=10`);

  let data = await response.json();

  console.log(data);
  }

  catch(err){
    console.log(err);
  }

  
}
getRecommendedVideos(videoID);
