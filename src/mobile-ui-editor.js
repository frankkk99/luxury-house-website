const presetMap = {
  airy: {
    label: 'โล่ง',
    values: [100, 220, 132, 72, 24],
  },
  compact: {
    label: 'กะทัดรัด',
    values: [86, 178, 108, 34, 18],
  },
  cards: {
    label: 'การ์ดใหญ่',
    values: [96, 270, 176, 54, 26],
  },
  glass: {
    label: 'แถบใส',
    values: [96, 220, 132, 52, 10],
  },
}

const dispatchRangeValue = (input, value) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
  if (setter) setter.call(input, String(value))
  else input.value = String(value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

const applyPreset = (preset) => {
  const panel = document.querySelector('.flowEditor')
  if (!panel) return
  const inputs = [...panel.querySelectorAll('.flowRange input[type="range"]')]
  preset.values.forEach((value, index) => {
    if (inputs[index]) dispatchRangeValue(inputs[index], value)
  })
  panel.classList.add('presetPulse')
  window.setTimeout(() => panel.classList.remove('presetPulse'), 280)
}

const buildPresetBar = (panel) => {
  if (panel.querySelector('.mobilePresetBar')) return
  const bar = document.createElement('div')
  bar.className = 'mobilePresetBar'
  bar.innerHTML = Object.entries(presetMap)
    .map(([key, preset]) => `<button type="button" data-preset="${key}">${preset.label}</button>`)
    .join('')
  bar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-preset]')
    if (!button) return
    applyPreset(presetMap[button.dataset.preset])
  })
  const head = panel.querySelector('.flowEditorHead')
  head?.insertAdjacentElement('afterend', bar)
}

const observeEditor = () => {
  const setup = () => {
    document.querySelectorAll('.flowEditor').forEach(buildPresetBar)
  }
  setup()
  const observer = new MutationObserver(setup)
  observer.observe(document.documentElement, { childList: true, subtree: true })
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observeEditor)
  else observeEditor()
}
