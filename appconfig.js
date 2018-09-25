let cfg = {
    name: 'Mellon',
    links: {
        self: 'https://api.familjenosterlund.se/mellon-dev/app.json'
    },
    key: "mellon.familjenosterlund.se",
    description: "Speak friend and enter",
    capabilities: {
        hipchatApiConsumer: {
            scopes: [
                'send_notification',
                'send_message'
            ],
            fromName: "Arne"
        },
        installable: {
            allowGlobal: false,
            allowRoom: true,
            callbackUrl: 'https://api.familjenosterlund.se/mellon-dev/register'
        },
        webhook: [
            {
              url: 'https://api.familjenosterlund.se/mellon-dev/messages',
              pattern: '^/mellon',
              event: 'room_message',
              authentication: 'jwt',
              name: 'Yoyo'
            }
          ]
    }
}

module.exports = cfg