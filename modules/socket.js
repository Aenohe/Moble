
define(['socketIO'],
  function(io) {

    return io.connect(moble.server);
  });
