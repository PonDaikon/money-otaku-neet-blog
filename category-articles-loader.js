// カテゴリページ用記事読み込みシステム
class CategoryArticleLoader {
    constructor(categoryId) {
        this.categoryId = categoryId;
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 12; // 1ページあたりの記事数
        this.init();
    }

    async init() {
        try {
            await this.loadArticles();
            this.renderArticles();
            this.updateArticlesCount();
        } catch (error) {
            console.error('記事の読み込みに失敗しました:', error);
            this.showErrorMessage();
        }
    }

    async loadArticles() {
        try {
            const response = await fetch('../articles.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // 指定されたカテゴリの記事のみをフィルタリング
            this.articles = (data.articles || [])
                .filter(article => article.category === this.categoryId)
                .sort((a, b) => new Date(b.date) - new Date(a.date)); // 日付順でソート（新しい順）
        } catch (error) {
            console.error('articles.jsonの読み込みに失敗しました:', error);
            // フォールバック: カテゴリに応じた既存記事を定義
            this.articles = this.getFallbackArticles();
        }
    }

    getFallbackArticles() {
        const allArticles = [
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
        
        return allArticles.filter(article => article.category === this.categoryId);
    }

    renderArticles() {
        const articlesGrid = document.getElementById('articles-grid');
        if (!articlesGrid) return;

        if (this.articles.length === 0) {
            articlesGrid.innerHTML = `
                <div class="no-articles">
                    <div class="no-articles-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <h3>まだ記事がありません</h3>
                    <p>このカテゴリの記事は準備中です。しばらくお待ちください。</p>
                    <a href="../index.html" class="btn btn-primary">ホームに戻る</a>
                </div>
            `;
            return;
        }

        // ページネーション用の記事を取得
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const currentArticles = this.articles.slice(startIndex, endIndex);

        // 記事カードを生成
        articlesGrid.innerHTML = '';
        currentArticles.forEach(article => {
            const articleCard = this.createArticleCard(article);
            articlesGrid.appendChild(articleCard);
        });

        // ページネーションを更新
        this.updatePagination();
    }

    createArticleCard(article) {
        const articleElement = document.createElement('article');
        articleElement.className = 'category-article-card';
        
        articleElement.innerHTML = `
            <a href="../articles/${article.filename}" class="article-link">
                <div class="article-header">
                    <div class="article-category">
                        <i class="fas ${this.getCategoryIcon(article.category)}"></i>
                        <span>${article.categoryName}</span>
                    </div>
                    <div class="article-date">${this.formatDate(article.date)}</div>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-description">${article.description}</p>
                <div class="article-footer">
                    <div class="read-time">
                        <i class="fas fa-clock"></i>
                        <span>${article.readTime}</span>
                    </div>
                    <div class="read-more">
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

    updateArticlesCount() {
        const countElement = document.getElementById('articles-count');
        if (countElement) {
            const totalArticles = this.articles.length;
            countElement.textContent = `${totalArticles}件の記事`;
        }
    }

    updatePagination() {
        const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
        
        if (totalPages <= 1) {
            // ページが1つしかない場合はページネーションを非表示
            const pagination = document.getElementById('pagination');
            if (pagination) {
                pagination.style.display = 'none';
            }
            return;
        }

        // ページネーションを表示
        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.style.display = 'flex';
        }

        // 前のページボタン
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
            prevBtn.onclick = () => this.goToPage(this.currentPage - 1);
        }

        // 次のページボタン
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
            nextBtn.onclick = () => this.goToPage(this.currentPage + 1);
        }

        // ページ番号
        const paginationNumbers = document.getElementById('pagination-numbers');
        if (paginationNumbers) {
            paginationNumbers.innerHTML = '';
            
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `pagination-number ${i === this.currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.onclick = () => this.goToPage(i);
                paginationNumbers.appendChild(pageBtn);
            }
        }
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderArticles();
        
        // ページトップにスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showErrorMessage() {
        const articlesGrid = document.getElementById('articles-grid');
        if (articlesGrid) {
            articlesGrid.innerHTML = `
                <div class="error-message">
                    <div class="error-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3>記事の読み込みに失敗しました</h3>
                    <p>しばらく時間をおいてから再度お試しください。</p>
                    <button onclick="location.reload()" class="btn btn-primary">再読み込み</button>
                </div>
            `;
        }
        
        const countElement = document.getElementById('articles-count');
        if (countElement) {
            countElement.textContent = '読み込みエラー';
        }
    }
}

// グローバルに公開（デバッグ用）
window.CategoryArticleLoader = CategoryArticleLoader;
