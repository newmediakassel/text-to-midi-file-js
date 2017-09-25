const fs = require('fs')
const Midi = require('jsmidgen')

// ------------

const sourceName = 'source.txt'
const midiName = 'midi.mid'

const map = {
    'a': [65, 63, 60],
    'b': [1, 2, 3],
    '.': [64, 56, 34, 23, 4, 2]
}
const mapKeys = Object.keys(map)

// midi settings
const noteLength = 64

// ------------

const source = fs.readFileSync(sourceName, 'utf8')

const file = new Midi.File()
const track = new Midi.Track()

file.addTrack(track)

for (let i = 0; i < source.length; i++) {
    const char = source.charAt(i)

    if (char === ' ') {
        // add a note 0 on channel 0 with noteLength and velocity 0
        track.addNote(0, 0, noteLength, 0, 0)
        continue
    }

    // if not in the key list continue with next character
    if (!mapKeys.includes(char)) {
        continue
    }

    // get the notes for the current character
    const notes = map[char]

    // write the chord to the midi track
    track.addChord(0, notes, noteLength)
}

fs.writeFileSync(midiName, file.toBytes(), 'binary')
