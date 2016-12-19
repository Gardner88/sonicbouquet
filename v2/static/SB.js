var index
var len = Object.keys(datavase).length
var audio = new Audio()

NodeList.prototype.forEach = Array.prototype.forEach

function chooseNumber() {
    return Math.floor(Math.random() * len) + 1
}

function startFlower(index) {
    updateDOM(index)
    updateMusic(index)
}

function updateDOM(index) {
    var content = datavase[index]
    document.querySelector('.title').innerHTML = content.title
    document.querySelector('.image').style.backgroundImage = 'url(datavase/SB' + index + '.jpg)'
    updateInfoPanel(index)
    updateDatavaseSelected(index)
}

function updateInfoPanel(index) {
    var entry = datavase[index]
    var html = [
        '<u>Song</u>',
        entry.song.title,
        'performed by ' + entry.song.artist,
        'composed by ' + entry.song.composer,
        'produced by ' + entry.song.producer,
        '',
        '<u>Image</u>',
        entry.image.title,
        'by ' + entry.image.artist,
        'is ' + entry.image.medium,
        'from ' + entry.image.source,
        '',
        '<u>Text</u>',
        entry.text.title,
        'by ' + entry.text.author,
        'from ' + entry.text.source,
        '',
        ''
    ].join('<br />')
    var node = document.querySelector('.info-pane-display')
    node.innerHTML = html
}

function updateDatavaseSelected(index) {
    var li = document.getElementById('dv-' + index)
    document.querySelectorAll('.datavase-pane li').forEach(function(node) {
        node.classList.remove('selected')
    })
    li.classList.add('selected')
}

function updateMusic(index) {
    audio.pause()
    audio.currentTime = 0
    audio.src = 'datavase/SB' + index + '.mp3'
    audio.play()
}

function audioEnded() {
    index = index + 1
    if(index > len) {
        index = 1
    }
    startFlower(index)
}

function bindClickListeners() {
    document.querySelector('.dirt').addEventListener('click', togglePanel, false)
    document.querySelector('.info').addEventListener('click', togglePanel, false)
    document.querySelector('.datavase').addEventListener('click', togglePanel, false)
    document.querySelectorAll('.close').forEach(function (node) {
        node.addEventListener('click', closePanel, false)
    })
    document.querySelectorAll('.dv-a').forEach(function (node) {
        node.addEventListener('click', changeFlower, false)
    })
}

function togglePanel(e) {
    e.preventDefault()
    var anchor = e.currentTarget
    var panelName = anchor.dataset.panel
    var panel = document.querySelector('.' + panelName + '-pane')
    var opened = panel.classList.contains('selected')
    document.querySelectorAll('.pane').forEach(function (node) {
        node.classList.remove('selected')
    })
    if(!opened) { panel.classList.add('selected') }
}

function closePanel(e) {
    e.preventDefault()
    var anchor = e.currentTarget
    var panel = anchor.parentNode
    panel.classList.remove('selected')
}

function changeFlower(e) {
    e.preventDefault()
    var anchor = e.currentTarget
    var index = Number(anchor.dataset.index)
    startFlower(index)
}

function writeDatavasePanel() {
    var html = ''
    for(var i = 1; i <= len; i++) {
        var entry = datavase[i]
        html += [
            '<li id="dv-' + i + '">',
                '<a class="dv-a" href="#" data-index="' + i + '">',
                    entry.title,
                '</a>',
            '</li>',
        ].join('')
    }
    var ul = document.querySelector('.datavase-pane ul')
    ul.innerHTML = html
}

audio.addEventListener('ended', audioEnded)

document.addEventListener('DOMContentLoaded', function() {
    writeDatavasePanel()
    index = chooseNumber()
    startFlower(index)
    bindClickListeners()
})
