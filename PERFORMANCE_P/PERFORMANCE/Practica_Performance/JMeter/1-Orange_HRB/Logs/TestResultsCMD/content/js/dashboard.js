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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9782608695652174, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "032. Login - /web/index.php/api/v2/dashboard/employees/subunit"], "isController": false}, {"data": [1.0, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/116/actions/allowed"], "isController": false}, {"data": [1.0, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/116/history"], "isController": false}, {"data": [1.0, 500, 1500, "015. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "016. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "059. Add - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [1.0, 500, 1500, "050. Recruitment - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [1.0, 500, 1500, "058. Add - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [1.0, 500, 1500, "072. Close - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [1.0, 500, 1500, "042. Recruitment - /web/index.php/recruitment/viewCandidates"], "isController": false}, {"data": [1.0, 500, 1500, "066. Save - /web/index.php/api/v2/recruitment/vacancies"], "isController": false}, {"data": [0.0, 500, 1500, "001.  - /"], "isController": false}, {"data": [1.0, 500, 1500, "053. Recruitment - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [1.0, 500, 1500, "054. Add - /web/index.php/recruitment/addCandidate"], "isController": false}, {"data": [1.0, 500, 1500, "017. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-600.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "027. Login - /web/index.php/api/v2/dashboard/employees/time-at-work"], "isController": false}, {"data": [1.0, 500, 1500, "012. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/118/history"], "isController": false}, {"data": [1.0, 500, 1500, "041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-0"], "isController": false}, {"data": [1.0, 500, 1500, "055. Add - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [1.0, 500, 1500, "041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-1"], "isController": false}, {"data": [1.0, 500, 1500, "002.  - /web/index.php/auth/login"], "isController": false}, {"data": [1.0, 500, 1500, "041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule"], "isController": false}, {"data": [1.0, 500, 1500, "052. Recruitment - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [1.0, 500, 1500, "026. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-700.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "067. Save - /web/index.php/api/v2/leave/holidays"], "isController": false}, {"data": [1.0, 500, 1500, "029. Login - /web/index.php/api/v2/buzz/feed"], "isController": false}, {"data": [1.0, 500, 1500, "037. Login - /web/index.php/pim/viewPhoto/empNumber/22"], "isController": false}, {"data": [1.0, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/115"], "isController": false}, {"data": [1.0, 500, 1500, "049. Recruitment - /web/index.php/api/v2/recruitment/candidates/statuses"], "isController": false}, {"data": [1.0, 500, 1500, "062. Save - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [1.0, 500, 1500, "040. Login - /web/index.php/pim/viewPhoto/empNumber/9"], "isController": false}, {"data": [1.0, 500, 1500, "031. Login - /web/index.php/api/v2/dashboard/employees/leaves"], "isController": false}, {"data": [1.0, 500, 1500, "030. Login - /web/index.php/api/v2/dashboard/shortcuts"], "isController": false}, {"data": [1.0, 500, 1500, "036. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-italic.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/118"], "isController": false}, {"data": [1.0, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/117"], "isController": false}, {"data": [1.0, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/116"], "isController": false}, {"data": [0.5, 500, 1500, "007. Home - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [1.0, 500, 1500, "064. Save - /web/index.php/api/v2/recruitment/candidates/115"], "isController": false}, {"data": [1.0, 500, 1500, "019. Login - /web/index.php/auth/validate-1"], "isController": false}, {"data": [1.0, 500, 1500, "048. Recruitment - /web/index.php/api/v2/recruitment/hiring-managers"], "isController": false}, {"data": [1.0, 500, 1500, "069. Save - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [1.0, 500, 1500, "001.  - /-1"], "isController": false}, {"data": [0.0, 500, 1500, "001.  - /-0"], "isController": false}, {"data": [1.0, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/115/history"], "isController": false}, {"data": [1.0, 500, 1500, "063. Save - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [1.0, 500, 1500, "044. Recruitment - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [1.0, 500, 1500, "051. Recruitment - /web/index.php/api/v2/leave/workweek"], "isController": false}, {"data": [1.0, 500, 1500, "072. Close - /web/index.php/core/i18n/messages-0"], "isController": false}, {"data": [1.0, 500, 1500, "039. Login - /web/index.php/pim/viewPhoto/empNumber/11"], "isController": false}, {"data": [1.0, 500, 1500, "068. Save - /web/index.php/api/v2/recruitment/candidates/117/history"], "isController": false}, {"data": [1.0, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/118"], "isController": false}, {"data": [1.0, 500, 1500, "019. Login - /web/index.php/auth/validate-0"], "isController": false}, {"data": [1.0, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/117"], "isController": false}, {"data": [0.5, 500, 1500, "019. Login - /web/index.php/auth/validate"], "isController": false}, {"data": [1.0, 500, 1500, "061. Save - /web/index.php/recruitment/addCandidate/116"], "isController": false}, {"data": [1.0, 500, 1500, "056. Add - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [1.0, 500, 1500, "070. Close - /web/index.php/auth/logout"], "isController": false}, {"data": [1.0, 500, 1500, "011. Home - /web/dist/img/blob.svg"], "isController": false}, {"data": [1.0, 500, 1500, "028. Login - /web/index.php/api/v2/dashboard/employees/action-summary"], "isController": false}, {"data": [1.0, 500, 1500, "060. Save - /web/index.php/api/v2/recruitment/candidates?"], "isController": false}, {"data": [1.0, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/115/actions/allowed"], "isController": false}, {"data": [1.0, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/118/actions/allowed"], "isController": false}, {"data": [1.0, 500, 1500, "057. Add - /web/index.php/api/v2/recruitment/vacancies"], "isController": false}, {"data": [1.0, 500, 1500, "035. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-300.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "065. Save - /web/index.php/api/v2/recruitment/candidates/117/actions/allowed"], "isController": false}, {"data": [1.0, 500, 1500, "013. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "034. Login - /web/index.php/events/push"], "isController": false}, {"data": [1.0, 500, 1500, "020. Login - /web/index.php/dashboard/index"], "isController": false}, {"data": [1.0, 500, 1500, "047. Recruitment - /web/index.php/api/v2/recruitment/vacancies"], "isController": false}, {"data": [1.0, 500, 1500, "021. Login - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [1.0, 500, 1500, "070. Close - /web/index.php/auth/logout-0"], "isController": false}, {"data": [1.0, 500, 1500, "070. Close - /web/index.php/auth/logout-1"], "isController": false}, {"data": [1.0, 500, 1500, "024. Login - /web/index.php/pim/viewPhoto/empNumber/7"], "isController": false}, {"data": [1.0, 500, 1500, "033. Login - /web/index.php/api/v2/dashboard/employees/locations"], "isController": false}, {"data": [1.0, 500, 1500, "046. Recruitment - /web/index.php/api/v2/admin/job-titles"], "isController": false}, {"data": [1.0, 500, 1500, "014. Home - /web/dist/fonts/bootstrap-icons.woff2"], "isController": false}, {"data": [1.0, 500, 1500, "043. Recruitment - /web/index.php/core/i18n/messages"], "isController": false}, {"data": [0.875, 500, 1500, "045. Recruitment - /web/index.php/api/v2/recruitment/candidates"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 161, 0, 0.0, 221.13664596273296, 9, 1941, 174.0, 267.40000000000003, 409.10000000000014, 1810.799999999999, 4.841231657445273, 74.1324168946957, 3.173211459962112], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["032. Login - /web/index.php/api/v2/dashboard/employees/subunit", 1, 0, 0.0, 177.0, 177, 177, 177.0, 177.0, 177.0, 177.0, 5.649717514124294, 8.662164548022599, 3.46486581920904], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/116/actions/allowed", 1, 0, 0.0, 180.0, 180, 180, 180.0, 180.0, 180.0, 180.0, 5.555555555555555, 7.888454861111112, 3.2172309027777777], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/116/history", 1, 0, 0.0, 185.0, 185, 185, 185.0, 185.0, 185.0, 185.0, 5.405405405405405, 10.277660472972974, 3.5103462837837838], "isController": false}, {"data": ["015. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 93.0, 10.752688172043012, 285.3662634408602, 6.373907930107527], "isController": false}, {"data": ["016. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 93.0, 10.752688172043012, 286.4583333333333, 6.41591061827957], "isController": false}, {"data": ["059. Add - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 175.5, 166, 200, 168.0, 200.0, 200.0, 200.0, 0.21026072329688814, 0.6585020894659377, 0.12319964255677039], "isController": false}, {"data": ["050. Recruitment - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 170.25, 163, 183, 167.5, 183.0, 183.0, 183.0, 0.20874647740319383, 0.29110348606617265, 0.11782760150297464], "isController": false}, {"data": ["058. Add - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 199.0, 168, 273, 177.5, 273.0, 273.0, 273.0, 0.2087246921310791, 0.2910731058234189, 0.117407639323732], "isController": false}, {"data": ["072. Close - /web/index.php/core/i18n/messages", 1, 0, 0.0, 185.0, 185, 185, 185.0, 185.0, 185.0, 185.0, 5.405405405405405, 551.8158783783783, 2.950802364864865], "isController": false}, {"data": ["042. Recruitment - /web/index.php/recruitment/viewCandidates", 4, 0, 0.0, 190.25, 187, 194, 190.0, 194.0, 194.0, 194.0, 0.195780921149234, 0.5944168787626646, 0.13555534481914736], "isController": false}, {"data": ["066. Save - /web/index.php/api/v2/recruitment/vacancies", 4, 0, 0.0, 170.25, 169, 173, 169.5, 173.0, 173.0, 173.0, 0.23897717767953158, 0.4221774554905007, 0.16172967200382363], "isController": false}, {"data": ["001.  - /", 1, 0, 0.0, 1941.0, 1941, 1941, 1941.0, 1941.0, 1941.0, 1941.0, 0.5151983513652757, 2.042680963420917, 0.549410741885626], "isController": false}, {"data": ["053. Recruitment - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 167.5, 165, 170, 167.5, 170.0, 170.0, 170.0, 0.2088881925949136, 0.6542035484881716, 0.1228034100997441], "isController": false}, {"data": ["054. Add - /web/index.php/recruitment/addCandidate", 4, 0, 0.0, 193.75, 192, 199, 192.0, 199.0, 199.0, 199.0, 0.20849622100599427, 0.6487001563721658, 0.1461916862131874], "isController": false}, {"data": ["017. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-600.woff2", 1, 0, 0.0, 94.0, 94, 94, 94.0, 94.0, 94.0, 94.0, 10.638297872340425, 282.7460106382979, 6.30610039893617], "isController": false}, {"data": ["027. Login - /web/index.php/api/v2/dashboard/employees/time-at-work", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 12.680365114795919, 3.457828443877551], "isController": false}, {"data": ["012. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 130.59129901960785, 2.924900428921569], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/118/history", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 184.0, 5.434782608695652, 10.333517323369565, 3.5294242527173916], "isController": false}, {"data": ["041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-0", 4, 0, 0.0, 171.75, 166, 179, 171.0, 179.0, 179.0, 179.0, 0.19571386632742932, 0.38913421078383403, 0.13684680497113222], "isController": false}, {"data": ["055. Add - /web/index.php/core/i18n/messages", 4, 0, 0.0, 229.25, 161, 412, 172.0, 412.0, 412.0, 412.0, 0.20883366398663464, 20.947607223034353, 0.11685711861752114], "isController": false}, {"data": ["041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule-1", 4, 0, 0.0, 194.0, 188, 204, 192.0, 204.0, 204.0, 204.0, 0.19562772044798749, 0.593951741086712, 0.13544927128674134], "isController": false}, {"data": ["002.  - /web/index.php/auth/login", 1, 0, 0.0, 197.0, 197, 197, 197.0, 197.0, 197.0, 197.0, 5.076142131979695, 13.027442893401014, 2.994130710659898], "isController": false}, {"data": ["041. Recruitment - /web/index.php/recruitment/viewRecruitmentModule", 4, 0, 0.0, 366.0, 356, 383, 362.5, 383.0, 383.0, 383.0, 0.1939299912731504, 0.974384575293319, 0.26987327887132745], "isController": false}, {"data": ["052. Recruitment - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 172.75, 169, 177, 172.5, 177.0, 177.0, 177.0, 0.2087791638394488, 0.6538620883135864, 0.12273931311655098], "isController": false}, {"data": ["026. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-700.woff2", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 101.0, 9.900990099009901, 267.90686881188117, 5.869043935643564], "isController": false}, {"data": ["067. Save - /web/index.php/api/v2/leave/holidays", 4, 0, 0.0, 171.25, 168, 179, 169.0, 179.0, 179.0, 179.0, 0.23883448770002388, 0.7479904316933365, 0.1406417930499164], "isController": false}, {"data": ["029. Login - /web/index.php/api/v2/buzz/feed", 1, 0, 0.0, 189.0, 189, 189, 189.0, 189.0, 189.0, 189.0, 5.291005291005291, 339.71457506613757, 3.146701388888889], "isController": false}, {"data": ["037. Login - /web/index.php/pim/viewPhoto/empNumber/22", 1, 0, 0.0, 160.0, 160, 160, 160.0, 160.0, 160.0, 160.0, 6.25, 9.124755859375, 3.753662109375], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/115", 1, 0, 0.0, 205.0, 205, 205, 205.0, 205.0, 205.0, 205.0, 4.878048780487805, 15.267721036585368, 3.429878048780488], "isController": false}, {"data": ["049. Recruitment - /web/index.php/api/v2/recruitment/candidates/statuses", 4, 0, 0.0, 172.5, 170, 175, 172.5, 175.0, 175.0, 175.0, 0.20871380120010435, 0.34379687907644146, 0.13105759196451866], "isController": false}, {"data": ["062. Save - /web/index.php/core/i18n/messages", 4, 0, 0.0, 233.0, 163, 427, 171.0, 427.0, 427.0, 427.0, 0.2346866932644919, 23.540404614527105, 0.1320112649612767], "isController": false}, {"data": ["040. Login - /web/index.php/pim/viewPhoto/empNumber/9", 1, 0, 0.0, 161.0, 161, 161, 161.0, 161.0, 161.0, 161.0, 6.211180124223602, 9.068080357142858, 3.7242818322981366], "isController": false}, {"data": ["031. Login - /web/index.php/api/v2/dashboard/employees/leaves", 1, 0, 0.0, 180.0, 180, 180, 180.0, 180.0, 180.0, 180.0, 5.555555555555555, 7.71484375, 3.488498263888889], "isController": false}, {"data": ["030. Login - /web/index.php/api/v2/dashboard/shortcuts", 1, 0, 0.0, 173.0, 173, 173, 173.0, 173.0, 173.0, 173.0, 5.780346820809248, 8.687454841040463, 3.49981936416185], "isController": false}, {"data": ["036. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-italic.woff2", 1, 0, 0.0, 88.0, 88, 88, 88.0, 88.0, 88.0, 88.0, 11.363636363636363, 312.8995028409091, 6.769353693181818], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/118", 1, 0, 0.0, 175.0, 175, 175, 175.0, 175.0, 175.0, 175.0, 5.714285714285714, 10.2734375, 3.2198660714285716], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/117", 1, 0, 0.0, 171.0, 171, 171, 171.0, 171.0, 171.0, 171.0, 5.847953216374268, 10.513751827485379, 3.2951845760233915], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/116", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 10.326867816091955, 3.238371048850575], "isController": false}, {"data": ["007. Home - /web/index.php/core/i18n/messages", 1, 0, 0.0, 585.0, 585, 585, 585.0, 585.0, 585.0, 585.0, 1.7094017094017093, 171.45599626068378, 0.9331597222222223], "isController": false}, {"data": ["064. Save - /web/index.php/api/v2/recruitment/candidates/115", 1, 0, 0.0, 189.0, 189, 189, 189.0, 189.0, 189.0, 189.0, 5.291005291005291, 9.517609126984127, 2.9813574735449735], "isController": false}, {"data": ["019. Login - /web/index.php/auth/validate-1", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 14.95959712009804, 3.7961473651960786], "isController": false}, {"data": ["048. Recruitment - /web/index.php/api/v2/recruitment/hiring-managers", 4, 0, 0.0, 180.25, 176, 184, 180.5, 184.0, 184.0, 184.0, 0.19659884006684358, 0.2925943674432321, 0.12421821242504669], "isController": false}, {"data": ["069. Save - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 171.25, 170, 173, 171.0, 173.0, 173.0, 173.0, 0.23874895547331978, 0.33294287931240296, 0.1349957472842306], "isController": false}, {"data": ["001.  - /-1", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 206.0, 4.854368932038835, 12.84227093446602, 2.6452518203883497], "isController": false}, {"data": ["001.  - /-0", 1, 0, 0.0, 1731.0, 1731, 1731, 1731.0, 1731.0, 1731.0, 1731.0, 0.5777007510109763, 0.7621813619295205, 0.3012619150779896], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/115/history", 1, 0, 0.0, 186.0, 186, 186, 186.0, 186.0, 186.0, 186.0, 5.376344086021506, 10.222404233870968, 3.4914734543010755], "isController": false}, {"data": ["063. Save - /web/index.php/pim/viewPhoto/empNumber/7", 4, 0, 0.0, 169.75, 161, 181, 168.5, 181.0, 181.0, 181.0, 0.23863500775563776, 4.127173815773774, 0.1451851658513304], "isController": false}, {"data": ["044. Recruitment - /web/index.php/pim/viewPhoto/empNumber/7", 4, 0, 0.0, 172.25, 163, 183, 171.5, 183.0, 183.0, 183.0, 0.1966955153422502, 3.4018335710070815, 0.1194771587332809], "isController": false}, {"data": ["051. Recruitment - /web/index.php/api/v2/leave/workweek", 4, 0, 0.0, 220.25, 166, 368, 173.5, 368.0, 368.0, 368.0, 0.20875737174468972, 0.29111867856583684, 0.11783375084807682], "isController": false}, {"data": ["072. Close - /web/index.php/core/i18n/messages-0", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 197.37413194444446, 0.0], "isController": false}, {"data": ["039. Login - /web/index.php/pim/viewPhoto/empNumber/11", 1, 0, 0.0, 164.0, 164, 164, 164.0, 164.0, 164.0, 164.0, 6.097560975609756, 8.902200838414634, 3.662109375], "isController": false}, {"data": ["068. Save - /web/index.php/api/v2/recruitment/candidates/117/history", 1, 0, 0.0, 179.0, 179, 179, 179.0, 179.0, 179.0, 179.0, 5.58659217877095, 10.622163058659218, 3.6280115223463687], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/118", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 194.0, 5.154639175257732, 16.13341655927835, 3.6243556701030926], "isController": false}, {"data": ["019. Login - /web/index.php/auth/validate-0", 1, 0, 0.0, 481.0, 481, 481, 481.0, 481.0, 481.0, 481.0, 2.079002079002079, 4.2107913201663205, 1.9957607848232848], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/117", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 15.978754783163264, 3.5873724489795915], "isController": false}, {"data": ["019. Login - /web/index.php/auth/validate", 1, 0, 0.0, 686.0, 686, 686, 686.0, 686.0, 686.0, 686.0, 1.4577259475218658, 7.401091016763848, 2.528243440233236], "isController": false}, {"data": ["061. Save - /web/index.php/recruitment/addCandidate/116", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 199.0, 5.025125628140704, 15.723146984924622, 3.533291457286432], "isController": false}, {"data": ["056. Add - /web/index.php/pim/viewPhoto/empNumber/7", 4, 0, 0.0, 178.25, 161, 207, 172.5, 207.0, 207.0, 207.0, 0.2098085496984002, 3.6286224757408863, 0.12703252032520324], "isController": false}, {"data": ["070. Close - /web/index.php/auth/logout", 1, 0, 0.0, 352.0, 352, 352, 352.0, 352.0, 352.0, 352.0, 2.840909090909091, 12.975519353693183, 3.914572975852273], "isController": false}, {"data": ["011. Home - /web/dist/img/blob.svg", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 108.0, 9.25925925925926, 15.236183449074074, 5.452473958333333], "isController": false}, {"data": ["028. Login - /web/index.php/api/v2/dashboard/employees/action-summary", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 182.0, 5.4945054945054945, 7.7910370879120885, 3.4072372939560442], "isController": false}, {"data": ["060. Save - /web/index.php/api/v2/recruitment/candidates?", 4, 0, 0.0, 188.0, 174, 226, 176.0, 226.0, 226.0, 226.0, 0.21053739670508972, 0.30429233117532506, 0.18031376651402706], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/115/actions/allowed", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 8.160470545977011, 3.3281698994252875], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/118/actions/allowed", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 8.160470545977011, 3.3281698994252875], "isController": false}, {"data": ["057. Add - /web/index.php/api/v2/recruitment/vacancies", 4, 0, 0.0, 179.25, 166, 192, 179.5, 192.0, 192.0, 192.0, 0.21048200378867607, 0.371837836771206, 0.14182869395916647], "isController": false}, {"data": ["035. Login - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-300.woff2", 1, 0, 0.0, 90.0, 90, 90, 90.0, 90.0, 90.0, 90.0, 11.11111111111111, 292.8385416666667, 6.586371527777778], "isController": false}, {"data": ["065. Save - /web/index.php/api/v2/recruitment/candidates/117/actions/allowed", 1, 0, 0.0, 176.0, 176, 176, 176.0, 176.0, 176.0, 176.0, 5.681818181818182, 8.067737926136363, 3.2903497869318183], "isController": false}, {"data": ["013. Home - /web/dist/fonts/nunito-sans-v6-latin-ext_latin-800.woff2", 1, 0, 0.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 98.0, 10.204081632653061, 270.8067602040816, 6.048708545918367], "isController": false}, {"data": ["034. Login - /web/index.php/events/push", 1, 0, 0.0, 158.0, 158, 158, 158.0, 158.0, 158.0, 158.0, 6.329113924050633, 8.87559335443038, 4.085492484177215], "isController": false}, {"data": ["020. Login - /web/index.php/dashboard/index", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 194.0, 5.154639175257732, 15.73071037371134, 3.488442332474227], "isController": false}, {"data": ["047. Recruitment - /web/index.php/api/v2/recruitment/vacancies", 4, 0, 0.0, 173.0, 172, 174, 173.0, 174.0, 174.0, 174.0, 0.19665683382497542, 0.3474142699115044, 0.13078447640117993], "isController": false}, {"data": ["021. Login - /web/index.php/core/i18n/messages", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 167.0, 5.9880239520958085, 600.6561096556886, 3.298091317365269], "isController": false}, {"data": ["070. Close - /web/index.php/auth/logout-0", 1, 0, 0.0, 164.0, 164, 164, 164.0, 164.0, 164.0, 164.0, 6.097560975609756, 12.201076600609756, 4.203982469512195], "isController": false}, {"data": ["070. Close - /web/index.php/auth/logout-1", 1, 0, 0.0, 187.0, 187, 187, 187.0, 187.0, 187.0, 187.0, 5.347593582887701, 13.724097593582888, 3.681692847593583], "isController": false}, {"data": ["024. Login - /web/index.php/pim/viewPhoto/empNumber/7", 1, 0, 0.0, 172.0, 172, 172, 172.0, 172.0, 172.0, 172.0, 5.813953488372093, 100.55187136627907, 3.486101017441861], "isController": false}, {"data": ["033. Login - /web/index.php/api/v2/dashboard/employees/locations", 1, 0, 0.0, 170.0, 170, 170, 170.0, 170.0, 170.0, 170.0, 5.88235294117647, 8.674172794117647, 3.6190257352941173], "isController": false}, {"data": ["046. Recruitment - /web/index.php/api/v2/admin/job-titles", 4, 0, 0.0, 174.75, 174, 177, 174.0, 177.0, 177.0, 177.0, 0.19665683382497542, 0.9923104105211407, 0.12214233038348082], "isController": false}, {"data": ["014. Home - /web/dist/fonts/bootstrap-icons.woff2", 1, 0, 0.0, 173.0, 173, 173, 173.0, 173.0, 173.0, 173.0, 5.780346820809248, 692.5916726878613, 3.3191835260115607], "isController": false}, {"data": ["043. Recruitment - /web/index.php/core/i18n/messages", 4, 0, 0.0, 195.25, 169, 257, 177.5, 257.0, 257.0, 257.0, 0.19587679349689044, 19.64831698986338, 0.10998941041085158], "isController": false}, {"data": ["045. Recruitment - /web/index.php/api/v2/recruitment/candidates", 4, 0, 0.0, 558.0, 264, 1435, 266.5, 1435.0, 1435.0, 1435.0, 0.19579050416054822, 2.6656858021292216, 0.13690039158100833], "isController": false}]}, function(index, item){
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
