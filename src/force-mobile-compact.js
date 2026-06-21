const setCompactMobile = () => {
  if (!window.matchMedia('(max-width: 760px)').matches) return
  try { localStorage.removeItem('estate-flow-ui') } catch {}
  const root = document.documentElement
  root.style.setProperty('--flow-card-width', '220px')
  root.style.setProperty('--flow-card-img', '138px')
  root.style.setProperty('--flow-hero-height', '54vh')
  root.style.setProperty('--flow-section-gap', '14px')
  root.style.setProperty('--flow-top-opacity', '.22')
}

setCompactMobile()
window.addEventListener('resize', setCompactMobile)
window.addEventListener('orientationchange', setCompactMobile)
window.setTimeout(setCompactMobile, 80)
window.setTimeout(setCompactMobile, 350)
