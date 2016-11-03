(function() {
  for (let i = 0; i < 100; i++) {
    print('printing lots of stuff! ', Math.random());
    sleep(10);
  }
  if (Math.random() < .02) {
    print('sleep for a week');
    sleep(7 * 24 * 60 * 60 * 1000); // a week is enough
  }
})();
