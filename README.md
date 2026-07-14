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

## SEO 構成(2026-07-14 改修)

- `sitemap.xml` / `robots.txt` を追加。**canonical・og:url・sitemap の3つは必ず同じドメインを指すこと**(現状は `dreaminheadspa.com.au`)。ドメインが変わる場合は3箇所同時に変更する。
- 全ページ `lang="en-AU"` + `og:locale=en_AU`。
- 構造化データ: `HairSalon`(index / makesOffer 全メニュー + ReserveAction + founder)、`Blog`(blog.html)、`BlogPosting`(各記事 / 著者 = Takashi Iwata)。
  **`aggregateRating` は意図的に入れていない** — 5.0/140件は Google レビュー(第三者集計)であり、自社 schema でのマークアップは Google のリッチリザルト規約違反。手動対策のリスクがあるため `sameAs` で GBP と紐づける形にしている。自社サイトで一次レビューを集め始めたら追加可。
- **The Maths(価格正当化ブロック)**: `index.html` / `menu.html` の `#value`。自社メニューの数字のみで $220 を正当化する。**メニュー価格を変えたらここも必ず同期すること**。
- Journal: 7記事。`blog-head-spa-cost-gold-coast`(価格) と `blog-fathers-day-gift-gold-coast`(9/6 父の日) が集客の主力。

## 残タスク(TODO)

**公開前ブロッカー**
- **レビュー**: `index.html` の Voice セクションは今も *paraphrase*(実文言ではない)。Google ビジネスプロフィールから実際の文言と名前に差し替える。現状の「Paraphrased from a Google review」というキャプションは信頼を損なうだけなので最優先。
- **ギフト券画像**: `assets/GiftVoucher-01.png` に **"GIFT CERTIFICATE"(米語)** が焼き込まれている。豪州向けには **"GIFT VOUCHER"** に作り直す(HTML 側の文言は全て voucher に統一済み)。
- **ドメイン確定**: canonical が実際に配信されているドメインと一致しないと一切インデックスされない。

**コンテンツ**
- **画像**: `.img-placeholder` を実写真に置換。`aria-label` が alt の下書きになっている。
- **駐車場 / キャンセルポリシー**: 「Placeholder」表記は消したが、内容自体はオーナー確認が必要(`contact.html` の Parking、`menu.html` の Bookings & cancellations)。
- **OGP画像**: `assets/og-image.jpg`(1200x630)を用意。
- **お問い合わせフォーム**: `#enquiryForm` に `data-endpoint` を設定すると送信が有効になる(未設定時は送信せず電話案内を出す)。
- **営業時間**: 火〜土 9:00–18:00 は、狙っている富裕層(医師・弁護士等)が最も予約しづらい時間帯。早朝/土曜枠の検討価値あり。
- **Men $85 / Ladies $140**: 性別ベースの価格設定は豪州では反発を招きやすい。Short / Long ベースへの変更を検討。
