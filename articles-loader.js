// 記事の自動読み込みと表示システム
class ArticleLoader {
    constructor() {
        this.articles = [];
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
                    categoryName: "増やす",
                    filename: "nisa-rakuten-guide.html",
                    readTime: "12分で読める"
                }
            ];
        }
    }

    renderArticles() {
        const categories = ['mamoru', 'huyasu', 'kasegu'];
        
        categories.forEach(category => {
            const categoryArticles = this.articles.filter(article => article.category === category);
            const articleListElement = document.querySelector(`#${category} .article-list`);
            
            if (articleListElement && categoryArticles.length > 0) {
                // 既存の記事カードをクリア（実際の記事のみを残すため）
                articleListElement.innerHTML = '';
                
                // 実際に存在する記事のみを表示
                categoryArticles.forEach(article => {
                    const articleCard = this.createArticleCard(article);
                    articleListElement.appendChild(articleCard);
                });
            }
        });
    }

    createArticleCard(article) {
        const articleElement = document.createElement('article');
        articleElement.className = 'article-card';
        
        articleElement.innerHTML = `
            <a href="articles/${article.filename}">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <span class="article-date">${article.date}</span>
            </a>
        `;
        
        return articleElement;
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
    new ArticleLoader();
});

// グローバルに記事ローダーを公開（デバッグ用）
window.ArticleLoader = ArticleLoader;
