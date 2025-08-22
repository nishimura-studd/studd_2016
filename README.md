# studd. | スタッド.

個人制作 - WebGL と 3D グラフィックスによるポートフォリオサイト（2016年版）

## 概要

このプロジェクトは、WebGL 技術と Three.js を使用したインタラクティブなポートフォリオサイトです。WebGL を背景装飾ではなくコンテンツそのものとして前面に配置したデザインレイアウトが特徴で、3D キューブで構成されたプロジェクトギャラリーと、滑らかな WebGL アニメーションによる視覚的表現を実現しています。

## 主要機能

### 3Dプロジェクトギャラリー
- WebGL による 3D キューブレイアウト
- インタラクティブな作品ナビゲーション
- プロジェクト詳細のオーバーレイ表示
- CreateJS によるスムーズなアニメーション

### モーションエフェクト
- Three.js ベースの 3D アニメーション
- Tween によるイージングと Transition
- レスポンシブデザインによる最適化表示

### プロジェクト管理
- JSON データベースによる作品情報管理
- 動的なコンテンツローディング
- RequireJS モジュールシステム

## 技術スタック

- **WebGL**: Three.js (r74)
- **アニメーション**: CreateJS, Tween.js
- **フロントエンド**: HTML5, CSS3, JavaScript (ES5)
- **モジュール管理**: RequireJS
- **ユーティリティ**: jQuery, Underscore.js, moment.js
- **ビルドツール**: Grunt

## セットアップ

### 必要環境
- Node.js
- WebGL対応ブラウザ（Chrome, Firefox, Safari推奨）

### インストール
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
python3 -m http.server 8000
```

### アクセス
ブラウザで `http://localhost:8000` にアクセス

## ファイル構成

```
src/
├── index.html              # メインHTMLファイル
├── assets/
│   ├── css/
│   │   ├── reset.css       # CSSリセット
│   │   └── style.css       # メインスタイル
│   ├── js/
│   │   ├── index.js        # エントリーポイント
│   │   ├── common.js       # 共通設定・RequireJS 設定
│   │   ├── top/            # トップページ制御
│   │   │   ├── TopPage.js  # メインコントローラ
│   │   │   ├── Box.js      # 3D ボックス要素
│   │   │   └── state/      # アニメーション状態管理
│   │   └── libs/           # 外部ライブラリ
│   ├── img/               # プロジェクト画像
│   ├── json/
│   │   └── works.json     # 作品データ
│   └── sound/
│       └── tone.mp3       # サウンドエフェクト
├── package.json           # Node.js 依存関係
└── Gruntfile.js          # ビルド設定
```

## プロジェクトデータ

作品情報は `assets/json/works.json` で管理されており、以下の情報を含みます：
- プロジェクトタイトル
- 制作年
- 使用技術
- プロジェクトURL
- 画像データ

## 動作要件

- WebGL 対応ブラウザ
- JavaScript 有効化
- モダンブラウザ（IE11以降推奨）

## アーカイブ
以下から参照できます：  
[https://studd.jp/__archive/studd_2016/](https://studd.jp/__archive/studd_2016/)

## ライセンス

MIT License  
（使用ライブラリもすべて MIT 互換ライセンス）