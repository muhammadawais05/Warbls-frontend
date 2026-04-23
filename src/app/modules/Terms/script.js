export const formScript = [
  {
    name: "track_name",
    type: "text",
    placeholder: "Filename",
    label: ""
  }
]

export const initValues = {
  bpm: "",
  genre: "",
  is_oneshot: 0,
  is_phrases: 1,
  is_dry: 1,
  is_wet: 0,
  key: "",
  language: "",
  track_name: "",
  id: "",
  track: null,
  image: null,
  track_url: "",
  image_url: ""
} 
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
for (let i = 0; i < 100; i++) {
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
  { label: "Trending", value: "", disabled: true },
  { label: "Popular", value: "Popular" },
  { label: "New", value: "New" },
  { label: "Random", value: "Random" }
]

// export const listText = [
//   { text: "Ancient and post-classical history" },
//   { text: "Main articles: Classical demography and Medieval demography" },
//   { text: "Ancient and post-classical history" },
//   { text: "Main articles: Classical demography and Medieval demography" },
//   { text: "You will only upload phrases" }
// ]
export const listText = [
  { text: "- Only upload your own vocals." },
  { text: "- Write the correct info for the uploads. " },
  { text: "- No empty gaps at the start or the end." },
  { text: "- Must be high quality with the right volume." },
  { text: "- Vocal files must be inn 16 or 24 bit .waw file." },
  { text: "- You will only upload vocal phrases or one-shots. " },
  { text: "- No background sound, like piano and guitar. Only Vocal" }
]
