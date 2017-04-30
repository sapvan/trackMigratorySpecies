export default class Example {
    constructor(el) {
        this.el = el
        console.log(el.textContent, '- From the example module')
        self = this;


        jQuery.getJSON('data/qry_Monarch_AllFields.json', function(data){
            self.yearToLocationMap = [], row, recordYear, recordData;
            for (var index in data) {
                row = data[index];
                recordYear = row['RecordYear'];
                recordData = {'RecordDate':row['RecordDate'], 'Latitude':row['Latitude'], 'Longitude': row['Longitude']}
                if (recordYear != 0) {
                    if (self.yearToLocationMap[recordYear] == null){
                        self.yearToLocationMap[recordYear] = [recordData];
                    } else {
                        self.yearToLocationMap[recordYear].push(recordData);
                    }
                }
                
            }
            console.log(self.yearToLocationMap.length);
        });

    }

}
