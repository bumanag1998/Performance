import http from 'k6/http'
import { check } from 'k6'
import { sleep, group } from 'k6'
import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'

//export const options = { vus: 1, duration: '1m' }
export const options = { 
    iterations: 1,
    thresholds: { http_req_duration: ['avg<1000', 'p(90)<1000'] },
    noConnectionReuse: true,
 }

 export default function main() {
    let response, token
    response = http.get('https://petstore3.swagger.io/api/v3/store/inventory', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log('Response Body: ' + response.body)
 }