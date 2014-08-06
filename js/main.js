$(function() {
  function createscwidget(args) {
    return $("<iframe></iframe>")
    .attr({
      allowtransparency: true,
      frameborder: 0,
      scrolling: 0,
      width: "100%",
      height: args.height,
      src: "https://w.soundcloud.com/player/?" + $.param(args)
    });
  }
  $.ajax({
    dataType: "json",
    url: "https://api.github.com/users/JLChnToZ/repos",
    data: {
      sort: "updated"
    },
    success: function(d) {
      $.each(d, function(i) {
        var that = this;
        if(this.name == "JLChnToZ.github.io")
          return true;
        $("#repos").append(
          $("<div></div>").append(
            $("<big></big>").append(function() {
              var r = $("<a></a>");
              if(that.fork)
                r.addClass("text-muted")
                .append(
                  $("<span></span>")
                  .addClass("fa fa-code-fork")
                );
              return r.attr("href", that.homepage && that.homepage.length > 0 ? that.homepage : that.html_url)
              .append(" "+that.name);
            })
          )
          .append(" - ")
          .append(function() {
            if(that.fork)
              return  $("<small></small>")
              .append(
                $("<em></em>")
                .addClass("text-muted")
                .append(that.description)
              );
            else
              return $("<small></small>")
              .text(that.description);
          })
          .append(" ")
          .append(
            $("<a></a>")
            .addClass("btn btn-default btn-sm")
            .attr("href", that.html_url + "/stargazers")
            .append(
              $("<span></span>")
              .addClass("glyphicon glyphicon-star")
            )
            .append(" ")
            .append(that.stargazers_count)
          )
        );
      });
    }
  });
  $("#sounds").append(createscwidget({
    url: "https://soundcloud.com/jlchntoz/",
    auto_play: false,
    liking: true,
    sharing: true,
    show_artwork: true,
    show_comments: true,
    show_playcount: true,
    show_owner: true,
    hide_releated: true,
    callback: false,
    height: 465
  }));
});