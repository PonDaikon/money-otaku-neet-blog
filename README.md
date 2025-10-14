# ページURL

https://pondaikon.github.io/money-otaku-neet-blog/index.html

# マネオタニートの金融オタロード

前職の貯蓄を切り崩しながら、家族4人での生活を支えつつ、賢い資産運用を探究する金融実践ブログ

## 概要

「マネオタニートの金融オタロード」は、節約・投資・副業の3つの柱で資産形成を目指すブログです。実際の体験に基づいた実践的な情報を提供し、同じような境遇の方々の参考になることを目指しています。

## 特徴

### コンテンツカテゴリ
- **守る**: ポイ活・節約・固定費削減で支出を最適化
- **殖やす**: インデックス投資・新NISAで資産を増やす
- **稼ぐ**: 副業・SNS運用で収入源を多様化

### 技術的特徴
- **レスポンシブデザイン**: デスクトップ・タブレット・モバイル完全対応
- **動的記事管理**: JSON形式での記事データ管理
- **関連記事機能**: カテゴリ別の関連記事自動表示
- **SEO最適化**: 検索エンジン対応の構造化HTML

## ⚠️ 重要：セットアップ方法

このブログシステムは、**HTTPサーバー経由でのアクセスが必要**です。ファイルを直接ブラウザで開く（file://プロトコル）と、記事が正しく表示されません。


## ファイル構成

```
money-otaku-neet-blog/
├── index.html                    # ホームページ
├── styles.css                    # メインスタイルシート
├── articles.json                 # 記事データベース
├── home-articles-loader.js       # ホームページ記事読み込み機能
├── related-articles-loader.js    # 関連記事表示機能
├── articles/                     # 記事ディレクトリ
│   ├── point-ecosystem-comparison.html
│   ├── poi-katsu-roadmap.html
│   ├── fixed-cost-reduction-guide.html
│   ├── nisa-rakuten-guide.html
│   └── side-hustle-guide.html
└── categories/                   # カテゴリページ
    ├── mamoru.html               # 守るカテゴリ
    ├── huyasu.html               # 殖やすカテゴリ
    └── kasegu.html               # 稼ぐカテゴリ
```

## 使用技術

- **HTML5**: セマンティックなマークアップ
- **CSS3**: Grid・Flexboxを活用したレスポンシブデザイン
- **JavaScript**: Vanilla JSによる動的コンテンツ管理
- **Font Awesome**: アイコンライブラリ
- **Google Fonts**: Webフォント

## 記事の追加方法

### 1. HTMLファイルの作成
`articles/` ディレクトリに新しい記事のHTMLファイルを作成

### 2. articles.jsonの更新
```json
{
  "id": "記事ID",
  "title": "記事タイトル",
  "description": "記事の説明",
  "date": "YYYY-MM-DD",
  "category": "mamoru|huyasu|kasegu",
  "categoryName": "守る|殖やす|稼ぐ",
  "filename": "記事ファイル名.html",
  "readTime": "読了時間"
}
```

### 3. 関連記事の自動表示
同一カテゴリの記事が自動的に関連記事として表示されます

## トラブルシューティング

### 記事が表示されない場合
1. **HTTPサーバー経由でアクセスしているか確認**
   - file:// ではなく http:// でアクセス
2. **ブラウザのコンソールでエラーを確認**
   - F12キーでデベロッパーツールを開く
3. **articles.jsonの形式が正しいか確認**
   - JSONの構文エラーがないかチェック

### CORSエラーが発生する場合
- ファイルを直接開いている可能性があります
- 必ずHTTPサーバー経由でアクセスしてください

## ライセンス

このプロジェクトは個人ブログとして作成されています。コンテンツの無断転載はご遠慮ください。

## お問い合わせ

- **メール**: [money.otaku.neet@gmail.com]
- **Twitter**: [https://x.com/money_ota_neet]
- **お問い合わせフォーム**: [https://docs.google.com/forms/d/e/1FAIpQLSe4Gno0b2Ev3ZQ3mJeM2_YSAeTKORvzsqMxawwUZeuYgOzE7Q/viewform?usp=dialog]

---

© 2025 マネオタニートの金融オタロード. All rights reserved.

免責事項: このブログの内容は個人の体験に基づくものです。投資判断は自己責任でお願いします。
