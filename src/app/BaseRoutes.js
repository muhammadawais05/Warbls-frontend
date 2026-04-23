import * as React from "react"
import { Vocals } from "./modules/Vocals"
import { Downloads } from "./modules/Downloads"
import { Likes } from "./modules/Likes"
import { UploadForm } from "./modules/UploadForm"
import { TermsAddStepper } from "./modules/Terms"
import { TrackUploadSuccess } from "./modules/Terms/success"
import { Profile } from "./modules/Profile"
import { Dashboard } from "./modules/Dashboard"
import { Analytics } from "./modules/Analytics"
import { ViewCart } from "./modules/Cart"
import { UsersArtists } from "./modules/UserAndArtists"
import { Files } from "./modules/Files"
import { Orders } from "./modules/Order/index"
import { MyVocals } from "./modules/MyVocals"
import { ArtistPublicProfile } from "./modules/Artist/PublicProfile"
import { Artist } from "./modules/Artist"
import { Route, Redirect, Switch } from "react-router-dom"
import { ArtistFormTable } from "./modules/ArtistsFormTable"
import { ContactUs } from "./modules/ContactUs"
import { QA } from "./modules/QA"
import { ResetPassword } from "./modules/ResetPassword/index"

export const BaseRoutes = () => {
  return (
    <Switch>
      <Redirect exact to="/vocals" from="/" />
      <Route path="/vocals" component={Vocals} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/q&a" component={QA} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/likes" component={Likes} />
      <Route path="/upload-form/:message" exact component={UploadForm} />
      <Route path="/upload-form" component={UploadForm} />
      <Route path="/terms" component={TermsAddStepper} />
      <Route path="/upload-track/success" component={TrackUploadSuccess} />
      <Route path="/upload-track" component={TermsAddStepper} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/cart" component={ViewCart} />
      <Route path="/users" component={UsersArtists} />
      <Route path="/files" component={Files} />
      <Route path="/orders" component={Orders} />
      <Route path="/my-vocals" component={MyVocals} />
      <Route path="/artist/:id" component={ArtistPublicProfile} />
      <Route path="/artist" component={Artist} />
      <Route path="/artist-requests" component={ArtistFormTable} />
    </Switch>
  )
}
