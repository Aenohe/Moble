
define(['facebookSDK'],
  function(FB) {

    FB.init({ appId: moble.facebook.appId });

    FB.Event.subscribe('auth.statusChange', function(res) {
      if (res.status == 'connected' ) {
        var auth = { FBId: res.authResponse.userID, token: res.authResponse.accessToken };
        moble.trigger('user:check_connection', auth);
      }
      else {
        moble.trigger('user:disconnected');
      }
    });

    return FB;
  });
