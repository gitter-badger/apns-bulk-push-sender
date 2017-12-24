import apn from 'apn'

import express from 'express'

const router = express.Router()

/* GET index page. */
router.get('/', (req, res) => {
  res.json({ message: 'Method not allowed' })
})
router.post('/', (req, res) => {
  console.log(req.body)
  const options = {
    token: {
      key: 'setrowMobile-Push.p8',
      keyId: 'QWECU5MZ66',
      teamId: 'G5W573J836'
    },
    production: false
  }
  const apnProvider = new apn.Provider(options)
  const deviceToken = req.body.token
  const deviceName = req.body.device_name
  const deviceUUID = req.body.uuid

  const note = new apn.Notification()

  note.expiry = Math.floor(Date.now() / 1000) + 3600 // Expires 1 hour from now.
  note.badge = 0
  note.sound = 'ping.aiff'
  note.alert = `Yeni Ziyaretçi IP : ${deviceName}`
  note.payload = { token: deviceToken, uuid: deviceUUID }
  note.topic = 'com.setrow.setrowNotificationApp'

  apnProvider.send(note, deviceToken).then((result) => {
    if (result.failed.length === 0) {
      res.json({ sent: true })
    }
  })
})

export default router
