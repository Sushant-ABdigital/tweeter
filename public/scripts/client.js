/* eslint-disable no-undef */
/* eslint-disable camelcase */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Helper Data
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

//Function to create mark up of tweet.
const createTweetElement = data => {
  return `<section class="tweets">
      <article class="tweet">
        <header>
          <img src="${data.user.avatars}" alt="Tweeter profile image">
          <h5>${data.user.name}</h5>
          <h6>${data.user.handle}</h6>
        </header>
        <section class="body">
          <p>${data.content.text}</p>
        </section>
        <footer>
          <p>${data.created_at}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    </section>`;
};

//Function to create tweet
const renderTweets = data => {
  data.forEach(el => {
    const tweet = createTweetElement(el);
    $(".container").append(tweet);
  });
};

//Appending to the DOM after DOM is ready.
$(document).ready(() => {
  renderTweets(data);
});
