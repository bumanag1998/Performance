// Creator: k6 Browser Recorder 0.6.0
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

  group('page_1 - https://opensource-demo.orangehrmlive.com/', function () {
    response = http.get('https://opensource-demo.orangehrmlive.com/', {
      headers: {
        host: 'opensource-demo.orangehrmlive.com',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'accept-encoding': 'gzip, deflate, br',
        dnt: '1',
        'sec-gpc': '1',
        connection: 'keep-alive',
        'upgrade-insecure-requests': '1',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
      },
    })
    //sleep(11)
  })

  group('page_2 - https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', function () {
    response = http.get(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', 
      {
        headers: {
          host: 'opensource-demo.orangehrmlive.com',
          accept: 'application/json',
          'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
          'accept-encoding': 'gzip, deflate, br',
          contenttype: 'application/json',
          dnt: '1',
          'sec-gpc': '1',
          connection: 'keep-alive',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      },
      { responseType: 'text' }
    )
    //sleep(23.6)
    token = findBetween(response.body, 'token="&quot;', '&quot;');
  })

  group(
    'page_3 - https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
    function () {
      response = http.post(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
        {
          _token: token,
          username: 'Admin',
          password: 'admin123',
        },
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://opensource-demo.orangehrmlive.com',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'upgrade-insecure-requests': '1',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
          },
        }
      )
      //sleep(1.3)
      //console.log('Response Body: ' + response.body)
      console.log('URL: ' + response.url)
      console.log('Token: ' + token)
      //console.log('Request Body: ' + response.request.body)
    }
  )
/*
  group(
    'page_4. Dashboard - https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
    function () {
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            contenttype: 'application/json',
            'if-none-match': '"r2bCuSoCq/RIhAIrdHucIA2NuLVeuc+DC+DURIjsY5E="',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(0.5)
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/time-at-work?timezoneOffset=-5&currentDate=2024-04-06&currentTime=11:35',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, *//**',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/leaves?date=2024-04-06',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      response = http.post(
        'https://opensource-demo.orangehrmlive.com/web/index.php/events/push',
        null,
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            origin: 'https://opensource-demo.orangehrmlive.com',
            dnt: '1',
            'sec-gpc': '1',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      //sleep(4.1)
    }
  )
    */
}