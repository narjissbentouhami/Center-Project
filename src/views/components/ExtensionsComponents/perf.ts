export function initPerformanceTab(mainViewer: any) {
  const COLOR_PALETTE = []
  for (let i = 8; i > 0; i--) {
    COLOR_PALETTE.push({
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255)
    })
  }

  const temperatures = new Float32Array(1500)

  const ALERTS_STORAGE_KEY = 'alert-config'
  const alerts = JSON.parse(localStorage.getItem(ALERTS_STORAGE_KEY) || '{}')

  const needle = document.getElementById('gauge-needle')
  var dbid = 10 // random number to start with
  /*
  alerts = {
      <partId>: {
          temperature: {
              max: <number>
          }
      }
  };
  */

  function createEngineSpeedChart() {
    //@ts-ignore
    const ctx = document.getElementById('engine-speed-chart').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Speed [rpm]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }
  function createEngineSpeedChart2() {
    //@ts-ignore
    const ctx = document.getElementById('engine-speed-chart-2').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Speed [rpm]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }
  function createEngineSpeedChart3() {
    //@ts-ignore
    const ctx = document.getElementById('engine-speed-chart-3').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Speed [rpm]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }

  function createEngineSpeedChartBar() {
    //@ts-ignore
    const ctx = document.getElementById('engine-load-chart').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Speed [rpm]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }

  function createEngineVibrationsChart() {
    //@ts-ignore
    const ctx = document.getElementById('engine-vibrations-chart').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Min [mm/s]',
            borderColor: '#85b7b5',
            backgroundColor: '#85b7b550',
            data: []
          },
          {
            label: 'Avg [mm/s]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          },
          {
            label: 'Max [mm/s]',
            borderColor: '#185265',
            backgroundColor: '#18526550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }

  function createEngineVibrationsChart2() {
    //@ts-ignore
    const ctx = document.getElementById('engine-vibrations-chart-2').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Min [mm/s]',
            borderColor: '#85b7b5',
            backgroundColor: '#85b7b550',
            data: []
          },
          {
            label: 'Avg [mm/s]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          },
          {
            label: 'Max [mm/s]',
            borderColor: '#185265',
            backgroundColor: '#18526550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }
  function createEngineVibrationsChart3() {
    //@ts-ignore
    const ctx = document.getElementById('engine-vibrations-chart-3').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Min [mm/s]',
            borderColor: '#85b7b5',
            backgroundColor: '#85b7b550',
            data: []
          },
          {
            label: 'Avg [mm/s]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          },
          {
            label: 'Max [mm/s]',
            borderColor: '#185265',
            backgroundColor: '#18526550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }
  function createEngineVibrationsChart4() {
    //@ts-ignore
    const ctx = document.getElementById('engine-vibrations-chart-4').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Min [mm/s]',
            borderColor: '#85b7b5',
            backgroundColor: '#85b7b550',
            data: []
          },
          {
            label: 'Avg [mm/s]',
            borderColor: '#0e8685',
            backgroundColor: '#0e868550',
            data: []
          },
          {
            label: 'Max [mm/s]',
            borderColor: '#185265',
            backgroundColor: '#18526550',
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    })
    return chart
  }
  function createPartTemperaturesChart() {
    //@ts-ignore
    const ctx = document.getElementById('part-temperatures-chart').getContext('2d')
    //@ts-ignore
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Avg. Temp.',
            data: [12, 19, 3, 5, 2, 3].map(i => Math.floor(Math.random() * 100)),
            backgroundColor: ['#0e868550', '#0e868550', '#0e868550', '#0e868550', '#0e868550', '#0e868550'],
            borderColor: ['#0e8685', '#0e8685', '#0e8685', '#0e8685', '#0e8685', '#0e8685'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    })
    return chart
  }

  function refreshEngineSpeed(chart: any) {
    chart.data.datasets[0].data.push({
      x: Date.now(),
      y: 9750.0 + Math.random() * 500.0
    })
  }

  function updateTemperatureAlertForm(partIds: string | any[]) {
    let $form = $('#temperature-alert-form')
    if (!partIds || partIds.length !== 1) {
      $form.fadeOut()
    } else {
      $('#temperature-alert-part').val(partIds[0])
      const config = alerts[partIds[0]]
      if (config && config.temperature && config.temperature.max) {
        $('#temperature-alert-max').val(config.temperature.max)
      } else {
        $('#temperature-alert-max').val('')
      }
      $form.fadeIn()
    }
  }

  function refreshEngineVibrations(chart: any) {
    const date = Date.now()
    const minVibration = 2.0 + Math.random()
    const maxVibration = minVibration + Math.random()
    chart.data.datasets[0].data.push({ x: date, y: minVibration })
    chart.data.datasets[1].data.push({ x: date, y: 0.5 * (minVibration + maxVibration) })
    chart.data.datasets[2].data.push({ x: date, y: maxVibration })
  }

  const engineSpeedChart = createEngineSpeedChart()
  const engineSpeedChart2 = createEngineSpeedChart2()
  const engineSpeedChart3 = createEngineSpeedChart3()
  const engineVibrationsChart = createEngineVibrationsChart()
  const engineVibrationsChart2 = createEngineVibrationsChart2()
  const engineVibrationsChart3 = createEngineVibrationsChart3()
  const engineVibrationsChart4 = createEngineVibrationsChart4()
  const partTemperaturesChart = createPartTemperaturesChart()
  const engineSpeedChartBar = createEngineSpeedChartBar()

  const $partCurrentTemperature = $('#part-current-temperature')
  const $partTemperatureChart = $('#part-temperatures-chart')
  const $partSelectionAlert = $('#performance-part div.alert')
  mainViewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function () {
    const ids = mainViewer.getSelection()
    if (ids.length === 1) {
      dbid = ids[0]

      // Generate a set of random temperatures (between 95.0 and 105.0) with dbId as seed
      let rng = new RandomNumberGenerator(dbid)
      let temperatures = []
      for (let i = 0; i < 6; i++) {
        temperatures.push(95.0 + rng.nextFloat() * 10.0)
      }
      partTemperaturesChart.data.datasets[0].data = temperatures
      partTemperaturesChart.update()
      $partCurrentTemperature.show()
      $partTemperatureChart.show()
      $partSelectionAlert.hide()
    } else {
      $partCurrentTemperature.hide()
      $partTemperatureChart.hide()
      $partSelectionAlert.show()
    }
  })
  $partCurrentTemperature.hide()
  $partTemperatureChart.hide()
  $partSelectionAlert.show()

  $('#temperature-alert-form button.btn-primary').on('click', function (ev) {
    const partId = parseInt(($('#temperature-alert-part') as any).val())
    const tempMax = parseFloat(($('#temperature-alert-max') as any).val())
    alerts[partId] = alerts[partId] || {}
    alerts[partId].temperature = alerts[partId].temperature || {}
    alerts[partId].temperature.max = tempMax
    window.localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts))
    updateTemperatureAlertForm([partId])
    ev.preventDefault()
  })
  $('#temperature-alert-form button.btn-secondary').on('click', function (ev) {
    const partId: any = $('#temperature-alert-part').val()
    delete alerts[partId]
    window.localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts))
    updateTemperatureAlertForm([partId])
    ev.preventDefault()
  })

  setInterval(function () {
    refreshEngineSpeed(engineSpeedChart)
    refreshEngineSpeed(engineSpeedChartBar)
    refreshEngineVibrations(engineVibrationsChart)
  }, 1000)
}

class RandomNumberGenerator {
  m: number
  a: number
  c: number
  state: number
  constructor(seed: number) {
    this.m = 0x80000000
    this.a = 1103515245
    this.c = 12345
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1))
  }

  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m
    return this.state
  }

  nextFloat() {
    return this.nextInt() / (this.m - 1)
  }
}
