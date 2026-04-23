export const languages = [
  { label: "Language", value: "", disabled: true },
  { label: "English", value: "english" },
  { label: "French", value: "french" },
  { label: "Spanish", value: "spanish" },
  { label: "Italian", value: "italian" },
  { label: "Japanese", value: "japanese" },
  { label: "Norwegian", value: "norwegian" },
  { label: "Swedish", value: "swedish" },
  { label: "German", value: "german" },
  { label: "Russian", value: "russian" },
  { label: "Portuguese", value: "portuguese" },
  { label: " Turkish", value: "turkish" },
  { label: " Other", value: "other" }
]

export const bpm = [{ label: "BPM", value: "", disabled: true }]
for (let i = 49; i < 200; i++) {
  bpm.push({ label: (i + 1).toString(), value: (i + 1).toString() })
}

export const key = [
  { label: "Key", value: "", disabled: true },
  { label: "Any key", value: "Any key" },
  { label: "A", value: "A" },
  { label: "Am", value: "Am" },
  { label: "A#", value: "A#" },
  { label: "A#m", value: "A#m" },
  { label: "B", value: "B" },
  { label: "Bm", value: "Bm" },
  { label: "C", value: "C" },
  { label: "Cm", value: "Cm" },
  { label: "C#", value: "C#" },
  { label: "C#m", value: "C#m" },
  { label: "D", value: "D" },
  { label: "Dm", value: "Dm" },
  { label: "D#", value: "D#" },
  { label: "D#m", value: "D#m" },
  { label: "E", value: "E" },
  { label: "Em", value: "Em" },
  { label: "F", value: "F" },
  { label: "Fm", value: "Fm" },
  { label: "F#", value: "F#" },
  { label: "G", value: "G" },
  { label: "Gm", value: "Gm" },
  { label: "G#", value: "G#" },
  { label: "G#m", value: "G#m" }
]
export const genres = [
  { label: "Genres", value: "", disabled: true },
  { label: "EDM", value: "EDM" },
  { label: "House", value: "House" },
  { label: "UK Rap", value: "UK Rap" },
  { label: "Rock", value: "Rock" },
  { label: "Pop", value: "Pop" },
  { label: "Opera", value: "Opera" },
  { label: "Classical", value: "Classical" },
  { label: "Gospel", value: "Gospel" },
  { label: "Blues and Jazz", value: "Blues and Jazz" },
  { label: "R&B", value: "R&B" },
  { label: "Hip Hop", value: "Hip Hop" },
  { label: "Rap", value: "Rap" },
  { label: "Trap", value: "Trap" },
  { label: "Metal", value: "Metal" },
  { label: "Other", value: " other" }
]

export const popular = [
  { label: "Random", value: "Random" },
  { label: "Trending", value: "Trending" },
  { label: "Popular", value: "Popular" }
]

export const filterInitialValues = {
  isPhrase: "",
  isOneShot: "",
  isWet: "",
  isDry: "",
  gener: "",
  key: "",
  bpm: "",
  language: "",
  trending: "",
  searchKey: ""
}
