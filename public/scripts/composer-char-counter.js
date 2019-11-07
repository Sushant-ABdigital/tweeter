/* eslint-disable no-undef */
$(document).ready(function() {
  // --- our code goes here ---
  $(".user_input").on("keyup", function() {
    let length = $(this).val().length;
    let remainingChar = 140 - length;
    let $counter = $(this).siblings(".counter");
    $counter.html(remainingChar);
    if (remainingChar < 0) {
      $counter.addClass("negative");
    } else {
      $counter.removeClass("negative");
    }
  });
});
