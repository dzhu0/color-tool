const hexInput = document.getElementById('hex-input')
const error = document.getElementById('error')
const inputColor = document.getElementById('input-color')
const alteredColor = document.getElementById('altered-color')
const alteredColorText = document.getElementById('altered-color-text')
const slider = document.getElementById('slider')
const sliderText = document.getElementById('slider-text')
const lightenText = document.getElementById('lighten-text')
const darkenText = document.getElementById('darken-text')
const toggleBtn = document.getElementById('toggle-btn')

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value.replace('#', '')

    if (!isValidHex(hex)) {
        error.textContent = "Invalid hex value!"
        slider.disabled = true
        return
    }
    
    error.textContent = ""
    slider.disabled = false
    inputColor.style.backgroundColor = `#${hex}`
    updateAlteredColor(hex)
})

toggleBtn.addEventListener('click', () => {
    const hex = hexInput.value.replace('#', '')

    if (toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled')
        lightenText.classList.remove('unselected')
        darkenText.classList.add('unselected')
    } else {
        toggleBtn.classList.add('toggled')
        lightenText.classList.add('unselected')
        darkenText.classList.remove('unselected')
    }

    isValidHex(hex) && updateAlteredColor(hex)
})

slider.addEventListener('input', () => {
    updateAlteredColor(hexInput.value.replace('#', ''))
})

function isValidHex(hex) {
    if (!/^[0-9a-f]+$/i.test(hex)) return false
    return hex.length === 3 || hex.length === 6
}

function convertHexToRGB(hex) {
    let longHex = hex

    if (longHex.length === 3) {
        longHex = toLongHex(longHex)
    }

    const r = parseInt(longHex.substring(0, 2), 16)
    const g = parseInt(longHex.substring(2, 4), 16)
    const b = parseInt(longHex.substring(4, 6), 16)

    return { r, g, b }
}

function toLongHex(shortHex) {
    return shortHex[0] + shortHex[0]
        + shortHex[1] + shortHex[1]
        + shortHex[2] + shortHex[2]
}

function convertRGBToHex(r, g, b) {
    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair = ("0" + b.toString(16)).slice(-2)

    return firstPair + secondPair + thirdPair
}

function getAlterColor(hex, percentage) {
    const { r, g, b } = convertHexToRGB(hex)

    const amount = Math.floor((percentage / 100) * 255)

    const newR = increaseWithin0To255(r, amount)
    const newG = increaseWithin0To255(g, amount)
    const newB = increaseWithin0To255(b, amount)

    return convertRGBToHex(newR, newG, newB)
}

function increaseWithin0To255(hex, amount) {
    return Math.min(255, Math.max(0, hex + amount))
}

function updateAlteredColor(hex) {
    const valueAddition = toggleBtn.classList.contains('toggled') ?
        -slider.value
        : slider.value

    const alteredHex = getAlterColor(hex, valueAddition)

    sliderText.textContent = `${slider.value}%`
    alteredColorText.textContent = `#${alteredHex}`
    alteredColor.style.backgroundColor = `#${alteredHex}`
}
