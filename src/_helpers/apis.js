let baseUrl
const hostname = window && window.location && window.location.hostname

if (hostname === "localhost") {
  // baseUrl = "http://localhost:3000/"
  baseUrl = "https://api.warbls.com/"
} else {
  baseUrl = "https://api.warbls.com/"
}

export const APIs = {
  // oauth apis
  getAuthToken: baseUrl + "oauth/authorize",
  getAuthCode: baseUrl + "oauth/token",

  // auth apis
  signup: baseUrl + "users",
  signin: baseUrl + "auth/login",
  users: baseUrl + "users",
  forgotPassword: baseUrl + "users/forgetPassword",
  updateUser: baseUrl + "users/",
  types: baseUrl + "users/types",
  reports: baseUrl + "users/reports",

  // track apis
  uploadTrack: baseUrl + "s3/upload",
  tracks: baseUrl + "tracks",
  addTrack: baseUrl + "tracks/",
  download: baseUrl + "s3/download-link",
  trackActions: baseUrl + "stats/track-wise",
  popularArtist: baseUrl + "stats/popular-artists",
  popularTracks: baseUrl + "stats/popular-tracks",
  trendingTracks: baseUrl + "stats/trending-tracks",

  myVocals: baseUrl + "tracks/my-track/",

  // artist api
  artist: baseUrl + "artist-forms",

  // promo code
  promoCode: baseUrl + "promo-codes",

  //Checkout
  checkout: baseUrl + "payment/stripe",

  //Orders
  order: baseUrl + "orders",

  // Generate onboarding link
  onboarding: baseUrl + "payment/onboarding/",
  withdraw: baseUrl + "payment/createtransfer/"
}
