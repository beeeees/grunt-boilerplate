(function($, window, undefined){
  var MainScripts = {
    thing: false,
    widget: {
      one:   'A',
      two:   'B',
      three: 'C'
    },

    initialize: function(){

    }
  };

  // Send to global namespace (optional)
  window.MainScripts = MainScripts;

  // DOM Ready
  $(function(){
    MainScripts.initialize();
  });

  // Deferred loading (window.load)
    $(window).load(function() {
  });

})(jQuery, window, null);
