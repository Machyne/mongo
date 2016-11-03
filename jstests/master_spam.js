(function() {
  let trials = 0;
  while (true) {
    clearRawMongoProgramOutput();
    // Start the real launcher
    const pid = _startMongoProgram('./mongo', '--nodb', './jstests/launch_spam.js');
    let weekCount = 0;
    while (true) {
      const len1 = rawMongoProgramOutput().length;
      sleep(2 * 1000);
      const raw2 = rawMongoProgramOutput();
      clearRawMongoProgramOutput();
      const len2 = raw2.length;
      weekCount += (raw2.match(/week/g) || []).length;
      if (len1 == len2) {
        // It should be 128, but just to be safe, add some wiggle room.
        if (weekCount > 100) {
          break;
        }
        sleep(7 * 24 * 60 * 60 * 1000);
      }
    }
    stopMongoProgramByPid(pid);
    print('FINDME no luck after ' + (++trials) + ' trials');
    sleep(2000);
  }
})();
