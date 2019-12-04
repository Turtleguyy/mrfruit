import Route from '@ember/routing/route'
import RSVP from 'rsvp'
import fetch from 'fetch'

export default Route.extend({
  model() {

    // twitch
    const client    = '69l6o7bwqkhjudkhdu8fl76vo1hz5d'
    // const twitchURL = 'https://api.twitch.tv/helix/users?login=mymisterfruit'
    const twitchURL = 'https://api.twitch.tv/helix/users/follows?to_id=56001630'

    // youtube
    const base = 'https://www.googleapis.com/youtube/v3/channels'
    const part = 'statistics'
    const id   = 'UCV96ER3MAI1S81HH6l9wwbQ'
    const key  = 'AIzaSyBgk2voVT9-rQJRwTqB3JZ6-y5pK67eL3s'
    const youtubeURL = `${base}?part=${part}&id=${id}&key=${key}`

    return RSVP.hash({
      twitch: fetch(twitchURL, { headers: { 'Client-ID': `${client}` }})
      .then(response => response.json())
      .then(data => data.total),

      youtube: fetch(youtubeURL)
        .then(response => response.json())
        .then(data => {
          if (data.items && data.items.length) {
            return data.items[0].statistics.subscriberCount
          }
        })
    })
  }
})
