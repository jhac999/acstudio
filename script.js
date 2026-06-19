document.addEventListener('DOMContentLoaded', () => {
    // 自动聚焦文本框时的交互提示
    const inputs = document.querySelectorAll('.other-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderBottomColor = 'var(--spirit-gold)';
        });
        input.addEventListener('blur', function() {
            this.style.borderBottomColor = 'var(--ritual-red-dark)';
        });
    });

    // 音乐播放器逻辑 (Cool R&B Vibe)
    const playPauseBtn = document.getElementById('playPauseBtn');
    const bgm = document.getElementById('bgm');
    const cd = document.querySelector('.cd');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    if(playPauseBtn && bgm) {
        // 强制绕过浏览器缓存加载最新的 mp3
        const timestamp = new Date().getTime();
        if(!bgm.src.includes('?t=')) {
            bgm.src = "bgm.mp3?t=" + timestamp;
            bgm.load();
        }
        
        bgm.volume = 0.5;
        let isPlayAttempted = false;
        
        const updateUI = (isPlaying) => {
            if (isPlaying) {
                cd.classList.add('playing');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                cd.classList.remove('playing');
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        };

        const forcePlayMusic = () => {
            if (isPlayAttempted) return;
            const playPromise = bgm.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlayAttempted = true;
                    updateUI(true);
                    console.log("音频播放成功！");
                }).catch(error => {
                    console.log("播放依然被阻止或出错:", error);
                    updateUI(false);
                });
            }
        };

        // 绑定全局交互事件，因为任何交互都可以解锁音频
        const unlockAudio = () => {
            forcePlayMusic();
            ['click', 'touchstart', 'keydown'].forEach(evt => 
                document.removeEventListener(evt, unlockAudio)
            );
        };
        
        ['click', 'touchstart', 'keydown'].forEach(evt => 
            document.addEventListener(evt, unlockAudio, { once: true })
        );

        // 手动按钮逻辑
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgm.paused) {
                bgm.play().then(() => {
                    isPlayAttempted = true;
                    updateUI(true);
                }).catch(err => {
                    alert("无法播放：" + err.message + "\n可能是音频格式不支持或被浏览器拦截。");
                    updateUI(false);
                });
            } else {
                bgm.pause();
                updateUI(false);
            }
        });
    }

    const form = document.getElementById('harmonyForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusText = document.getElementById('submitStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 提取数据
        const data = {
            artistName: document.getElementById('artistName').value,
            contactInfo: document.getElementById('contactInfo').value,
            songName: document.getElementById('songName').value,
            serviceTier: document.querySelector('input[name="4_服务档位"]:checked')?.value || '',
            emotion: Array.from(document.querySelectorAll('input[name="5_情绪色彩"]:checked')).map(cb => cb.value).join(', '),
            density: document.querySelector('input[name="6_编排密度"]:checked')?.value || '',
            preference: document.querySelector('input[name="7_声部偏好"]:checked')?.value || '',
            reference: document.getElementById('reference').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            notes: document.getElementById('notes').value
        };

        // 另存为 JSON 文件
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const now = new Date();
        const timestamp = now.getFullYear().toString() + 
            String(now.getMonth() + 1).padStart(2, '0') + 
            String(now.getDate()).padStart(2, '0') + "_" + 
            String(now.getHours()).padStart(2, '0') + 
            String(now.getMinutes()).padStart(2, '0') + 
            String(now.getSeconds()).padStart(2, '0');
            
        const fileName = "HarmonyRequest_" + (data.artistName || "未命名") + "_" + timestamp + ".json";

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // 提交表单以发送邮件
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').innerText = '正在发送...';
        
        document.getElementById('nextUrl').value = window.location.href;
        
        setTimeout(() => {
            form.submit();
        }, 500);
    });
});

// 滚动动画逻辑
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
});
