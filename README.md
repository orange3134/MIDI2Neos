# MIDI2Neos
MIDI入力をWebSocketに変換してNeos VRに渡すツール。

# インストール
1. [最新のリリース](https://github.com/orange3134/MIDI2Neos/releases/)をダウンロードして解答。
2. Neos VRでOrange Garageワールドに行き、Orange Shareのパブリックフォルダーを入手する。

# 使い方
## 接続
1. MIDIデバイスをPCに接続する。
2. MIDI2Neos.exeを実行する。（ファイアウォールの確認が出た場合は許可する）
3. 画面にMIDIデバイスのポート番号一覧が表示されるので、使用したいデバイスの番号を入力する。
4. Neos VRでOrange Share/MIDI2NeosからM2N-Connectを取り出し、大きいPulseを押す。（ホストアクセスの確認が出た場合は許可する）
5. MIDI2Neosの画面にconnectedと出ていれば接続されている。MIDI信号を入力するとログが流れる。

## LogiXでMIDI入力を取得する
1. Orange Share/MIDI2NeosからNoteLatchを取り出しM2N-Connectの出力を上から順につなぐ。
2. NoteLatchのStringに取得したいMIDI信号の番号を入力する。
3. MIDI信号を入力すると各種情報が出力される。
