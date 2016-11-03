(function() {
  const Thread = function() {
    const args = Array.prototype.slice.call(arguments);
    this.init.apply(this, args);
  };
  _threadInject(Thread.prototype);

  const threadCount = 128;

  const makeThread = () => {
    clearRawMongoProgramOutput();
    return new Thread(function() {
      while (true) {
        runProgram('./mongo', '--nodb', './jstests/trivial.js');
      }
    });
  };

  const threads = [];
  while (threads.push(makeThread()) < threadCount) {
    ; // pass
  }

  threads.forEach((t) => {
    t.start()
  });

  threads.forEach((t) => {
    t.join()
  });
})();
