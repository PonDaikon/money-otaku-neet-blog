// 関連記事表示システム
class RelatedArticlesLoader {
    constructor(currentArticleId) {
        this.currentArticleId = currentArticleId;
        this.articles = [];
        this.maxRelatedArticles = 3; // 最大表示記事数
        this.init();
    }

    async init() {
        try {
            await this.loadArticles();
            this.renderRelatedArticles();
        } catch (error) {
            console.error('関連記事の読み込みに失敗しました:', error);
            this.showNoRelatedArticles();
        }
    }

    async loadArticles() {
        try {
            const response = await fetch('../articles.json');
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
                },
                {
                    id: "fixed-cost-reduction-guide",
                    title: "【固定費削減】通信費と光熱費を見直す完全ガイド",
                    description: "通信費と光熱費を見直して、生活の質を落とさずに毎月の支出を劇的に削減する方法を徹底解説。",
                    date: "2025-10-07",
                    category: "mamoru",
                    categoryName: "守る",
                    filename: "fixed-cost-reduction-guide.html",
                    readTime: "約8分で読める"
                }
            ];
        }
    }

    renderRelatedArticles() {
        const relatedContainer = document.getElementById('related-articles');
        if (!relatedContainer) return;

        // 現在の記事を取得
        const currentArticle = this.articles.find(article => article.id === this.currentArticleId);
        if (!currentArticle) {
            this.showNoRelatedArticles();
            return;
        }

        // 同じカテゴリの他の記事を取得
        const relatedArticles = this.articles
            .filter(article => 
                article.category === currentArticle.category && 
                article.id !== this.currentArticleId
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // 新しい順
            .slice(0, this.maxRelatedArticles);

        if (relatedArticles.length === 0) {
            this.showNoRelatedArticles(currentArticle.categoryName);
            return;
        }

        // 関連記事セクションを表示
        relatedContainer.style.display = 'block';

        // 関連記事リストを生成
        const articlesList = relatedContainer.querySelector('.related-articles-list');
        if (articlesList) {
            articlesList.innerHTML = '';
            relatedArticles.forEach(article => {
                const articleCard = this.createRelatedArticleCard(article);
                articlesList.appendChild(articleCard);
            });
        }

        // カテゴリ名を更新
        const categoryName = relatedContainer.querySelector('.related-category-name');
        if (categoryName) {
            categoryName.textContent = currentArticle.categoryName;
        }
    }

    showNoRelatedArticles(categoryName = '') {
        const relatedContainer = document.getElementById('related-articles');
        if (!relatedContainer) return;

        relatedContainer.style.display = 'block';
        
        // カテゴリ名を更新
        const categoryNameElement = relatedContainer.querySelector('.related-category-name');
        if (categoryNameElement && categoryName) {
            categoryNameElement.textContent = categoryName;
        }

        // 関連記事がない場合のメッセージを表示
        const articlesList = relatedContainer.querySelector('.related-articles-list');
        if (articlesList) {
            articlesList.innerHTML = `
                <div class="no-related-articles">
                    <div class="no-related-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h4>関連記事はまだありません</h4>
                    <p>このカテゴリの他の記事は現在準備中です。<br>新しい記事をお楽しみに！</p>
                    <div class="browse-categories">
                        <p>他のカテゴリもチェックしてみてください：</p>
                        <div class="category-links">
                            <a href="../categories/mamoru.html" class="category-link">
                                <i class="fas fa-shield-alt"></i>
                                守る
                            </a>
                            <a href="../categories/huyasu.html" class="category-link">
                                <i class="fas fa-chart-line"></i>
                                殖やす
                            </a>
                            <a href="../categories/kasegu.html" class="category-link">
                                <i class="fas fa-laptop-code"></i>
                                稼ぐ
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    createRelatedArticleCard(article) {
        const articleElement = document.createElement('article');
        articleElement.className = 'related-article-card';
        
        articleElement.innerHTML = `
            <a href="${article.filename}" class="related-article-link">
                <div class="related-article-header">
                    <div class="related-article-category">
                        <i class="fas ${this.getCategoryIcon(article.category)}"></i>
                        <span>${article.categoryName}</span>
                    </div>
                    <div class="related-article-date">${this.formatDate(article.date)}</div>
                </div>
                <h4 class="related-article-title">${article.title}</h4>
                <p class="related-article-description">${article.description}</p>
                <div class="related-article-footer">
                    <div class="related-read-time">
                        <i class="fas fa-clock"></i>
                        <span>${article.readTime}</span>
                    </div>
                    <div class="related-read-more">
                        続きを読む
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </a>
        `;
        
        return articleElement;
    }

    getCategoryIcon(category) {
        const icons = {
            'mamoru': 'fa-shield-alt',
            'huyasu': 'fa-chart-line',
            'kasegu': 'fa-laptop-code'
        };
        return icons[category] || 'fa-file-alt';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// グローバルに公開（記事ページで使用）
window.RelatedArticlesLoader = RelatedArticlesLoader;
