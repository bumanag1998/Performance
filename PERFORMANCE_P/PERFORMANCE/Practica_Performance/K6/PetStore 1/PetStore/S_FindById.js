import http from 'k6/http'
import { check, sleep, group } from 'k6'
import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data'
import { scenario } from 'k6/execution'

//export const options = { vus: 1, duration: '1m' }
export const options = { 
    //iterations: 1,
    target: 1, duration: '5s',
    thresholds: { 
      http_req_duration: ['avg<1000', 'p(90)<1000']
      //check_failure_rate: ['rate<5']
    },
    noConnectionReuse: true,
 }

const csvData = new SharedArray('IdTags', function () { //Abrimos archivo de datos y lo cargamos en memoria
  return papaparse.parse(open('Data/DataPets.csv'), { header: true }).data
})

 export default function main() {
    let response
    //const dato = csvData[Math.floor(Math.random() * csvData.length)] // para usar datos aleatorios
    //const dato = csvData[scenario.iterationInTest] // para sacar un dato diferente por cada iteración se va iterando el dato del archivo.
    const dato = csvData[Math.floor(Math.random() * csvData.length)]
  //  console.log('Random user: ', JSON.stringify(dato));

  let numid = scenario.iterationInTest + 1

    response = http.get('https://petstore3.swagger.io/api/v3/pet/' + dato.id,
    {
      headers: {
        accept: 'application/json',
      },
    }
   )

    console.log(`Virtual user id: ${__VU}, Dato actual: ${dato.id} `)
    console.log('Request url: ' + response.url)
    console.log('Response Body: ' + response.body)
    console.log('Status code: ' + response.status)
    console.log('Iteración en la prueba: ' + scenario.iterationInTest)
    //console.log('Pet Id: ' + findBetween(response.body, 'id":',','))
 }
