// Creator: k6 Browser Recorder 0.6.0
import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = { vus: 10, duration: '1m' }

export default function main() {
  let response

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
    sleep(1)
  })

  group('page_2 - https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', function () {
    response = http.get(
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages', 
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
    //let token = findBetween(response.body, '<title>', '</title>');
    console.log('Token: ' + response._token)
    console.log('URL: ' + response.url)
    console.log('Response Body: ' + response.body)
  })

  group(
    'page_3 - https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
    function () {
      response = http.post(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
        {
          _token:
            'bbc4b2f332d9cb.LfR7RRv0O44yetAMSXDDlVBGA_j-7cX57HgFSq-Wz0c.TrAfJnOyTct3V488PhGs-Rgnb67J1IGJnT0xeeSnpz4AohIddat94AIl6A',
          username: 'Admin',
          password: 'admin123',
        },
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
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
    }
  )

  group(
    'page_4 - https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
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
            accept: 'application/json, text/plain, */*',
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
      sleep(4.1)
    }
  )

  group(
    'page_5 - https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule',
    function () {
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule',
        {
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
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
          },
        }
      )
      sleep(1.1)
    }
  )

  group(
    'page_6 - https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles?limit=0',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies?model=summary&limit=0&excludeInterviewers=false',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/hiring-managers?limit=0',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/statuses',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/workweek?model=indexed',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/workweek?model=indexed',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/holidays?fromDate=2024-01-01&toDate=2024-12-31',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/holidays?fromDate=2024-01-01&toDate=2024-12-31',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
      sleep(3.8)
    }
  )

  group(
    'page_7 - https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate',
    function () {
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate',
        {
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
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
          },
        }
      )
      sleep(0.8)

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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies?model=summary&limit=0&status=true&excludeInterviewers=true',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/workweek?model=indexed',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/holidays?fromDate=2024-01-01&toDate=2024-12-31',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
      sleep(57.6)

      response = http.post(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates',
        '{"firstName":"Alexander","middleName":"Manuel","lastName":"Lopez","email":"amlopez@yopmail.com","contactNumber":"123456789","keywords":"Prueba K6","comment":"Prueba K6","dateOfApplication":"2024-04-06","consentToKeepData":true,"vacancyId":2}',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json',
            'accept-language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'accept-encoding': 'gzip, deflate, br',
            'content-type': 'application/json',
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
      sleep(3)
    }
  )

  group(
    'page_8 - https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/90',
    function () {
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/90',
        {
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
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
          },
        }
      )
      sleep(0.7)
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/90',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
      sleep(0.7)
      response = http.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/90/actions/allowed',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies?model=summary&limit=0&status=true&excludeInterviewers=true',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/workweek?model=indexed',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/90/history?limit=50&offset=0',
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
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/holidays?fromDate=2024-01-01&toDate=2024-12-31',
        {
          headers: {
            host: 'opensource-demo.orangehrmlive.com',
            accept: 'application/json, text/plain, */*',
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
      sleep(4.7)
    }
  )

  group(
    'page_9 - https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout',
    function () {
      response = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout', {
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
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
        },
      })
      sleep(1.1)
    }
  )

  group(
    'page_10 - https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
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
    }
  )
}