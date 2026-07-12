# Dreamin' Head Spa & Sculpture — Website

高級ヘッドスパサロン(Gold Coast / Southport)のWebサイト。
静的 HTML / CSS / Vanilla JS のみ。ビルド不要。

## ファイル構成

```
index.html    … トップ(1ページLP・ヒーローは3枚スライドショー)
about.html    … About(ブランドストーリー / 職人 / プロミス)
menu.html     … Service Menu(全メニュー + ギフトカード + ポリシー)
contact.html  … Contact(住所・電話・営業時間・マップ枠)
privacy.html  … Privacy Policy(プレースホルダー法務文 — 公開前に要確認)
style.css     … スタイル(モバイルファースト・全ページ共通)
script.js     … ヘッダー / モバイルナビ / フェードイン / ヒーロースライドショー
assets/       … ロゴ + ヒーロー画像(hero-1.jpg / hero-2.jpg / hero-3.jpg)
```

## ヒーロースライドショー

`index.html` のファーストビューは `assets/hero-1.jpg`〜`hero-3.jpg` の3枚を
6秒ごとにクロスフェード(+ゆっくりズーム)で切り替えます。
画像を差し替える場合は同名のファイルを置き換えるだけでOK。

## Vercel デプロイ手順

1. このリポジトリを GitHub に push(済)
2. [vercel.com](https://vercel.com) → **Add New → Project** → リポジトリを選択
3. Framework Preset は **Other**、Build Command / Output Directory は **空欄のまま**(静的サイトとしてそのまま配信されます)
4. **Deploy** をクリック。以降は `main` への push で自動デプロイ

独自ドメインは Vercel の **Settings → Domains** から追加。

## 残タスク(TODO)

- **画像**: `.img-placeholder` の要素(施術写真・ステップ写真・Instagramグリッド等)を実画像の `<img>` に置換。`aria-label` に想定画像の説明あり(= alt テキストの下書き)
- **「Watch & learn more」ポップアップ**: Dry / Wet ヘッドスパ紹介の動画ポップアップは未実装(一旦保留)
- **Google マップ**: `contact.html` / `index.html` の `.contact-map` を Google Maps「共有 → 地図を埋め込む」の iframe に置換
- **OGP画像**: `assets/og-image.jpg`(1200x630)を用意して差し替え
- **レビュー**: Voice セクションのプレースホルダー文を実際の Google レビューに置換
- **プライバシーポリシー / キャンセルポリシー / 駐車場情報**: 公開前に実内容へ差し替え
