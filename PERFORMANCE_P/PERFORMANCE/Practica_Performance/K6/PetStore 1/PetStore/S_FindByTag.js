import http from 'k6/http'
import { check } from 'k6'
import { sleep, group } from 'k6'
import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data'
import { scenario } from 'k6/execution'

//export const options = { vus: 1, duration: '1m' }
export const options = { 
    iterations: 1,
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
  console.log(`Iteración: ${scenario.iterationInTest}`)
    console.log(`Virtual user id: ${__VU}, Dato actual: ${dato.id} `)

    //'{"id": 103,\r\n  "name": "Doggie101",\r\n  "category": {\r\n    "id": 103,\r\n    "name": "Dogs"\r\n  },\r\n  "photoUrls": [\r\n    "string"\r\n  ],\r\n  "tags": [\r\n    {\r\n      "id": 0,\r\n      "name": "string"\r\n    }\r\n  ],\r\n  "status": "available"\r\n  }'

    response = http.get('https://petstore3.swagger.io/api/v3/pet/findByTags?tags=' + dato.name )
  
    //console.log('Request Body: ' + response.request.body)
    console.log('Request url: ' + response.url)
    console.log('Response Body: ' + response.body)
    //console.log('Response headers: ' + response.headers)
    //console.log('Pet Id: ' + findBetween(response.body, 'id":',','))
 }
