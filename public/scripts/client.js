/* eslint-disable no-undef */
/* eslint-disable camelcase */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Helper Data
// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac"
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants"
//     },
//     created_at: 1461116232227
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd"
//     },
//     content: {
//       text: "Je pense , donc je suis"
//     },
//     created_at: 1461113959088
//   }
// ];

//Prevention of malicious input
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Function to format the date.
const timeSince = date => {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

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
          <p>${escape(data.content.text)}</p>
        </section>
        <footer>
          <p>${timeSince(data.created_at)} ago</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    </section>`;
};

//Function to create tweets
const renderTweets = data => {
  //Remove everything from the container to prevent multiple updates.
  $(".tweet-container").empty();
  data.forEach(el => {
    const tweet = createTweetElement(el);
    $(".tweet-container").prepend(tweet);
  });
};

//Appending to the DOM after DOM is ready.
$(document).ready(() => {
  //Go to Top functionality...
  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $(".container_top").fadeIn();
    } else {
      $(".container_top").fadeOut();
    }
  });

  $(".container_top").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      600
    );
    return false;
  });
  //Creating function to fetch the data from http://localhost:8080/tweets ;
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/tweets",
      dataType: "JSON",
      success: function(data) {
        renderTweets(data);
      },
      error: function(err) {
        console.log("errored!", err);
      }
    });
  };

  loadTweets();

  //Form submission
  $("#tweeter_form").submit(function(e) {
    //Preventing the default behaviour of submitting the form
    e.preventDefault();
    //validation of form input
    const userInput = $(".user_input").val();
    if (!userInput) {
      $(".error_msg")
        .text("Tweet can not be empty")
        .slideDown("fast")
        .delay(3000)
        .slideUp("fast");
      return;
    } else if (userInput.length > 140) {
      $(".error_msg")
        .text("Tweets can not be longer than 140 characters!")
        .slideDown("fast")
        .delay(3000)
        .slideUp("fast");
      return;
    } else {
      $(".error_msg").hide();
    }
    // Getting the serialized value
    const val = $(this).serialize();
    //Making post request
    $.ajax({
      method: "POST",
      data: val,
      url: "/tweets",
      success: function() {
        //Upon successful submission fetch data to render
        loadTweets();
      },
      error: function() {
        console.log("error occured");
      }
    });
    $(".user_input").val('');
    $('.counter').text("140");
  });

  //Animation of form
  $(".nav_content a").click(function() {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown(1000, function() {
        $(".user_input").focus();
      });
    } else {
      $(".new-tweet").slideUp(500);
    }
  });
});
