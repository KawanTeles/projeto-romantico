/* 
   LOGICA INTERATIVA (JavaScript)
   Adiciona vida e movimento ao presente digital.
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMAÇÃO DE APARECIMENTO (FADE-IN)
    // Faz as seções aparecerem suavemente conforme o scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });

    // 2. CORAÇÕES FLUTUANTES NO FUNDO
    // Cria pequenos corações que sobem na tela aleatoriamente
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤';

        // Posição horizontal aleatória
        heart.style.left = Math.random() * 100 + 'vw';

        // Tamanho aleatório
        const size = Math.random() * 20 + 10 + 'px';
        heart.style.fontSize = size;

        // Duração da animação aleatória
        const duration = Math.random() * 3 + 2 + 's';
        heart.style.animationDuration = duration;

        document.body.appendChild(heart);

        // Remove o coração após a animação
        setTimeout(() => {
            heart.remove();
        }, parseFloat(duration) * 1000);
    }

    // Cria um novo coração a cada 500ms
    setInterval(createHeart, 500);

    // 3. BOTÃO DE CONTINUAR (Scroll Suave + Play na Música)
    const btnHero = document.querySelector('.btn-romantico');
    const musica = document.querySelector('#musica-romantica');

    /**
     * Função para scroll suave com controle de velocidade
     * @param {string} target - Seletor do elemento de destino
     * @param {number} duration - Duração da animação em milissegundos
     */
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition); // Garante que chegue no ponto exato
            }
        }

        // Função de easing para suavizar o movimento (easeInOutQuad)
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    if (btnHero) {
        btnHero.addEventListener('click', () => {
            // Scroll equilibrado (1000ms = 1 segundo)
            // Resposta imediata ao clique, movimento fluido.
            smoothScroll('#galeria', 1000);

            // Tenta dar play na música
            if (musica) {
                // PERSONALIZE O VOLUME AQUI (0.0 a 1.0)
                // 0.5 representa 50% do volume
                musica.volume = 0.5; 

                musica.play().catch(error => {
                    console.log("O áudio não pôde ser reproduzido automaticamente:", error);
                });
            }
        });
    }

    // 4. CONTADOR DE TEMPO JUNTOS
    const dataInicio = new Date("2024-10-07T00:00:00");

    function atualizarContador() {
        const agora = new Date();
        const diferenca = agora - dataInicio;

        // Cálculos matemáticos para converter milissegundos em dias, horas, minutos e segundos
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        // Atualiza os elementos na tela com padStart para manter sempre dois dígitos
        const elDias = document.getElementById('days');
        const elHoras = document.getElementById('hours');
        const elMinutos = document.getElementById('minutes');
        const elSegundos = document.getElementById('seconds');

        if (elDias) elDias.textContent = dias.toString().padStart(2, '0');
        if (elHoras) elHoras.textContent = horas.toString().padStart(2, '0');
        if (elMinutos) elMinutos.textContent = minutos.toString().padStart(2, '0');
        if (elSegundos) elSegundos.textContent = segundos.toString().padStart(2, '0');
    }

    // Inicia o contador e define o intervalo de atualização para 1 segundo
    setInterval(atualizarContador, 1000);
    atualizarContador();

});

