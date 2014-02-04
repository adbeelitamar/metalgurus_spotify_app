require(['$api/models', '$views/image#Image'], function(models, Image) {
    var album_metadata_properties = [
        'artists',
        'availability',
        'copyrights',
        'discs',
        'label',
        'name',
        'playable',
        'popularity',
        'tracks',
        'type',
        'uri'
    ];
    var artist_metadata_properties = [
        'biography',
        'genres',
        'name',
        'popularity',
        'portraits',
        'related',
        'uri',
        'years'
    ];

    function setRecent(albumes, contname) {
      albumes.map ( function(item) {        
        // Albums             
        models.Album.fromURI(item.value).load(album_metadata_properties).done(function(album) { 
            var image = Image.forAlbum(album, {player: true, width: 150, height: 150});

            var albumdiv = document.createElement('div');
            albumdiv.setAttribute("class", "album_cnt");

            // Pass the player HTML code to the #heavy div  
            var an = document.createElement('div');
            an.setAttribute("class", "album_name");
            an.innerHTML += '<a href="'+ album.uri +'">'+ album.name.decodeForHtml()  +'</a>';

            var arn = document.createElement('div');
            arn.setAttribute("class", "album_name");
            models.Artist.fromURI(album.artists[0]) 
                .load(artist_metadata_properties)
                .done(function(artist) {
                  arn.innerHTML += 'By: <a href="'+ artist.uri+'">'+ artist.name.decodeForHtml() +'</a>';
            });
            var rel = document.createElement('div'); 
            rel.innerHTML = 'Released: ' + item.key[0] + "/" + item.key[1]                      

            albumdiv.appendChild(image.node);
            albumdiv.appendChild(an);
            albumdiv.appendChild(arn);
            albumdiv.appendChild(rel);

            document.getElementById(contname).appendChild(albumdiv);
        });

      });
    }
    
    if ($("#progressive_recent").length > 0) {
      var url = 'https://adbeel.cloudant.com/progressive/_design/latestDoc/_view/latestView?descending=true&limit=5';
      $.getJSON(url, {}, function(data) {
        setRecent(data.rows, 'progressive_recent');
      });
    }
    
    if ($("#heavy_recent").length > 0) {
      var url = 'https://adbeel.cloudant.com/classic/_design/latestDoc/_view/latestView?descending=true&limit=5';
      $.getJSON(url, {}, function(data) {
        setRecent(data.rows, 'heavy_recent');
      });
    }

    if ($("#black_recent").length > 0) {
      var url = 'https://adbeel.cloudant.com/black/_design/latestDoc/_view/latestView?descending=true&limit=5';
      $.getJSON(url, {}, function(data) {
        setRecent(data.rows, 'black_recent');
      });
    }

    if ($("#death_recent").length > 0) {
      var url = 'https://adbeel.cloudant.com/death/_design/latestDoc/_view/latestView?descending=true&limit=5';
      $.getJSON(url, {}, function(data) {
        setRecent(data.rows, 'death_recent');
      });
    }

    if ($("#gothic_recent").length > 0) {
      var url = 'https://adbeel.cloudant.com/gothic/_design/latestDoc/_view/latestView?descending=true&limit=5';
      $.getJSON(url, {}, function(data) {
        setRecent(data.rows, 'gothic_recent');
      });
    }

});