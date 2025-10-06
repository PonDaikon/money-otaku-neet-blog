// トップページ用記事読み込みシステム（各カテゴリの最新記事のみ表示）
class HomeArticleLoader {
    constructor() {
        this.articles = [];
        this.maxArticlesPerCategory = 3; // 各カテゴリの最大表示記事数
        this.init();
    }

    async init() {
        try {
            await this.loadArticles();
            this.renderArticles();
        } catch (error) {
            console.error('記事の読み込みに失敗しました:', error);
        }
    }

    async loadArticles() {
        try {
            const response = await fetch('articles.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.articles = data.articles || [];
        } catch (error) {
            console.error('articles.jsonの読み込みに失敗しました:', error);
            // フォールバック: 既存の記事を手動で定義
            this.articles = [
                {
                    id: "poi-katsu-roadmap",
                    title: "【入門】今日から始めるポイ活ロードマップ",
                    description: "主要なポイントサイトの比較と、効率的な貯め方のコツを紹介します。",
                    date: "2025-10-06",
                    category: "mamoru",
                    categoryName: "守る",
                    filename: "poi-katsu-roadmap.html",
                    readTime: "8分で読める"
                },
                {
                    id: "nisa-rakuten-guide",
                    title: "【新NISA完全ガイド】最速で始める楽天証券！",
                    description: "ポイ活でお得に口座開設する究極ロードマップ",
                    date: "2025-10-06",
                    category: "huyasu",
                    categoryName: "殖やす",
                    filename: "nisa-rakuten-guide.html",
                    readTime: "12分で読める"
                }
            ];
        }
    }

    renderArticles() {
        const categories = ['mamoru', 'huyasu', 'kasegu'];
        
        categories.forEach(category => {
            // 各カテゴリの最新記事を取得
            const categoryArticles = this.articles
                .filter(article => article.category === category)
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // 新しい順
                .slice(0, this.maxArticlesPerCategory); // 最大表示数まで

            const articleListElement = document.querySelector(`#${category} .article-list`);
            
            if (articleListElement) {
                if (categoryArticles.length > 0) {
                    // 記事カードを生成
                    articleListElement.innerHTML = '';
                    categoryArticles.forEach(article => {
                        const articleCard = this.createArticleCard(article);
                        articleListElement.appendChild(articleCard);
                    });

                    // 「もっと見る」ボタンを追加
                    const totalCategoryArticles = this.articles.filter(article => article.category === category).length;
                    if (totalCategoryArticles > this.maxArticlesPerCategory) {
                        const moreButton = this.createMoreButton(category);
                        articleListElement.appendChild(moreButton);
                    }
                } else {
                    // 記事がない場合のメッセージ
                    articleListElement.innerHTML = `
                        <div class="no-articles-message">
                            <p>このカテゴリの記事は準備中です</p>
                        </div>
                    `;
                }
            }
        });
    }

    createArticleCard(article) {
        const articleElement = document.createElement('article');
        articleElement.className = 'article-card';
        
        articleElement.innerHTML = `
            <a href="articles/${article.filename}">
                <div class="article-header">
                    <div class="article-date">${this.formatDate(article.date)}</div>
                    <div class="read-time">
                        <i class="fas fa-clock"></i>
                        <span>${article.readTime}</span>
                    </div>
                </div>
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <div class="article-footer">
                    <span class="read-more">
                        続きを読む
                        <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </a>
        `;
        
        return articleElement;
    }

    createMoreButton(category) {
        const moreElement = document.createElement('div');
        moreElement.className = 'more-articles';
        
        const categoryNames = {
            'mamoru': '守る',
            'huyasu': '殖やす',
            'kasegu': '稼ぐ'
        };
        
        moreElement.innerHTML = `
            <a href="categories/${category}.html" class="more-link">
                <span>${categoryNames[category]}の記事をもっと見る</span>
                <i class="fas fa-chevron-right"></i>
            </a>
        `;
        
        return moreElement;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // 新しい記事を追加するメソッド（管理用）
    addArticle(articleData) {
        this.articles.push(articleData);
        this.renderArticles();
        
        // articles.jsonを更新（実際の運用では手動で更新）
        console.log('新しい記事が追加されました。articles.jsonを手動で更新してください:', articleData);
    }
}

// ページ読み込み完了後に記事ローダーを初期化
document.addEventListener('DOMContentLoaded', () => {
    new HomeArticleLoader();
});

// グローバルに記事ローダーを公開（デバッグ用）
window.HomeArticleLoader = HomeArticleLoader;
