/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.562111801242236, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "032. Login - /web/index.php/api/v2/dashboard/employees/subunit"], "isController": false}, {"data": [1.0, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/113/actions/allowed"], "isController": false}, {"data": [0.0, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/112/history"], "isController": false}, {"data": [1.0, 500, 1500, "015. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2"], "isController": false}, {"data": [0.5, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/110/actions/allowed"], "isController": false}, {"data": [1.0, 500, 1500, "016. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2"], "isController": false}, {"data": [0.625, 500, 1500, "059. Add - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [0.625, 500, 1500, "050. Recruitment - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [0.75, 500, 1500, "058. Add - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [1.0, 500, 1500, "072. Close - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [0.375, 500, 1500, "042. Recruitment - /web/index.php/recruitment/viewCandidates"], "isController": false}, {"data": [0.5, 500, 1500, "066. Save - /web/index.php/api/v2/recruitment/vacancies"], "isController": false}, {"data": [0.5, 500, 1500, "001.  - /"], "isController": false}, {"data": [0.5, 500, 1500, "053. Recruitment - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [0.5, 500, 1500, "054. Add - /web/index.php/recruitment/addCandidate"], "isController": false}, {"data": [1.0, 500, 1500, "017. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-600.woff2"], "isController": false}, {"data": [0.5, 500, 1500, "027. Login - /web/index.php/api/v2/dashboard/employees/time-at-work"], "isController": false}, {"data": [0.5, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/110/history"], "isController": false}, {"data": [1.0, 500, 1500, "012. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2"], "isController": false}, {"data": [0.5, 500, 1500, "041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-0"], "isController": false}, {"data": [0.625, 500, 1500, "055. Add - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [0.5, 500, 1500, "041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-1"], "isController": false}, {"data": [0.5, 500, 1500, "002.  - /web/index.php/auth/login"], "isController": false}, {"data": [0.0, 500, 1500, "041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule"], "isController": false}, {"data": [0.375, 500, 1500, "052. Recruitment - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [1.0, 500, 1500, "026. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-700.woff2"], "isController": false}, {"data": [0.5, 500, 1500, "067. Save - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [0.5, 500, 1500, "029. Login - /web/index.php/api/v2/buzz/feed"], "isController": false}, {"data": [0.5, 500, 1500, "037. Login - /web/index.php/pim/viewPhoto/empNumber/22"], "isController": false}, {"data": [1.0, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/113"], "isController": false}, {"data": [0.5, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/112"], "isController": false}, {"data": [0.5, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/111"], "isController": false}, {"data": [0.5, 500, 1500, "049. Recruitment - /web/index.php/api/v2/recruitment/candidates/statuses"], "isController": false}, {"data": [0.5, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/110"], "isController": false}, {"data": [0.625, 500, 1500, "062. Save - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [0.5, 500, 1500, "040. Login - /web/index.php/pim/viewPhoto/empNumber/9"], "isController": false}, {"data": [0.5, 500, 1500, "031. Login - /web/index.php/api/v2/dashboard/employees/leaves"], "isController": false}, {"data": [0.5, 500, 1500, "030. Login - /web/index.php/api/v2/dashboard/shortcuts"], "isController": false}, {"data": [0.5, 500, 1500, "036. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-italic.woff2"], "isController": false}, {"data": [0.5, 500, 1500, "007. Home - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [1.0, 500, 1500, "019. Login - /web/index.php/auth/validate-1"], "isController": false}, {"data": [0.5, 500, 1500, "048. Recruitment - /web/index.php/api/v2/recruitment/hiring-managers"], "isController": false}, {"data": [0.625, 500, 1500, "069. Save - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [0.5, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/113"], "isController": false}, {"data": [0.5, 500, 1500, "001.  - /-1"], "isController": false}, {"data": [0.5, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/112"], "isController": false}, {"data": [1.0, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/113/history"], "isController": false}, {"data": [1.0, 500, 1500, "001.  - /-0"], "isController": false}, {"data": [0.5, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/111"], "isController": false}, {"data": [0.5, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/110"], "isController": false}, {"data": [0.75, 500, 1500, "063. Save - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [0.5, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/111/history"], "isController": false}, {"data": [0.5, 500, 1500, "044. Recruitment - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [0.625, 500, 1500, "051. Recruitment - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [1.0, 500, 1500, "072. Close - /web/index.php/core/i18n/messages-0"], "isController": false}, {"data": [0.5, 500, 1500, "039. Login - /web/index.php/pim/viewPhoto/empNumber/11"], "isController": false}, {"data": [0.0, 500, 1500, "019. Login - /web/index.php/auth/validate-0"], "isController": false}, {"data": [0.0, 500, 1500, "019. Login - /web/index.php/auth/validate"], "isController": false}, {"data": [0.625, 500, 1500, "056. Add - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [1.0, 500, 1500, "070. Close - /web/index.php/auth/logout"], "isController": false}, {"data": [1.0, 500, 1500, "011. Home - /web/dist/img/blob.svg"], "isController": false}, {"data": [0.5, 500, 1500, "028. Login - /web/index.php/api/v2/dashboard/employees/action-summary"], "isController": false}, {"data": [0.625, 500, 1500, "060. Save - /web/index.php/api/v2/recruitment/candidates?"], "isController": false}, {"data": [0.5, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/112/actions/allowed"], "isController": false}, {"data": [0.625, 500, 1500, "057. Add - /web/index.php/api/v2/recruitment/vacancies"], "isController": false}, {"data": [1.0, 500, 1500, "035. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-300.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "013. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2"], "isController": false}, {"data": [0.5, 500, 1500, "034. Login - /web/index.php/events/push"], "isController": false}, {"data": [1.0, 500, 1500, "020. Login - /web/index.php/dashboard/index"], "isController": false}, {"data": [0.5, 500, 1500, "047. Recruitment - /web/index.php/api/v2/recruitment/vacancies"], "isController": false}, {"data": [0.5, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/111/actions/allowed"], "isController": false}, {"data": [0.5, 500, 1500, "021. Login - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [1.0, 500, 1500, "070. Close - /web/index.php/auth/logout-0"], "isController": false}, {"data": [1.0, 500, 1500, "070. Close - /web/index.php/auth/logout-1"], "isController": false}, {"data": [0.5, 500, 1500, "024. Login - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [0.5, 500, 1500, "033. Login - /web/index.php/api/v2/dashboard/employees/locations"], "isController": false}, {"data": [0.375, 500, 1500, "046. Recruitment - /web/index.php/api/v2/admin/job-titles"], "isController": false}, {"data": [1.0, 500, 1500, "014. Home - /web/dist/fonts/bootstrap-icons.woff2"], "isController": false}, {"data": [0.375, 500, 1500, "043. Recruitment - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [0.25, 500, 1500, "045. Recruitment - /web/index.php/api/v2/recruitment/candidates"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 161, 0, 0.0, 953.2298136645961, 6, 5602, 943.0, 1517.4000000000005, 1925.6000000000004, 5368.879999999998, 1.1503368843732809, 17.60816309374531, 0.753701474628284], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["032. Login - /web/index.php/api/v2/dashboard/employees/subunit", 1, 0, 0.0, 1057.0, 1057, 1057, 1057.0, 1057.0, 1057.0, 1057.0, 0.9460737937559129, 1.3997087866603597, 0.5802093188268685], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/113/actions/allowed", 1, 0, 0.0, 192.0, 192, 192, 192.0, 192.0, 192.0, 192.0, 5.208333333333333, 7.395426432291666, 3.0161539713541665], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/112/history", 1, 0, 0.0, 1574.0, 1574, 1574, 1574.0, 1574.0, 1574.0, 1574.0, 0.6353240152477764, 1.2079842360228716, 0.4125883497458704], "isController": false}, {"data": ["015. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 106.0, 9.433962264150942, 250.3685141509434, 5.592202240566038], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/110/actions/allowed", 1, 0, 0.0, 1046.0, 1046, 1046, 1046.0, 1046.0, 1046.0, 1046.0, 0.9560229445506692, 1.3574778919694073, 0.5536343809751434], "isController": false}, {"data": ["016. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2", 1, 0, 0.0, 200.0, 200, 200, 200.0, 200.0, 200.0, 200.0, 5.0, 133.203125, 2.9833984375], "isController": false}, {"data": ["059. Add - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 616.75, 184, 943, 670.0, 943.0, 943.0, 943.0, 0.04195070791819612, 0.13138273466177242, 0.02458049292081804], "isController": false}, {"data": ["050. Recruitment - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 757.5, 232, 1094, 852.0, 1094.0, 1094.0, 1094.0, 0.040819242190768726, 0.056923708836345455, 0.023040548814711258], "isController": false}, {"data": ["058. Add - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 561.75, 189, 1011, 523.5, 1011.0, 1011.0, 1011.0, 0.04156578304739538, 0.05796478339031309, 0.023380752964159902], "isController": false}, {"data": ["072. Close - /web/index.php/core/i18n/messages", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 184.0, 5.434782608695652, 554.4858186141305, 2.9668393342391304], "isController": false}, {"data": ["042. Recruitment - /web/index.php/recruitment/viewCandidates", 4, 0, 0.0, 1298.0, 998, 1932, 1131.0, 1932.0, 1932.0, 1932.0, 0.040835077331427695, 0.12398071818692256, 0.028273505691388902], "isController": false}, {"data": ["066. Save - /web/index.php/api/v2/recruitment/vacancies", 4, 0, 0.0, 773.75, 184, 1526, 692.5, 1526.0, 1526.0, 1526.0, 0.0472561876070648, 0.08348285486443381, 0.031980994152046784], "isController": false}, {"data": ["001.  - /", 1, 0, 0.0, 1192.0, 1192, 1192, 1192.0, 1192.0, 1192.0, 1192.0, 0.8389261744966443, 3.3393194211409396, 0.8946361157718121], "isController": false}, {"data": ["053. Recruitment - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 870.75, 688, 1142, 826.5, 1142.0, 1142.0, 1142.0, 0.04058070995952074, 0.12709212582049123, 0.023857018941046373], "isController": false}, {"data": ["054. Add - /web/index.php/recruitment/addCandidate", 4, 0, 0.0, 932.75, 235, 1551, 972.5, 1551.0, 1551.0, 1551.0, 0.040989906235589485, 0.12753304811190244, 0.028740969411282475], "isController": false}, {"data": ["017. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-600.woff2", 1, 0, 0.0, 104.0, 104, 104, 104.0, 104.0, 104.0, 104.0, 9.615384615384617, 255.55889423076925, 5.699744591346154], "isController": false}, {"data": ["027. Login - /web/index.php/api/v2/dashboard/employees/time-at-work", 1, 0, 0.0, 869.0, 869, 869, 869.0, 869.0, 869.0, 869.0, 1.1507479861910241, 2.8622608601841195, 0.7799014672036824], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/110/history", 1, 0, 0.0, 1025.0, 1025, 1025, 1025.0, 1025.0, 1025.0, 1025.0, 0.975609756097561, 1.8549923780487807, 0.6335746951219513], "isController": false}, {"data": ["012. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 93.0, 10.752688172043012, 286.4583333333333, 6.41591061827957], "isController": false}, {"data": ["041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-0", 4, 0, 0.0, 1036.5, 745, 1259, 1071.0, 1259.0, 1259.0, 1259.0, 0.041109969167523124, 0.08173818088386434, 0.02874486125385406], "isController": false}, {"data": ["055. Add - /web/index.php/core/i18n/messages", 4, 0, 0.0, 1097.0, 423, 1332, 1316.5, 1332.0, 1332.0, 1332.0, 0.04107788366743346, 4.12018393906096, 0.022985964200624383], "isController": false}, {"data": ["041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-1", 4, 0, 0.0, 1098.25, 804, 1326, 1131.5, 1326.0, 1326.0, 1326.0, 0.041167934295976864, 0.12499131613885944, 0.028503970132663668], "isController": false}, {"data": ["002.  - /web/index.php/auth/login", 1, 0, 0.0, 971.0, 971, 971, 971.0, 971.0, 971.0, 971.0, 1.0298661174047374, 2.6229402677651907, 0.6074600926879505], "isController": false}, {"data": ["041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule", 4, 0, 0.0, 2135.5, 1868, 2401, 2136.5, 2401.0, 2401.0, 2401.0, 0.040640907105046586, 0.20419674517135222, 0.056555949828800176], "isController": false}, {"data": ["052. Recruitment - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 937.75, 592, 1615, 772.0, 1615.0, 1615.0, 1615.0, 0.04050263773428244, 0.12684761641976933, 0.02381112101175589], "isController": false}, {"data": ["026. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-700.woff2", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 110.0, 9.09090909090909, 245.9872159090909, 5.388849431818182], "isController": false}, {"data": ["067. Save - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 999.25, 177, 1809, 1005.5, 1809.0, 1809.0, 1809.0, 0.046808261658182665, 0.14659579603299983, 0.027563849394418114], "isController": false}, {"data": ["029. Login - /web/index.php/api/v2/buzz/feed", 1, 0, 0.0, 1275.0, 1275, 1275, 1275.0, 1275.0, 1275.0, 1275.0, 0.7843137254901961, 50.3515625, 0.466452205882353], "isController": false}, {"data": ["037. Login - /web/index.php/pim/viewPhoto/empNumber/22", 1, 0, 0.0, 950.0, 950, 950, 950.0, 950.0, 950.0, 950.0, 1.0526315789473684, 1.5368009868421053, 0.6321957236842105], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/113", 1, 0, 0.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 210.0, 4.761904761904763, 14.90420386904762, 3.348214285714286], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/112", 1, 0, 0.0, 635.0, 635, 635, 635.0, 635.0, 635.0, 635.0, 1.574803149606299, 4.928949311023622, 1.1072834645669292], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/111", 1, 0, 0.0, 1222.0, 1222, 1222, 1222.0, 1222.0, 1222.0, 1222.0, 0.8183306055646482, 2.561278897299509, 0.5753887070376432], "isController": false}, {"data": ["049. Recruitment - /web/index.php/api/v2/recruitment/candidates/statuses", 4, 0, 0.0, 946.75, 707, 1223, 928.5, 1223.0, 1223.0, 1223.0, 0.0401384777482314, 0.06616577191310019, 0.025204141789172647], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/110", 1, 0, 0.0, 1228.0, 1228, 1228, 1228.0, 1228.0, 1228.0, 1228.0, 0.8143322475570033, 2.5487645052931596, 0.5725773615635179], "isController": false}, {"data": ["062. Save - /web/index.php/core/i18n/messages", 4, 0, 0.0, 866.5, 252, 1376, 919.0, 1376.0, 1376.0, 1376.0, 0.044363112072311875, 4.449784769589086, 0.024954250540675425], "isController": false}, {"data": ["040. Login - /web/index.php/pim/viewPhoto/empNumber/9", 1, 0, 0.0, 912.0, 912, 912, 912.0, 912.0, 912.0, 912.0, 1.0964912280701753, 1.6008343612938596, 0.6574664199561403], "isController": false}, {"data": ["031. Login - /web/index.php/api/v2/dashboard/employees/leaves", 1, 0, 0.0, 1161.0, 1161, 1161, 1161.0, 1161.0, 1161.0, 1161.0, 0.8613264427217916, 1.1960998062015504, 0.5408524440137812], "isController": false}, {"data": ["030. Login - /web/index.php/api/v2/dashboard/shortcuts", 1, 0, 0.0, 874.0, 874, 874, 874.0, 874.0, 874.0, 874.0, 1.1441647597254005, 1.7195991847826086, 0.6927560068649885], "isController": false}, {"data": ["036. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-italic.woff2", 1, 0, 0.0, 753.0, 753, 753, 753.0, 753.0, 753.0, 753.0, 1.3280212483399734, 36.56727257636122, 0.7911064077025233], "isController": false}, {"data": ["007. Home - /web/index.php/core/i18n/messages", 1, 0, 0.0, 849.0, 849, 849, 849.0, 849.0, 849.0, 849.0, 1.1778563015312131, 118.131855491755, 0.6429899146054182], "isController": false}, {"data": ["019. Login - /web/index.php/auth/validate-1", 1, 0, 0.0, 376.0, 376, 376, 376.0, 376.0, 376.0, 376.0, 2.6595744680851063, 8.116377160904255, 2.059611868351064], "isController": false}, {"data": ["048. Recruitment - /web/index.php/api/v2/recruitment/hiring-managers", 4, 0, 0.0, 1118.75, 823, 1387, 1132.5, 1387.0, 1387.0, 1387.0, 0.04054410184678384, 0.06034102657665876, 0.025617220600458148], "isController": false}, {"data": ["069. Save - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 897.75, 181, 1323, 1043.5, 1323.0, 1323.0, 1323.0, 0.045946380573870294, 0.06407366353465506, 0.02597944760963955], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/113", 1, 0, 0.0, 554.0, 554, 554, 554.0, 554.0, 554.0, 554.0, 1.8050541516245489, 3.2452194268953067, 1.0171057084837545], "isController": false}, {"data": ["001.  - /-1", 1, 0, 0.0, 725.0, 725, 725, 725.0, 725.0, 725.0, 725.0, 1.379310344827586, 3.6705280172413794, 0.7516163793103449], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/112", 1, 0, 0.0, 1134.0, 1134, 1134, 1134.0, 1134.0, 1134.0, 1134.0, 0.8818342151675485, 1.5854070216049385, 0.49689291225749566], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/113/history", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 206.0, 4.854368932038835, 9.229937803398059, 3.1524954490291264], "isController": false}, {"data": ["001.  - /-0", 1, 0, 0.0, 465.0, 465, 465, 465.0, 465.0, 465.0, 465.0, 2.150537634408602, 2.837281586021505, 1.1214717741935483], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/111", 1, 0, 0.0, 613.0, 613, 613, 613.0, 613.0, 613.0, 613.0, 1.6313213703099512, 2.9312805872756935, 0.9192113580750408], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/110", 1, 0, 0.0, 908.0, 908, 908, 908.0, 908.0, 908.0, 908.0, 1.1013215859030838, 1.9810882433920705, 0.6205689014317181], "isController": false}, {"data": ["063. Save - /web/index.php/pim/viewPhoto/empNumber/7", 4, 0, 0.0, 531.75, 170, 866, 545.5, 866.0, 866.0, 866.0, 0.04514723642479035, 0.7808179268389034, 0.027467508098285534], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/111/history", 1, 0, 0.0, 1315.0, 1315, 1315, 1315.0, 1315.0, 1315.0, 1315.0, 0.7604562737642585, 1.4459066064638784, 0.49385099809885935], "isController": false}, {"data": ["044. Recruitment - /web/index.php/pim/viewPhoto/empNumber/7", 4, 0, 0.0, 938.0, 793, 1194, 882.5, 1194.0, 1194.0, 1194.0, 0.040568362762299824, 0.7016266645706346, 0.024642110974756336], "isController": false}, {"data": ["051. Recruitment - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 788.75, 289, 1069, 898.5, 1069.0, 1069.0, 1069.0, 0.04032339361680679, 0.0562322325046876, 0.022760665537611646], "isController": false}, {"data": ["072. Close - /web/index.php/core/i18n/messages-0", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 285.9700520833333, 0.0], "isController": false}, {"data": ["039. Login - /web/index.php/pim/viewPhoto/empNumber/11", 1, 0, 0.0, 943.0, 943, 943, 943.0, 943.0, 943.0, 943.0, 1.0604453870625663, 1.5482088414634148, 0.6368885869565217], "isController": false}, {"data": ["019. Login - /web/index.php/auth/validate-0", 1, 0, 0.0, 5226.0, 5226, 5226, 5226.0, 5226.0, 5226.0, 5226.0, 0.19135093761959435, 0.3875603951396862, 0.17976523631840796], "isController": false}, {"data": ["019. Login - /web/index.php/auth/validate", 1, 0, 0.0, 5602.0, 5602, 5602, 5602.0, 5602.0, 5602.0, 5602.0, 0.1785076758300607, 0.9063099674223491, 0.3059384483220278], "isController": false}, {"data": ["056. Add - /web/index.php/pim/viewPhoto/empNumber/7", 4, 0, 0.0, 703.0, 172, 1027, 806.5, 1027.0, 1027.0, 1027.0, 0.04167969157028238, 0.7208470094821299, 0.02523575075544441], "isController": false}, {"data": ["070. Close - /web/index.php/auth/logout", 1, 0, 0.0, 361.0, 361, 361, 361.0, 361.0, 361.0, 361.0, 2.770083102493075, 12.64661963296399, 3.816979743767313], "isController": false}, {"data": ["011. Home - /web/dist/img/blob.svg", 1, 0, 0.0, 100.0, 100, 100, 100.0, 100.0, 100.0, 100.0, 10.0, 16.455078125, 5.888671875], "isController": false}, {"data": ["028. Login - /web/index.php/api/v2/dashboard/employees/action-summary", 1, 0, 0.0, 1195.0, 1195, 1195, 1195.0, 1195.0, 1195.0, 1195.0, 0.8368200836820083, 1.1865847280334727, 0.5189265167364017], "isController": false}, {"data": ["060. Save - /web/index.php/api/v2/recruitment/candidates?", 4, 0, 0.0, 847.5, 207, 1230, 976.5, 1230.0, 1230.0, 1230.0, 0.04260123117558097, 0.06157209193345688, 0.03648562474705519], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/112/actions/allowed", 1, 0, 0.0, 1258.0, 1258, 1258, 1258.0, 1258.0, 1258.0, 1258.0, 0.794912559618442, 1.1287137321144673, 0.46033510532591415], "isController": false}, {"data": ["057. Add - /web/index.php/api/v2/recruitment/vacancies", 4, 0, 0.0, 857.0, 173, 1322, 966.5, 1322.0, 1322.0, 1322.0, 0.0422283922595357, 0.07460074374755868, 0.028454678378007452], "isController": false}, {"data": ["035. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-300.woff2", 1, 0, 0.0, 180.0, 180, 180, 180.0, 180.0, 180.0, 180.0, 5.555555555555555, 146.41927083333334, 3.293185763888889], "isController": false}, {"data": ["013. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 113.0, 8.849557522123893, 234.85896017699113, 5.245782632743363], "isController": false}, {"data": ["034. Login - /web/index.php/events/push", 1, 0, 0.0, 850.0, 850, 850, 850.0, 850.0, 850.0, 850.0, 1.176470588235294, 1.6498161764705883, 0.7594209558823529], "isController": false}, {"data": ["020. Login - /web/index.php/dashboard/index", 1, 0, 0.0, 474.0, 474, 474, 474.0, 474.0, 474.0, 474.0, 2.109704641350211, 6.4383076213080175, 1.427759098101266], "isController": false}, {"data": ["047. Recruitment - /web/index.php/api/v2/recruitment/vacancies", 4, 0, 0.0, 1184.25, 935, 1372, 1215.0, 1372.0, 1372.0, 1372.0, 0.04034779801892312, 0.07127848302366398, 0.026832861768443985], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/111/actions/allowed", 1, 0, 0.0, 1044.0, 1044, 1044, 1044.0, 1044.0, 1044.0, 1044.0, 0.9578544061302682, 1.3600784243295019, 0.5546949832375478], "isController": false}, {"data": ["021. Login - /web/index.php/core/i18n/messages", 1, 0, 0.0, 883.0, 883, 883, 883.0, 883.0, 883.0, 883.0, 1.1325028312570782, 113.58317702434881, 0.6237613250283126], "isController": false}, {"data": ["070. Close - /web/index.php/auth/logout-0", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 167.0, 5.9880239520958085, 11.981895583832335, 4.128461826347305], "isController": false}, {"data": ["070. Close - /web/index.php/auth/logout-1", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 13.28732189119171, 3.5672360751295336], "isController": false}, {"data": ["024. Login - /web/index.php/pim/viewPhoto/empNumber/7", 1, 0, 0.0, 1170.0, 1170, 1170, 1170.0, 1170.0, 1170.0, 1170.0, 0.8547008547008547, 14.78198450854701, 0.5124866452991453], "isController": false}, {"data": ["033. Login - /web/index.php/api/v2/dashboard/employees/locations", 1, 0, 0.0, 1044.0, 1044, 1044, 1044.0, 1044.0, 1044.0, 1044.0, 0.9578544061302682, 1.412461087164751, 0.5893049568965517], "isController": false}, {"data": ["046. Recruitment - /web/index.php/api/v2/admin/job-titles", 4, 0, 0.0, 1165.25, 865, 1717, 1039.5, 1717.0, 1717.0, 1717.0, 0.04046371416432314, 0.20417579207720477, 0.025131759969247578], "isController": false}, {"data": ["014. Home - /web/dist/fonts/bootstrap-icons.woff2", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 590.2382235221675, 2.828663793103448], "isController": false}, {"data": ["043. Recruitment - /web/index.php/core/i18n/messages", 4, 0, 0.0, 1313.0, 712, 2328, 1106.0, 2328.0, 2328.0, 2328.0, 0.040822574883910806, 4.094576019288667, 0.022922832576414757], "isController": false}, {"data": ["045. Recruitment - /web/index.php/api/v2/recruitment/candidates", 4, 0, 0.0, 1568.75, 792, 2137, 1673.0, 2137.0, 2137.0, 2137.0, 0.039864858130936126, 0.5360636037582595, 0.027874256271240495], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 161, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
