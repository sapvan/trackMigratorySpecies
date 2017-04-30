function initialize() {
    var yearToLocationMap = [], row, recordYear, recordData;

    $("#year").change(function(e) {
        loadMapWithMigrationData(yearToLocationMap);
    });


    jQuery.getJSON('qry_Monarch_AllFields.json', function(data){
        for (var index in data) {
            row = data[index];
            recordYear = row['RecordYear'];
            //'RecordDate':row['RecordDate'],
            recordData = {'lat':parseFloat(row['Latitude']), 'lng': parseFloat(row['Longitude'])};
            if (recordYear != 0) {
                if (yearToLocationMap[recordYear] == null){
                    yearToLocationMap[recordYear] = [recordData];
                } else {
                    yearToLocationMap[recordYear].push(recordData);
                }
            }
        }
        

        var yearlist =  Object.keys(yearToLocationMap).sort(function(a, b){return b-a});
        $.each(yearlist, function(val, text) {
            $('#year').append(
                $('<option></option>').val(val).html(text)
            );
        }); 

        loadMapWithMigrationData(yearToLocationMap);
        
    });
}

function loadMapWithMigrationData(yearToLocationMap) {
    var year = $("#year option:selected").text();
    loadMapWithMonarchMigration(yearToLocationMap[year]);
}

function initMap() {
    var uluru = {lat :37.092015 , lng:-95.712720};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}

function loadMapWithMonarchMigration(mapCoordinates) {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat :37.092015 , lng:-95.712720},
        mapTypeId: 'terrain'
    });

    for (var entry in mapCoordinates) {
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: mapCoordinates[entry],
            radius: 35000
        });
    }
}