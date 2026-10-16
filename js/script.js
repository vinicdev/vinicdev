const meusSites = [
    {
        url: "bigambitions.vinic.dev",
        nome: "Big Ambitions Hub",
        descricao: "Ferramentas, calculadoras de negócios e guias estratégicos otimizados para dominar o jogo Big Ambitions.",
        tag: "Gaming & Tools",
        icone: "ph-buildings"
    },
    {
        url: "loteria.vinic.dev",
        nome: "Loteria Inteligente",
        descricao: "Simulador, gerador de combinações, estatísticas de sorteios e conferência rápida de jogos de loteria.",
        tag: "Utilitário & Sorte",
        icone: "ph-clover"
    }
];

const paletasVisuais = [
    {
        nome: "amber-gold",
        borderHover: "hover:border-amber-500/50",
        badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
        iconBox: "bg-gradient-to-br from-amber-500/20 to-orange-600/10 text-amber-400 border-amber-500/30",
        glowColor: "rgba(245, 158, 11, 0.14)",
        accentBar: "from-amber-400 via-orange-500 to-yellow-500",
        btnHover: "group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-400"
    },
    {
        nome: "emerald-neon",
        borderHover: "hover:border-emerald-500/50",
        badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
        iconBox: "bg-gradient-to-br from-emerald-500/20 to-teal-600/10 text-emerald-400 border-emerald-500/30",
        glowColor: "rgba(16, 185, 129, 0.14)",
        accentBar: "from-emerald-400 via-teal-500 to-green-500",
        btnHover: "group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:border-emerald-400"
    },
    {
        nome: "indigo-cyber",
        borderHover: "hover:border-indigo-500/50",
        badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
        iconBox: "bg-gradient-to-br from-indigo-500/20 to-violet-600/10 text-indigo-400 border-indigo-500/30",
        glowColor: "rgba(99, 102, 241, 0.15)",
        accentBar: "from-indigo-400 via-purple-500 to-violet-500",
        btnHover: "group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400"
    },
    {
        nome: "rose-punk",
        borderHover: "hover:border-rose-500/50",
        badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
        iconBox: "bg-gradient-to-br from-rose-500/20 to-pink-600/10 text-rose-400 border-rose-500/30",
        glowColor: "rgba(244, 63, 94, 0.14)",
        accentBar: "from-rose-400 via-pink-500 to-fuchsia-500",
        btnHover: "group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-400"
    },
    {
        nome: "cyan-future",
        borderHover: "hover:border-cyan-500/50",
        badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
        iconBox: "bg-gradient-to-br from-cyan-500/20 to-blue-600/10 text-cyan-400 border-cyan-500/30",
        glowColor: "rgba(6, 182, 212, 0.14)",
        accentBar: "from-cyan-400 via-sky-500 to-blue-500",
        btnHover: "group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-300"
    },
    {
        nome: "purple-haze",
        borderHover: "hover:border-fuchsia-500/50",
        badgeBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
        iconBox: "bg-gradient-to-br from-fuchsia-500/20 to-purple-600/10 text-fuchsia-400 border-fuchsia-500/30",
        glowColor: "rgba(217, 70, 239, 0.14)",
        accentBar: "from-fuchsia-400 via-purple-500 to-pink-500",
        btnHover: "group-hover:bg-fuchsia-500 group-hover:text-white group-hover:border-fuchsia-400"
    }
];

const iconesFallback = [
    "ph-globe-hemisphere-west",
    "ph-rocket-launch",
    "ph-code-block",
    "ph-cpu",
    "ph-lightning",
    "ph-compass",
    "ph-terminal-window",
    "ph-sparkle"
];

function normalizarItemSite(item, index) {
    let rawUrl = typeof item === 'string' ? item.trim() : (item.url || '').trim();

    const hrefCompleto = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;

    const dominioLimpo = rawUrl.replace(/^https?:\/\//i, '').replace(/\/$/, '');

    const partesDominio = dominioLimpo.split('.');
    const subdominio = partesDominio[0] || dominioLimpo;
    const tituloAutomatico = subdominio
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, letra => letra.toUpperCase());

    const iconeAutomatico = iconesFallback[index % iconesFallback.length];

    return {
        id: index + 1,
        href: hrefCompleto,
        dominio: dominioLimpo,
        nome: (typeof item === 'object' && item.nome) ? item.nome : tituloAutomatico,
        descricao: (typeof item === 'object' && item.descricao)
            ? item.descricao
            : `Aplicação web hospedada em ${dominioLimpo} fazendo parte do ecossistema vinicdev.`,
        tag: (typeof item === 'object' && item.tag) ? item.tag : "Web App",
        icone: (typeof item === 'object' && item.icone) ? item.icone : iconeAutomatico,
        paleta: paletasVisuais[index % paletasVisuais.length]
    };
}

function renderizarSites(filtroTexto = "") {
    const grid = document.getElementById('links-grid');
    const emptyState = document.getElementById('empty-state');
    const counter = document.getElementById('site-counter');

    grid.innerHTML = '';

    const sitesNormalizados = meusSites.map((item, idx) => normalizarItemSite(item, idx));

    counter.textContent = String(sitesNormalizados.length).padStart(2, '0');

    const termo = filtroTexto.toLowerCase().trim();
    const sitesFiltrados = sitesNormalizados.filter(site =>
        site.nome.toLowerCase().includes(termo) ||
        site.dominio.toLowerCase().includes(termo) ||
        site.descricao.toLowerCase().includes(termo) ||
        site.tag.toLowerCase().includes(termo)
    );

    if (sitesFiltrados.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');

    sitesFiltrados.forEach((site) => {
        const p = site.paleta;
        const numeroFormatado = String(site.id).padStart(2, '0');

        const card = document.createElement('a');
        card.href = site.href;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.style.setProperty('--spotlight-color', p.glowColor);
        card.className = `project-card group rounded-2xl bg-slate-900/70 border border-slate-800/90 ${p.borderHover} backdrop-blur-md p-6 flex flex-col justify-between shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`;

        card.innerHTML = `
            <!-- Barra superior gradiente exclusiva de cada card -->
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accentBar} opacity-75 group-hover:opacity-100 transition-opacity"></div>

            <div class="relative z-10">
                <!-- Topo do Card: Ícone, Número e Tag -->
                <div class="flex items-start justify-between gap-4 mb-5">
                    <div class="w-12 h-12 rounded-xl border ${p.iconBox} flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <i class="ph-duotone ${site.icone} text-2xl"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-mono px-2.5 py-1 rounded-full border ${p.badgeBg} font-medium">
                            ${site.tag}
                        </span>
                        <span class="text-xs font-mono text-slate-600 font-bold">
                            #${numeroFormatado}
                        </span>
                    </div>
                </div>

                <!-- Nome e Descrição do Site -->
                <h2 class="font-display font-bold text-xl text-white group-hover:text-indigo-200 transition-colors flex items-center gap-2">
                    ${site.nome}
                </h2>
                
                <p class="text-slate-400 text-sm mt-2 leading-relaxed line-clamp-3">
                    ${site.descricao}
                </p>
            </div>

            <!-- Rodapé do Card: URL e Botões de Ação -->
            <div class="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 min-w-0">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span class="font-mono text-xs text-slate-300 truncate group-hover:text-white transition-colors">
                        ${site.dominio}
                    </span>
                </div>

                <div class="flex items-center gap-1.5 shrink-0">
                    <!-- Botão para copiar link sem abrir a aba -->
                    <button 
                        type="button"
                        onclick="copiarLink(event, '${site.href}')" 
                        title="Copiar URL"
                        class="w-8 h-8 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 flex items-center justify-center transition-colors"
                    >
                        <i class="ph ph-copy text-sm"></i>
                    </button>

                    <!-- Indicador de abrir em nova guia -->
                    <div class="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 flex items-center justify-center transition-all duration-300 ${p.btnHover}">
                        <i class="ph-bold ph-arrow-up-right text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        grid.appendChild(card);
    });
}

function copiarLink(event, url) {
    event.preventDefault();
    event.stopPropagation();

    const tempInput = document.createElement('textarea');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    mostrarToast(`Copiado: ${url}`);
}

let toastTimeout;
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.textContent = mensagem;

    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2800);
}

document.getElementById('search-input').addEventListener('input', (e) => {
    renderizarSites(e.target.value);
});

window.addEventListener('DOMContentLoaded', () => {
    renderizarSites();
});