// ページ読み込み時にスクロールを無効化とヘッダー非表示
document.body.style.overflow = 'hidden';
const header = document.querySelector('.header');
header.style.opacity = '0';
header.style.visibility = 'hidden';

// ロゴアニメーションの完了を待つ
const logoFrames = document.querySelectorAll('.logo-frame');
const lastLogoFrame = logoFrames[logoFrames.length - 1];

// アニメーション完了までの時間を計算（最後のフレームまでの時間）
const animationDuration = 7000; // 7秒間（調整可能）

// アニメーション完了後にスクロールを有効化とヘッダー表示
setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = '1';
    
    // ヘッダーを表示
    header.style.opacity = '1';
    header.style.visibility = 'visible';
}, animationDuration);

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// スクロールアニメーション
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// スクロールイベントを統合
window.addEventListener('scroll', () => {
    // ヘッダーの背景透過制御
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 会社概要セクションの背景画像移動
    const companySection = document.querySelector('.company');
    const rect = companySection.getBoundingClientRect();
    const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    
    if (scrollPercentage > 0 && scrollPercentage < 1) {
        const position = Math.min(100, Math.max(0, scrollPercentage * 100));
        companySection.style.backgroundPosition = `${position}% center`;
    }
});
