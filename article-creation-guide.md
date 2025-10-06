# 記事作成ガイド

このガイドでは、「マネオタニートの金融オタロード」ブログで新しい記事を作成する方法を説明します。

## 1. 記事作成の基本手順

### ステップ1: テンプレートをコピー
`articles/article-template.html` をコピーして、新しいファイル名で保存します。
例: `articles/new-article.html`

### ステップ2: 基本情報を更新
以下の部分を記事に合わせて変更します：

```html
<!-- タイトルタグ -->
<title>【記事タイトル】 | マネオタニートの金融オタロード</title>

<!-- メタディスクリプション -->
<meta name="description" content="記事の概要説明をここに記載します。">

<!-- パンくずリスト -->
<a href="index.html#mamoru">カテゴリ名</a> <!-- 守る/増やす/稼ぐ -->

<!-- 記事タイトル -->
<h1 class="article-title">【記事タイトル】</h1>

<!-- 公開日 -->
<span>2025年10月06日</span>

<!-- カテゴリ -->
<span>カテゴリ名</span> <!-- 守る/増やす/稼ぐ -->

<!-- 読了時間 -->
<span>○分で読める</span>

<!-- 記事概要 -->
<p class="article-excerpt">記事の概要説明をここに記載します。</p>
```

### ステップ3: 記事本文を作成
`<div class="main-content">` 内の記事本文部分を書き換えます。

### ステップ4: トップページにリンクを追加
`index.html` の該当カテゴリ内に新しい記事へのリンクを追加します。
リンクは `articles/記事ファイル名.html` の形式で記載してください。

## 2. 使用可能なスタイル要素

### 基本的な見出しと段落
```html
<section class="content-section">
    <h2>見出し2</h2>
    <h3>見出し3</h3>
    <h4>見出し4</h4>
    <p>段落テキスト</p>
</section>
```

### 情報ボックス（重要な情報の強調）
```html
<div class="info-box">
    <h3>重要なポイント</h3>
    <ol>
        <li>ポイント1</li>
        <li>ポイント2</li>
    </ol>
</div>
```

### ハイライトボックス（注目情報）
```html
<div class="highlight-box">
    <h4>注目すべき情報</h4>
    <p>特に注目してもらいたい情報</p>
</div>
```

### 比較表
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

### ステップ形式の説明
```html
<div class="step-box">
    <div class="step-number">1</div>
    <div class="step-content">
        <h3>ステップ1のタイトル</h3>
        <p>ステップの詳細説明</p>
    </div>
</div>
```

### CTAボタン
```html
<div class="cta-button">
    <a href="#" class="btn btn-primary btn-large">
        <i class="fas fa-external-link-alt"></i>
        ボタンテキスト
    </a>
    <p class="cta-note">※補足説明</p>
</div>
```

### 最終CTA（記事末尾用）
```html
<div class="final-cta">
    <div class="cta-button">
        <a href="#" class="btn btn-primary btn-large">
            <i class="fas fa-rocket"></i>
            最終的なCTAボタン
        </a>
        <p class="cta-note">※最終的な行動を促すメッセージ</p>
    </div>
</div>
```

## 3. カテゴリ別の記事作成のコツ

### 「守る」カテゴリ
- ポイ活、節約、節税に関する記事
- 実践的な手順やコツを重視
- 比較表やステップ形式を活用
- CTAは登録や申し込みへの誘導

### 「増やす」カテゴリ
- 投資、資産運用に関する記事
- データや根拠を示す表を活用
- リスクについても言及
- 免責事項を忘れずに

### 「稼ぐ」カテゴリ
- 副業、収入源に関する記事
- 具体的な手順や体験談を重視
- 現実的な期待値を示す
- 継続の重要性を強調

## 4. SEO対策のポイント

- タイトルには【】を使って目を引く
- メタディスクリプションは120文字程度で魅力的に
- 見出しタグ（h2, h3）を適切に使用
- 内部リンクを積極的に設置
- 画像にはalt属性を設定

## 5. 記事公開後の作業

1. `index.html` の該当カテゴリに記事リンクを追加
2. 関連記事のサイドバーを更新
3. SNSでの告知準備
4. 必要に応じて他の記事からの内部リンクを追加

このガイドを参考に、読者にとって価値のある記事を作成してください！
