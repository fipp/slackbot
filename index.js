const SlackBot = require('slackbots');

const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: 'fipp'
})

const compliments = [
  'You are fantastic!',
  'You are awesome!',
  'Your smile is contagious!',
  'You are an inspiration!'
];

bot.on('start', () => {
  bot.postMessageToChannel('general', 'Hello!');
  bot.postMessageToUser('terje.andersen', 'I am online!');
})

let currentCompliment = 0;

bot.on('message', function(data) {

  const pattern = /[Cc]ompliment <@(\w+)>/
  if (data.text && data.text.match(pattern)) {
    const user = data.text.match(pattern)[1];
    if (user) {
      bot.getUserById(user).then(({ name }) => {
        bot.postMessageToUser(name, compliments[currentCompliment]);
        currentCompliment = (currentCompliment + 1) % compliments.length;
      });
    }
  }

  if (data.text === 'ping') {
    bot.postMessage(data.channel, 'pong');
  }
})