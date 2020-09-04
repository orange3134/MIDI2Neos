const midi = require('midi');
const midiinput = new midi.Input();
const readline = require('readline');

// WebSocketのサーバの生成
let ws = require('ws')
var server = new ws.Server({port:5001});

// 接続時に呼ばれる
server.on('connection', ws => {
    console.log('connected');
    ws.on('open', () => {
        
    });

    midiinput.on('message', (deltaTime, message) => {
        // The message is an array of numbers corresponding to the MIDI bytes:
        //   [status, data1, data2]
        // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
        // information interpreting the messages.
        var json = `{"message":"` + message + '", "deltaTime":' + deltaTime + '}';
        var obj = JSON.parse(json);
        console.log(obj);
        server.clients.forEach(client => {
            client.send(json);
        });
    });

    // クライアントからのデータ受信時に呼ばれる
    ws.on('message', message => {
        console.log(message);
    });

    // 切断時に呼ばれる
    ws.on('close', () => {
        console.log('close');
    });
});

// MIDIポートの確認
var portCount = midiinput.getPortCount();
console.log('MIDIポート数:' + portCount);

// 各ポート名を表示
console.log('--------')
for ( var i = 0; i < portCount; i++ ){
    console.log( i + ': ' + midiinput.getPortName(i));
}
console.log('--------')


const selectPort = async () => {
    for (;;) {
        const answer = await prompt('使用するMIDIポートの番号を入力し、Enterを押してください');
        var input = answer - 0;

        if (Number.isInteger(input) & input < portCount) {
            // 入力されたポートを開く
            midiinput.openPort(input);
            console.log(input + '番のポートを開きました')
            break;
        } else if (Number.isInteger(input)) {
            console.log('その番号のポートはありません');
        } else {
            console.log('整数を指定してください');
        }
    }
};
  

// ユーザーに値を入力させる

const prompt = async (msg) => {
    console.log(msg);
    const answer = await question('> ');
    return answer.trim();
};


   // 標準入力を取得する

const question = (question) => {
    const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise((resolve) => {
      readlineInterface.question(question, (answer) => {
        resolve(answer);
        readlineInterface.close();
      });
    });
};
  
  // 起動
(async () => {
    await selectPort();
})();