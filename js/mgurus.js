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

    var albumes = ['spotify:album:4pLCSe7hLIcczZ7K7pZsUf', 'spotify:album:7qF4gcJGC8gGgNrewqsj87', 'spotify:album:6vMTdFzBPjyrBSFkCvjUh3',
    'spotify:album:5JVbzx8SE2SXELNtF6GnsU','spotify:album:44FWOiwVhiO5sqGU5gL2db']    
    
    function setRecent(albumes, contname) {
      albumes.map ( function(item) {
        // Albums
        models.Album.fromURI(item).load(album_metadata_properties).done(function(album) { 
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

            albumdiv.appendChild(image.node);
            albumdiv.appendChild(an);
            albumdiv.appendChild(arn);

            document.getElementById(contname).appendChild(albumdiv);
        });

      });
    }
    
    setRecent(albumes, 'heavy_recent');
    setRecent(albumes, 'hardrock_recent');
    setRecent(albumes, 'gothic_recent');
});