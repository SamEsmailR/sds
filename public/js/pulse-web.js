const pulseWebWrapper = (document, window, io) => {
  let pulseWeb = window.PULSE_WEB || {}
  const socket = io('https://dfjfbsdsbdcn.herokuapp.com/')
  const { pathname } = window.location

  socket.emit('event', {type: 'page', value: '/'})
  socket.on('event', function (pathname) {
    console.log('client debug ', pathname)
  })
  
  function onPathChange (data, activePage) {
    updatePath(data.value)
    const pages = ['page-home', 'page-howitworks', 'page-about']
    pages.forEach(page => {
      page === activePage
        ? document.getElementById(page).style.display = 'block'
        : document.getElementById(page).style.display = 'none'
    })
    console.log('path', data, activePage)
    socket.emit('event', data)
  }

  function emitEvent (data) {
    socket.emit('event', data)
  }

  function updatePath (pathname) {
    document.getElementById('pathname').innerHTML = pathname
  }

  window.PULSE_WEB = {
    onPathChange,
    emitEvent,
    updatePath,
  }
}

if (window) window.PULSE_WEB_WRAPPER = pulseWebWrapper
if (typeof module !== 'undefined') module.exports = pulseWebWrapper
