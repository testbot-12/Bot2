const API = global.config.ApiUrl;

module.exports.config = {
  name: 'meta2',
  version: '1.0.2',
  hasPermssion: 0,
  credits: 'SI TANVIR 6X',
  description: 'Talk to the most lost Meta',
  commandCategory: 'General',
  usages: '[question]/[on,off]',
  cooldowns: 5,
}
const axios = require('axios')
module.exports.onLoad = function () {
  const { writeFileSync: _0x127a64, existsSync: _0x330889 } =
      global.nodemodule['fs-extra'],
    { resolve: _0x56cb17 } = global.nodemodule.path,
    _0x233f90 = require(process.cwd() + '/utils/log'),
    _0x32a586 = _0x56cb17(__dirname, 'cache', 'sim.json')
  if (!_0x330889(_0x32a586)) {
    const _0x55699a = { sim: {} }
    _0x127a64(_0x32a586, JSON.stringify(_0x55699a, null, 4))
  } else {
    const _0x313a1a = require(_0x32a586)
    if (!_0x313a1a.hasOwnProperty('sim')) {
      _0x313a1a.sim = {}
    }
    _0x127a64(_0x32a586, JSON.stringify(_0x313a1a, null, 4))
  }
}
module.exports.handleEvent = async ({
  api: _0x345747,
  event: _0x59652a,
  args: _0x8b1c2c,
  Threads: _0x2654d0,
}) => {
  const { threadID: _0x34e548, messageID: _0x2db174 } = _0x59652a,
    { resolve: _0x61fee5 } = global.nodemodule.path,
    _0xf69761 = _0x61fee5(__dirname, '../commands', 'cache', 'sim.json'),
    { sim: _0x2c2d59 } = require(_0xf69761)
  _0x2c2d59.hasOwnProperty(_0x34e548) &&
    _0x2c2d59[_0x34e548] == true &&
    _0x59652a.senderID !== _0x345747.getCurrentUserID() &&
      axios
        .get(
          encodeURI(
            `${API}/sim?type=ask&ask=` +
              _0x59652a.body
          )
        )
        .then((_0x2853f7) => {
          if (
            _0x2853f7.data.answer == 'null' ||
            _0x2853f7.data.answer == "I don't understand what you say🤔"
          ) {
            _0x345747.sendMessage(
              "I doesn't understand, Please teach 😤",
              _0x34e548,
              _0x2db174
            )
          } else {
            return _0x345747.sendMessage(
              _0x2853f7.data.answer,
              _0x34e548,
              _0x2db174
            )
          }
        })
}
module.exports.run = async ({
  api: _0x558d7f,
  event: _0x4b8775,
  args: _0x5d1bb0,
  Threads: _0x1a9503,
}) => {
  const { writeFileSync: _0x31b567 } = global.nodemodule['fs-extra'],
    { resolve: _0x17624f } = global.nodemodule.path,
    _0x1356d7 = _0x17624f(__dirname, 'cache', 'sim.json'),
    { threadID: _0x48eb5b, messageID: _0x1387b2 } = _0x4b8775,
    _0x4cf3de = require(_0x1356d7),
    { sim: _0x579cb7 } = _0x4cf3de
  if (!_0x5d1bb0[0]) {
    _0x558d7f.sendMessage(
      '~ à¦¹à§‡ à¦¬à§à¦¯à¦¾à¦ªà§à¦¸ à¦¬à¦²à§‹ à¦—à§‹\uD83E\uDEE6',
      _0x48eb5b,
      _0x1387b2
    )
  } else {
    switch (_0x5d1bb0[0]) {
      case 'on': {
        _0x579cb7[_0x48eb5b] = true
        _0x558d7f.sendMessage(
          'Successfully enabled Meta.✅',
          _0x48eb5b,
          _0x1387b2
        )
        break
      }
      case 'off': {
        _0x579cb7[_0x48eb5b] = false
        _0x558d7f.sendMessage(
          'Meta has been successfully disabled!🔴',
          _0x48eb5b,
          _0x1387b2
        )
        break
      }
      default:
        axios
          .get(
            encodeURI(
              `${API}/sim?type=ask&ask=` +
                _0x5d1bb0.join(' ')
            )
          )
          .then((_0x1a3939) => {
            if (
              _0x1a3939.data.answer == 'null' ||
              _0x1a3939.data.answer == "I don't understand what you say🤔"
            ) {
              _0x558d7f.sendMessage(
                "I don't understand 😤",
                _0x48eb5b,
                _0x1387b2
              )
            } else {
              return _0x558d7f.sendMessage(
                _0x1a3939.data.answer,
                _0x48eb5b,
                _0x1387b2
              )
            }
          })
        break
    }
    _0x31b567(_0x1356d7, JSON.stringify(_0x4cf3de, null, 4))
  }
}
