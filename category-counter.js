/**
 * カテゴリ数自動計算システム
 * articles.jsonから動的にカテゴリ数を計算し、サイドバーとフッターの数値を自動更新
 */

class CategoryCounter {
    constructor() {
        this.categoryCounts = {};
        this.categoryNames = {
            'mamoru': '守る',
            'huyasu': '殖やす', 
            'kasegu': '稼ぐ'
        };
    }

    /**
     * articles.jsonを読み込んでカテゴリ数を計算
     */
    async loadAndCountCategories() {
        try {
            // 現在のページの階層を判定してarticles.jsonのパスを決定
            const currentPath = window.location.pathname;
            let articlesJsonPath = './articles.json';
            
            if (currentPath.includes('/articles/')) {
                articlesJsonPath = '../articles.json';
            } else if (currentPath.includes('/categories/')) {
                articlesJsonPath = '../articles.json';
            }

            const response = await fetch(articlesJsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // カテゴリ数をカウント
            this.categoryCounts = {};
            data.articles.forEach(article => {
                const category = article.category;
                this.categoryCounts[category] = (this.categoryCounts[category] || 0) + 1;
            });

            console.log('カテゴリ数計算完了:', this.categoryCounts);
            return this.categoryCounts;
        } catch (error) {
            console.error('カテゴリ数の読み込みに失敗:', error);
            // フォールバック値を設定
            this.categoryCounts = {
                'mamoru': 3,
                'huyasu': 3,
                'kasegu': 1
            };
            return this.categoryCounts;
        }
    }

    /**
     * サイドバーのカテゴリ数を更新
     */
    updateSidebarCounts() {
        const sidebarLinks = document.querySelectorAll('.sidebar .category-link');
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            let category = null;
            
            // hrefからカテゴリを判定
            if (href && href.includes('mamoru')) {
                category = 'mamoru';
            } else if (href && href.includes('huyasu')) {
                category = 'huyasu';
            } else if (href && href.includes('kasegu')) {
                category = 'kasegu';
            }
            
            if (category && this.categoryCounts[category] !== undefined) {
                const badge = link.querySelector('.badge:last-child');
                if (badge) {
                    badge.textContent = this.categoryCounts[category];
                    console.log(`サイドバー更新: ${category} = ${this.categoryCounts[category]}`);
                }
            }
        });
    }

    /**
     * フッターのカテゴリ数を更新
     */
    updateFooterCounts() {
        const footerLinks = document.querySelectorAll('.footer .footer-link');
        
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            let category = null;
            
            // hrefからカテゴリを判定
            if (href && href.includes('mamoru')) {
                category = 'mamoru';
            } else if (href && href.includes('huyasu')) {
                category = 'huyasu';
            } else if (href && href.includes('kasegu')) {
                category = 'kasegu';
            }
            
            if (category && this.categoryCounts[category] !== undefined) {
                // フッターの数値部分を更新（最後のspanタグ）
                const countSpan = link.querySelector('span:last-child');
                if (countSpan && !countSpan.classList.contains('badge')) {
                    countSpan.textContent = this.categoryCounts[category];
                    console.log(`フッター更新: ${category} = ${this.categoryCounts[category]}`);
                }
            }
        });
    }

    /**
     * ホームページのカテゴリ数を更新
     */
    updateHomeCategoryCounts() {
        // ホームページの各カテゴリセクションの記事数を更新
        const categoryElements = [
            { selector: '#mamoru .category-count', category: 'mamoru' },
            { selector: '#huyasu .category-count', category: 'huyasu' },
            { selector: '#kasegu .category-count', category: 'kasegu' }
        ];

        categoryElements.forEach(({ selector, category }) => {
            const element = document.querySelector(selector);
            if (element && this.categoryCounts[category] !== undefined) {
                element.textContent = `${this.categoryCounts[category]}記事`;
                console.log(`ホームページ更新: ${category} = ${this.categoryCounts[category]}記事`);
            }
        });
    }

    /**
     * すべてのカテゴリ数を更新
     */
    async updateAllCounts() {
        await this.loadAndCountCategories();
        
        // DOM読み込み完了を待つ
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateSidebarCounts();
                this.updateFooterCounts();
                this.updateHomeCategoryCounts();
            });
        } else {
            this.updateSidebarCounts();
            this.updateFooterCounts();
            this.updateHomeCategoryCounts();
        }
    }

    /**
     * 手動でカテゴリ数を更新（デバッグ用）
     */
    async manualUpdate() {
        console.log('手動でカテゴリ数を更新中...');
        await this.updateAllCounts();
        console.log('カテゴリ数更新完了');
    }
}

// グローバルインスタンスを作成
window.categoryCounter = new CategoryCounter();

// ページ読み込み時に自動実行
document.addEventListener('DOMContentLoaded', () => {
    window.categoryCounter.updateAllCounts();
});

// 他のスクリプトから呼び出せるように関数をエクスポート
window.updateCategoryCounts = () => {
    return window.categoryCounter.updateAllCounts();
};

// デバッグ用の手動更新関数
window.manualUpdateCategoryCounts = () => {
    return window.categoryCounter.manualUpdate();
};
