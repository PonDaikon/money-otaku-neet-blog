# 記事管理システム使用ガイド

## 概要

このブログは記事の自動反映システムを搭載しています。新しい記事を追加すると、自動的にトップページに表示されます。

## 記事追加の手順

### 1. 記事HTMLファイルの作成

1. `articles/article-template.html` をコピーして新しいファイル名にリネーム
   ```bash
   cp articles/article-template.html articles/新記事名.html
   ```

2. 新しいHTMLファイルを編集：
   - `<title>` タグの内容を変更
   - `<meta name="description">` の内容を変更
   - 記事のタイトル、カテゴリ、日付、読了時間を更新
   - 記事本文を作成

### 2. articles.jsonファイルの更新

`articles.json` ファイルに新しい記事の情報を追加します：

```json
{
  "articles": [
    // 既存の記事...
    {
      "id": "新記事のID",
      "title": "記事のタイトル",
      "description": "記事の説明文",
      "date": "2025-10-07",
      "category": "mamoru", // mamoru, huyasu, kasegu のいずれか
      "categoryName": "守る", // 守る, 増やす, 稼ぐ のいずれか
      "filename": "新記事名.html",
      "readTime": "○分で読める"
    }
  ]
}
```

### 3. 自動反映の確認

ブラウザでトップページを開くと、新しい記事が自動的に該当カテゴリに表示されます。

## カテゴリについて

- **mamoru（守る）**: ポイ活、節約、節税関連の記事
- **huyasu（増やす）**: 投資、資産運用関連の記事
- **kasegu（稼ぐ）**: 副業、SNS運用関連の記事

## 記事テンプレートの使用方法

### 基本構造

```html
<section class="content-section">
    <h2>見出し2</h2>
    <p>本文をここに記載します。</p>
</section>
```

### 利用可能なスタイル要素

#### 情報ボックス
```html
<div class="info-box">
    <h3>重要なポイント</h3>
    <p>重要な情報をここに記載</p>
</div>
```

#### 警告ボックス
```html
<div class="info-box warning">
    <h3>注意事項</h3>
    <p>注意すべき情報をここに記載</p>
</div>
```

#### ハイライトボックス
```html
<div class="highlight-box">
    <h4>注目すべき情報</h4>
    <p>特に注目してもらいたい情報</p>
</div>
```

#### ステップボックス
```html
<div class="step-box">
    <div class="step-number">1</div>
    <div class="step-content">
        <h3>ステップ1のタイトル</h3>
        <p>ステップの詳細説明</p>
    </div>
</div>
```

#### CTAボタン
```html
<div class="cta-button">
    <a href="リンクURL" class="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-external-link-alt"></i>
        ボタンのテキスト
    </a>
    <p class="cta-note">※補足説明</p>
</div>
```

#### 比較表
```html
<div class="comparison-table">
    <table>
        <thead>
            <tr>
                <th>項目</th>
                <th>選択肢A</th>
                <th>選択肢B</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>特徴1</strong></td>
                <td>Aの特徴1</td>
                <td>Bの特徴1</td>
            </tr>
        </tbody>
    </table>
</div>
```

## トラブルシューティング

### 記事が表示されない場合

1. `articles.json` の JSON 形式が正しいか確認
2. ファイル名が `articles.json` の `filename` と一致しているか確認
3. ブラウザの開発者ツールでエラーがないか確認

### 記事の順序を変更したい場合

`articles.json` 内の記事の順序を変更すると、表示順序も変わります。

## 既存記事の編集

既存の記事を編集する場合は、HTMLファイルを直接編集するだけで反映されます。`articles.json` の更新は不要です。

## バックアップ

記事を追加・編集する前に、以下のファイルのバックアップを取ることをお勧めします：
- `articles.json`
- 編集対象の記事HTMLファイル
