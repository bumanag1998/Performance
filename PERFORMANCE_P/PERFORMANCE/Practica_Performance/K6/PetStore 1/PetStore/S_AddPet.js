import http from 'k6/http'
import { check,  sleep, group } from 'k6'
import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data'
import { scenario } from 'k6/execution'

//export const options = { vus: 1, duration: '1m' }
export const options = { 
    //iterations: 6,
    duration: '5m', target: 5,
    thresholds: { http_req_duration: ['avg<1000', 'p(90)<1000'] },
    noConnectionReuse: true,
 }

 const csvData = new SharedArray('IdTags', function () { //Abrimos archivo de datos y lo cargamos en memoria
  return papaparse.parse(open('Data/DataPets.csv'), { header: true }).data
})

 export default function main() {
    let response
    //const dato = csvData[Math.floor(Math.random() * csvData.length)] // para usar datos aleatorios
    const dato = csvData[scenario.iterationInTest]; // para sacar un dato diferente por cada iteración se va iterando el dato del archivo.
  //  console.log('Random user: ', JSON.stringify(dato));
  
    //'{"id": 103,\r\n  "name": "Doggie101",\r\n  "category": {\r\n    "id": 103,\r\n    "name": "Dogs"\r\n  },\r\n  "photoUrls": [\r\n    "string"\r\n  ],\r\n  "tags": [\r\n    {\r\n      "id": 0,\r\n      "name": "string"\r\n    }\r\n  ],\r\n  "status": "available"\r\n  }'

    response = http.post(
        'https://petstore3.swagger.io/api/v3/pet',
        `{"id": ${dato.id},\r\n  "name": "${dato.name}",\r\n  "category": {\r\n    "id": ${dato.id},\r\n    "name": "${dato.category}"\r\n  },\r\n  "photoUrls": [\r\n    "string"\r\n  ],\r\n  "tags": [\r\n    {\r\n      "id": 0,\r\n      "name": "string"\r\n    }\r\n  ],\r\n  "status": "available"\r\n  }`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
    )
  
    console.log(`Iteración: ${scenario.iterationInTest}`)
    console.log(`Virtual user id: ${__VU}, Dato actual: ${dato.id} `)
    console.log('Response Body: ' + response.body)
    console.log('Response headers: ' + response.url)
    console.log('Response status: ' + response.status + ': ' + response.status_text)
    console.log('Pet Id: ' + findBetween(response.body, 'id":',','))
 }
