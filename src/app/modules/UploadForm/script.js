export const formScript = [
  // {
  //   name: "previous_work",
  //   type: "textarea",
  //   placeholder: "",
  //   label: "Previous Work"
  // },
  // { name: "sm_link", type: "textarea", placeholder: "", label: "Social media link" },
  // {
  //   name: "genre",
  //   type: "textarea",
  //   placeholder: "",
  //   label: "Which genres do you enjoy the most?"
  // },
  // { name: "vocals", type: "textarea", placeholder: "", label: "How do you record your vocals?" },
  // {
  //   name: "platform_link",
  //   type: "textarea",
  //   placeholder: "",
  //   label: "Do you currently sell vocals on other platform? \n If so, please provide us a link:"
  // }
  {
    name: "vocals",
    type: "textarea",
    placeholder: "",
    label: "Tell ous about your music experience"
  },
  {
    name: "previous_work",
    type: "textarea",
    placeholder: "",
    label: "Provide links to some of your work"
  },
  {
    name: "platform_link",
    type: "textarea",
    placeholder: "",
    label: "Do you sell vocals on other platforms? If yes, provide us a link:"
  }
]

export let initValues = {
  previous_work: "",
  sm_link: "",
  genre: "",
  vocals: "",
  platform_link: ""
}
