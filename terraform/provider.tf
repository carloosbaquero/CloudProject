provider "google" {
  credentials = file("./.json")
  project = ""
  region = "europe-west6"
  version = "~> 2.5.0"
}