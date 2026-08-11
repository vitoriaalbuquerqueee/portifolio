// Selecionar a Secao About
const about = document.querySelector("#about")

// Formulário

 const formulario = document.querySelector('#formulario')
 
// Expressão Regular de validação do e-mail

 const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

async function getAboutGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/vitoriaalbuquerqueee')
        const perfil = await resposta.json()


        about.innerHTML = `
           <figure class="about-image">
                <img
                    src="./assets/img/perfil.jpeg"
                    width="300"
                    alt="Foto de Vitoria Albuquerque">
            </figure>

            <!-- Conteúdo -->
            <article class="about-content">
                <h2>Sobre mim</h2>

                <p>
                    Sou Vitoria Albuquerque, estudante de Desenvolvimento
                    Java Full Stack na Generation Brasil. Estou construindo
                    minha carreira na área de tecnologia com foco no
                    desenvolvimento de aplicações web e em boas práticas
                    de programação.
                </p>

                <p>
                    Durante minha formação, venho desenvolvendo conhecimentos
                    em Java, Programação Orientada a Objetos, Spring Boot,
                    APIs REST, MySQL, HTML, CSS e JavaScript, colocando esses
                    conhecimentos em prática por meio de projetos e desafios
                    de desenvolvimento.
                </p>

                <p>
                    Meu objetivo é conquistar minha primeira oportunidade
                    como Desenvolvedora Java Júnior, continuar evoluindo
                    tecnicamente e, futuramente, atuar no mercado internacional.
                </p>

                <!-- GitHub + Currículo + Dados -->
                <div class="about-buttons-data">
                    <div class="buttons-container">
                        <!-- GitHub -->
                        <a
                            href="https://github.com/vitoriaalbuquerqueee"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="botao">
                            GitHub
                        </a>

                        <!-- Currículo -->
                        <a
                            href="https://we.tl/t-dd7UHpYRVGkNbMLz"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="botao-outline">
                            Currículo
                        </a>
                    </div>

                    <!-- Dados -->
                    <div class="data-container">
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>
                    </div>
                </div>
            </article>
        `
    } catch (error) {
        console.error("Erro ao buscar dados do GitHub", error)
    }
}

// Selecionar o container do Swiper
const swiperWrapper = document.querySelector(".swiper-wrapper")

// Função para construção do Carrossel com o Swiper
async function getProjectsGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/vitoriaalbuquerqueee/repos?sort=updated&per_page=6')
        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = ""

        // Ícones das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        repositorios.forEach((repositorio) => {
            // Seleciona a linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub'

            // Seleciona o ícone correspondente
            const icone = linguagens[linguagem] ?? linguagens['GitHub']

            // CORREÇÃO: Usar ${icone} em vez de $(icone)
            const urlIcone = `./assets/icons/languages/${icone}.svg`
            
            // Formata o Nome do Repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+t[a-z0-9]+$/i, '')
                .toUpperCase()
               
            // Função para truncar texto
            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            // Construindo a descrição do card
            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto Desenvolvido no GitHub'

            // CORREÇÃO: Usar .slice(0, 3) com 'c' + fechar a tag </span>
            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`;

            // Botão Deploy
            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : ''

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                    </a>
                    ${botaoDeploy}
                </div>`
           
            // Constrói o Card na tela
            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <!-- Ícone da Tecnologia -->
                        <figure class="project-image">
                            <img src="${urlIcone}" alt="Ícone - ${linguagem}">
                        </figure>
                       
                        <!-- Conteúdo do Projeto -->
                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                       
                            <!-- Tags do Projeto -->
                            <div class="project-tags">
                                ${tags}
                            </div>
                       
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `
        })

        // CORREÇÃO: Nome corrigido sem 'P' duplo
        iniciarSwiper()

    } catch (error) {
        console.error("Erro ao buscar os dados dos projetos no GitHub", error)
    }
}

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false,
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    })
}

formulario.addEventListener('submit', function (event) {

 	event.preventDefault()
 
	document

 		.querySelectorAll('form span')

 		.forEach((span) => (span.innerHTML = ''))
 
	let isValid = true
 
	const nome = document.querySelector('#nome')

 	const erroNome = document.querySelector('#erro-nome')
 
	if (nome.value.trim().length < 3) {

 		erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'

 		if (isValid) nome.focus()

 		isValid = false

 	}
 
	const email = document.querySelector('#email')

 	const erroEmail = document.querySelector('#erro-email')
 
	if (!email.value.trim().match(emailRegex)) {

 		erroEmail.innerHTML = 'Digite um endereço de e-mail válido'

 		if (isValid) email.focus()

 		isValid = false

 	}
 
	const assunto = document.querySelector('#assunto')

 	const erroAssunto = document.querySelector('#erro-assunto')
 
	if (assunto.value.trim().length < 5) {

 		erroAssunto.innerHTML =

 			'O assunto deve ter no mínimo 5 caracteres'

 		if (isValid) assunto.focus()

 		isValid = false

 	}
 
	const mensagem = document.querySelector('#mensagem')

 	const erroMensagem = document.querySelector('#erro-mensagem')
 
	if (mensagem.value.trim().length === 0) {

 		erroMensagem.innerHTML = 'A mensagem não pode ser vazia'

 		if (isValid) mensagem.focus()

 		isValid = false

 	}
 
	if (isValid) {

 		const submitButton = formulario.querySelector(

 			'button[type="submit"]',

 		)

 		submitButton.disabled = true

 		submitButton.textContent = 'Enviando...'
 
		formulario.submit()

 	}

 })


// Execução das funções
getAboutGithub()
getProjectsGithub()