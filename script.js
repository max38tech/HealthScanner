document.addEventListener('DOMContentLoaded', () => {
    // Translations
    const translations = {
        jp: {
            title: "Genkimi | あなたの健康をスキャンする",
            nav_features: "機能",
            nav_how_it_works: "使い方",
            nav_download: "ダウンロード",
            hero_badge: "日本市場向け健康管理アプリ",
            hero_title: "食べているものを、<br><span class='text-gradient'>もっと詳しく知る。</span>",
            hero_description: "Genkimiは、バーコードをスキャンするだけで食品の栄養成分や添加物を解析し、独自のスコアで健康度をお知らせします。",
            features_title: "主な機能",
            features_subtitle: "健康な食生活をサポートするための強力なツール",
            feat_1_title: "高速スキャン",
            feat_1_desc: "JANコードを瞬時に読み取り。日本国内の膨大なデータベースから食品情報を取得します。",
            feat_2_title: "独自の健康スコア",
            feat_2_desc: "Nutri-Scoreや添加物情報を基に、食品を4段階で評価。一目で良し悪しがわかります。",
            feat_3_title: "添加物チェック",
            feat_3_desc: "注意が必要な添加物をハイライト。成分表示を読む手間を省きます。",
            feat_4_title: "AIラベル解析",
            feat_4_desc: "データベースにない商品でも、AIが原材料表示の写真を読み取って解析します。",
            how_title: "使い方はとても簡単",
            step_1_title: "アプリを開いてスキャン",
            step_1_desc: "スーパーでの買い物中、気になる商品のバーコードにかざすだけ。",
            step_2_title: "内容をチェック",
            step_2_desc: "スコア、栄養バランス、添加物の詳細を瞬時に確認。",
            step_3_title: "より良い選択を",
            step_3_desc: "より健康的な代替商品の提案も受けられます。",
            footer_cta_title: "今すぐ健康な選択を始めましょう",
            footer_cta_desc: "Genkimiをダウンロードして、毎日の食事をアップデート。"
        },
        en: {
            title: "Genkimi | Scan Your Health",
            nav_features: "Features",
            nav_how_it_works: "How it Works",
            nav_download: "Download",
            hero_badge: "Health Management App for Japan",
            hero_title: "Understand what you eat,<br><span class='text-gradient'>in much more detail.</span>",
            hero_description: "Genkimi analyzes food nutrients and additives just by scanning a barcode, providing an instant health score.",
            features_title: "Key Features",
            features_subtitle: "Powerful tools to support a healthy diet",
            feat_1_title: "Lightning-Fast Scan",
            feat_1_desc: "Instantly read JAN codes and fetch food info from vast Japanese databases.",
            feat_2_title: "Smart Health Scoring",
            feat_2_desc: "Evaluate food in 4 stages based on Nutri-Score and additives. See the quality at a glance.",
            feat_3_title: "Additive Check",
            feat_3_desc: "Highlights problematic additives, saving you the hassle of reading labels.",
            feat_4_title: "AI Label Analysis",
            feat_4_desc: "Even for products not in the database, AI analyzes photos of ingredient labels.",
            how_title: "Extremely Easy to Use",
            step_1_title: "Open App & Scan",
            step_1_desc: "Simply point at the barcode of any product while shopping.",
            step_2_title: "Check the Details",
            step_2_desc: "Instantly check scores, nutritional balance, and additive details.",
            step_3_title: "Make Better Choices",
            step_3_desc: "Receive suggestions for healthier alternative products.",
            footer_cta_title: "Start making healthy choices now",
            footer_cta_desc: "Download Genkimi and upgrade your daily meals."
        }
    };

    let currentLang = localStorage.getItem('preferredLang') || 'jp';

    const updateContent = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        document.title = translations[lang].title;
        document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
        document.querySelector('.current-lang').textContent = lang.toUpperCase();
    };

    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'jp' ? 'en' : 'jp';
        localStorage.setItem('preferredLang', currentLang);
        updateContent(currentLang);
    });

    // Initialize translations
    updateContent(currentLang);

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.feature-card, .step, .hero-text, .hero-image, .section-header');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Add classes for initial state
    revealElements.forEach(el => el.classList.add('reveal'));

    window.addEventListener('scroll', revealOnScroll);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            navbar.style.height = '70px';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '80px';
        }
    });

    // Mobile menu placeholder
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', () => {
        alert('Mobile menu clicked!');
    });
});
