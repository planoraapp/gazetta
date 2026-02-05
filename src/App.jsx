import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import {
  Settings,
  Sparkles,
  RefreshCw,
  Newspaper,
  TrendingUp,
  Calendar,
  Share2,
  Bookmark,
  X,
  ArrowLeft,
  User,
  Globe,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 25+ Fontes Expandidas (Brasil + Mundo)
const GLOBAL_SOURCES = [
  { name: "G1 Economia", url: "https://g1.globo.com/rss/g1/economia/" },
  { name: "Tecnoblog", url: "https://tecnoblog.net/feed/" },
  { name: "Canaltech", url: "https://canaltech.com.br/rss/" },
  { name: "Jovem Nerd", url: "https://jovemnerd.com.br/feed/" },
  { name: "Folha de S.Paulo", url: "https://feeds.folha.uol.com.br/emcimadhora/rss091.xml" },
  { name: "BBC Brasil", url: "https://feeds.bbci.co.uk/portuguese/rss.xml" },
  { name: "UOL Tecnologia", url: "https://rss.uol.com.br/feed/tecnologia.xml" },
  { name: "Estadão", url: "https://www.estadao.com.br/arc/outboundfeeds/rss/categoria/brasil/" },
  { name: "Valor", url: "https://valor.globo.com/rss/valor/" },
  { name: "Olhar Digital", url: "https://olhardigital.com.br/feed/" },
  { name: "Exame", url: "https://exame.com/feed/" },
  { name: "Gizmodo BR", url: "https://gizmodo.uol.com.br/feed/" },
  { name: "MacMagazine", url: "https://macmagazine.com.br/feed/" },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { name: "Wired", url: "https://www.wired.com/feed/rss" },
  { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index" },
  { name: "BBC News World", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
  { name: "NY Post Tech", url: "https://nypost.com/tech/feed/" },
  { name: "The Guardian Tech", url: "https://www.theguardian.com/uk/technology/rss" },
  { name: "Reuters World", url: "https://www.reutersagency.com/feed/?best-topics=world-news&post_type=best" },
  { name: "Mashable", url: "https://mashable.com/feeds/rss/all" },
  { name: "Engadget", url: "https://www.engadget.com/rss.xml" },
  { name: "Forbes Tech", url: "https://www.forbes.com/innovation/feed/" },
  { name: "Reuters Tech", url: "https://www.reutersagency.com/feed/?best-topics=technology&post_type=best" }
];

// Componente de Artigo Individual
const ArticleView = ({ news, lastUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = news.find(n => String(n.id) === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center">
        <div className="text-center">
          <Newspaper className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-xl font-bold">Artigo não encontrado</p>
          <button onClick={() => navigate('/')} className="mt-4 underline hover:text-red-700">Voltar à Edição</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] relative">
      <div className="paper-texture" />

      <header className="sticky top-0 z-[100] bg-[#f4f1ea]/90 backdrop-blur-md border-b border-black py-4 px-4 md:px-12 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[10px] font-black uppercase hover:text-red-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar à Edição</span>
        </button>
        <h2 className="newspaper-title text-2xl md:text-3xl select-none">Gazetta</h2>
        <div className="hidden md:flex items-center gap-4 text-[9px] font-black uppercase tracking-widest opacity-60">
          <span>{article.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Cobertura Global</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <article className="font-serif">
          <header className="mb-12 border-b-4 border-black pb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-700 font-bold uppercase text-xs tracking-widest">{article.category}</span>
              {article.isTrending && <span className="bg-black text-white px-2 py-0.5 text-[8px] font-black uppercase flex items-center gap-1"><Zap className="w-2.5 h-2.5" /> Viral</span>}
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.05] mb-8 uppercase tracking-tighter">{article.title}</h1>
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-500 border-t border-black/10 pt-6">
              <span className="flex items-center gap-2"><User className="w-3 h-3" /> Correspondente: {article.author}</span>
              <span>{article.time} • Fonte: {article.source}</span>
            </div>
          </header>

          {article.image && (
            <div className="mb-16 border border-black p-1 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
              <img src={article.image} className="w-full" alt="" />
              <div className="mt-4 flex justify-between items-center px-4">
                <span className="text-[8px] uppercase font-bold text-gray-400 italic">Arquivo Digital Gazetta Intelligence</span>
                <div className="flex gap-4"><Share2 className="w-3 h-3 cursor-pointer" /><Bookmark className="w-3 h-3 cursor-pointer" /></div>
              </div>
            </div>
          )}

          <div
            className="text-xl md:text-2xl leading-[1.6] text-gray-800 space-y-10 prose prose-newspaper max-w-none prose-img:hidden"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-32 pt-16 border-t-4 border-black text-center italic opacity-40">
            <Newspaper className="w-16 h-16 mx-auto mb-6" />
            <p className="mb-2 text-sm font-bold not-italic font-sans uppercase tracking-[0.3em]">Gazetta Digital Intelligence</p>
            <p>&copy; 2026 — Algoritmo de Consenso Global</p>
            <a href={article.link} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-black not-italic hover:underline mt-8 block hover:text-red-700">Verificar Documentação de Origem</a>
          </div>
        </article>
      </div>
    </div>
  );
};

// Componente Principal da Lista
const NewsList = ({ news, isLoading, lastUpdate, showSettings, setShowSettings, curateNews, interests, toggleInterest, isLoadingMore }) => {
  const navigate = useNavigate();

  const openArticle = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <>
      <header className="max-w-7xl mx-auto px-4 md:px-12 pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-black pb-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
          <div className="flex items-center gap-4 mb-2 md:mb-0">
            <span className="flex items-center gap-2 text-red-700 animate-pulse"><Globe className="w-3 h-3" /> Conexão Global Ativa</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {lastUpdate.toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="italic font-normal lowercase tracking-normal text-sm text-gray-500">Preço: Grátis</span>
            <span>|</span>
            <span className="text-black font-black">Edição personalizada</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <h1 className="newspaper-title text-7xl md:text-[10rem] leading-none mb-2 select-none">Gazetta</h1>
          <div className="flex items-center justify-center gap-4 md:gap-12 py-2 border-y-2 border-black mt-4">
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest flex-1 text-right">Tecnologia, Economia e tudo que você quiser</span>
            <div className="text-sm italic font-serif px-8 whitespace-nowrap">"Mundus in notitia"</div>
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest flex-1 text-left">Curadoria das principais notícias do mundo</span>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-between items-center border-b-4 border-black py-3 gap-4 mb-12">
          <div className="flex items-center gap-3 py-1">
            <span className="text-[10px] font-black uppercase tracking-tighter bg-black text-white px-2 py-0.5">Top Trends:</span>
            <div className="flex gap-4 overflow-x-auto no-scrollbar max-w-[500px]">
              {["IA", "Brasil", "Tech", "Global", "Economia"].map(t => (
                <span key={t} className="text-[10px] font-bold uppercase opacity-60 hover:opacity-100 cursor-default">#{t}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 text-xs uppercase font-black hover:scale-105 transition-transform">
              <Settings className="w-4 h-4" /> Personalizar Temas
            </button>
            <button onClick={curateNews} className="flex items-center gap-2 text-xs uppercase font-black hover:scale-105 transition-transform" disabled={isLoading}>
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} /> Re-editar Jornal
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12">
        <AnimatePresence mode="wait">
          {isLoading && news.length === 0 ? (
            <div className="py-40 text-center">
              <div className="relative inline-block mb-8">
                <Globe className="w-16 h-16 mx-auto animate-spin-slow opacity-20" />
                <Zap className="absolute top-0 right-0 w-6 h-6 animate-pulse text-red-700" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <p className="text-[10px] uppercase font-black tracking-widest">Preparando Notícias</p>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-black rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                  <span className="w-1 h-1 bg-black rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1 h-1 bg-black rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
              <div className="mt-6 h-1 w-64 mx-auto bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-black animate-[loading_2s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-9">
                {news.filter(n => n.featured).map(item => (
                  <article key={item.id} className="border-b border-gray-400 pb-12 mb-12">
                    <div className="flex flex-col lg:flex-row gap-10">
                      <div className="lg:w-7/12 order-2 lg:order-1">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="bg-red-700 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Manchete</span>
                          {item.isTrending && <span className="flex items-center gap-1 text-[9px] font-black uppercase text-orange-600"><Zap className="w-3 h-3" /> Em Alta</span>}
                        </div>
                        <h2 onClick={() => openArticle(item.id)} className="text-4xl md:text-6xl font-black leading-[1.05] mb-6 hover:underline cursor-pointer decoration-red-700/30 decoration-4">{item.title}</h2>
                        <p className="text-xl md:text-2xl leading-snug text-gray-800 mb-8 italic first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-black">{item.summary}</p>
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-600 border-t border-dotted border-gray-400 pt-6">
                          <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> {item.source} • {item.date}</span>
                          <div className="flex gap-4"><Share2 className="w-4 h-4 cursor-pointer" /><Bookmark className="w-4 h-4 cursor-pointer" /></div>
                        </div>
                      </div>
                      {item.image && (
                        <div className="lg:w-5/12 order-1 lg:order-2">
                          <div onClick={() => openArticle(item.id)} className="border border-black p-1 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group overflow-hidden relative cursor-pointer">
                            <img src={item.image} className="w-full transition-all duration-1000 group-hover:scale-105" />
                            <div className="absolute bottom-2 right-2 bg-black text-white text-[8px] px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Visualizar Original</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                  {news.filter(n => !n.featured).slice(0, 15).map((item, idx) => (
                    <article
                      key={item.id}
                      onClick={() => openArticle(item.id)}
                      className="flex flex-col group cursor-pointer"
                    >
                      {item.image && (
                        <div className="mb-6 border border-black p-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-40 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                          <img src={item.image} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase text-red-700 tracking-tighter">{item.category}</span>
                        <div className="h-px flex-1 bg-gray-300" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black leading-tight mb-4 hover:underline group-hover:text-red-900 transition-colors uppercase">{item.title}</h3>
                      <p className="text-base leading-relaxed text-gray-700 mb-6 flex-grow">{item.summary}</p>
                      <div className="flex justify-between items-center text-[11px] uppercase font-bold text-gray-400 pt-3 border-t border-black/10">
                        <span>{item.source}</span>
                        <span className="text-[10px]">{item.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-3 space-y-12">
                <section className="bg-white border-2 border-black p-6 relative">
                  <h4 className="flex items-center gap-2 text-[11px] uppercase font-black tracking-widest mb-6 border-b-2 border-black pb-4">
                    <Zap className="w-4 h-4 text-red-700" /> Buzz de Dados
                  </h4>
                  <div className="space-y-6">
                    {news.slice(15, 20).map(t => (
                      <div key={t.id} onClick={() => openArticle(t.id)} className="cursor-pointer group">
                        <div className="flex justify-between text-[11px] font-black text-gray-400 mb-1">
                          <span>{t.source}</span>
                          <span className="text-red-700">ALERT</span>
                        </div>
                        <p className="text-base font-bold leading-snug group-hover:underline italic">"{t.title}"</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-black text-white p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                  <h4 className="text-[11px] uppercase font-black tracking-widest mb-6 border-b border-white/20 pb-4">Análise IA: DNA</h4>
                  <div className="space-y-5">
                    {interests.slice(0, 4).map(i => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold uppercase">
                          <span>{i}</span>
                          <span className="text-red-500">{(Math.random() * 20 + 75).toFixed(0)}%</span>
                        </div>
                        <div className="h-1 bg-white/10 w-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }} className="h-full bg-red-700" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 border border-white/30 py-2 text-[10px] uppercase font-black hover:bg-white hover:text-black transition-all">Ver Relatório Completo</button>
                </section>
              </aside>
            </div>
          )}
        </AnimatePresence>

        {isLoadingMore && (
          <div className="py-12 text-center border-t border-gray-300 mt-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <p className="text-[10px] uppercase font-black tracking-widest">Carregando mais notícias</p>
            </div>
            <div className="h-1 w-48 mx-auto bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-black animate-[loading_2s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 md:px-12 mt-20 mb-8">
        <div className="border-t-2 border-black pt-6 flex justify-end">
          <span className="text-xs uppercase font-bold tracking-widest text-gray-500">
            Desenvolvido por <span className="text-black">Planora Apps</span>
          </span>
        </div>
      </footer>
    </>
  );
};

// Componente Principal do App
const App = () => {
  const [interests, setInterests] = useState(["Inteligência Artificial", "Cultura Geek", "Economia Digital"]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loadedSourcesCount, setLoadedSourcesCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const analyzeTrends = (allArticles) => {
    const termMap = {};
    const commonStopWords = ['da', 'do', 'em', 'para', 'com', 'no', 'na', 'um', 'uma', 'os', 'as', 'e', 'o', 'a', 'de'];

    allArticles.forEach(art => {
      const words = art.title.toLowerCase().split(/\W+/);
      words.forEach(word => {
        if (word.length > 3 && !commonStopWords.includes(word)) {
          termMap[word] = (termMap[word] || 0) + 1;
        }
      });
    });

    return allArticles.map(art => {
      const words = art.title.toLowerCase().split(/\W+/);
      let score = 0;
      words.forEach(word => {
        if (termMap[word] > 1) score += termMap[word];
      });

      return {
        ...art,
        relevance: Math.min(100, 70 + score),
        isTrending: score > 15
      };
    });
  };

  const curateNews = async () => {
    setIsLoading(true);
    try {
      const selectedSources = [...GLOBAL_SOURCES].sort(() => 0.5 - Math.random()).slice(0, 8);
      const allResults = [];

      for (let i = 0; i < selectedSources.length; i += 2) {
        const batch = selectedSources.slice(i, i + 2);
        const batchResults = await Promise.all(
          batch.map(async (source) => {
            try {
              const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`);
              const data = await response.json();

              if (data.status !== 'ok') return [];

              return data.items.map(item => {
                let imageUrl = item.enclosure?.link || item.thumbnail || "";

                if (!imageUrl || imageUrl.includes("feedburner")) {
                  const htmlContent = (item.description || "") + (item.content || "");
                  const imgMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
                  if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
                }

                // Gera um ID único baseado no link (hash simples)
                const generateId = (str) => {
                  let hash = 0;
                  for (let i = 0; i < str.length; i++) {
                    const char = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                  }
                  return Math.abs(hash).toString(36);
                };

                const articleId = generateId(item.link || item.guid || Math.random().toString());

                return {
                  id: articleId,
                  title: item.title,
                  summary: (item.description || "").replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim().slice(0, 180) + "...",
                  content: item.content || item.description || "Conteúdo não disponível.",
                  category: source.name,
                  author: item.author || source.name,
                  source: source.name,
                  time: new Date(item.pubDate || new Date()).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
                  date: new Date(item.pubDate || new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '-'),
                  link: item.link,
                  image: imageUrl || null,
                };
              });
            } catch (e) {
              return [];
            }
          })
        );
        allResults.push(...batchResults);
        if (i + 2 < selectedSources.length) await new Promise(r => setTimeout(r, 1500));
      }

      let flatNews = allResults.flat();

      const AD_KEYWORDS = [
        'oferta', 'promoção', 'desconto', 'cupom', 'barato', 'preço', 'comprar',
        'imperdível', 'liquidação', 'economize', 'custando', 'menor valor',
        'magalu', 'amazon', 'mercado livre', 'aliexpress', 'shopee', 'casas bahia'
      ];

      flatNews = flatNews.filter(art => {
        const contentToCheck = (art.title + " " + art.summary).toLowerCase();
        return !AD_KEYWORDS.some(keyword => contentToCheck.includes(keyword));
      });

      const seenTitles = new Set();
      flatNews = flatNews.filter(n => {
        const normalized = n.title.toLowerCase().trim();
        if (seenTitles.has(normalized)) return false;
        seenTitles.add(normalized);
        return true;
      });

      let analyzedNews = analyzeTrends(flatNews);

      if (analyzedNews.length === 0) {
        analyzedNews = [{
          id: 'error',
          title: "Aviso: Atraso na Entrega das Notícias",
          summary: "Não foi possível conectar com as agências. Tente atualizar em instantes.",
          content: "<p>Nossos sistemas de IA estão tentando restabelecer a conexão. Por favor, tente atualizar o jornal.</p>",
          category: "Sistema",
          relevance: 100,
          author: "Editor",
          source: "gazetta.news",
          time: "--:--",
          image: "https://images.unsplash.com/photo-1585829365234-781fcdb5c8be?auto=format&fit=crop&q=80&w=800",
          featured: true
        }];
      }

      analyzedNews.sort((a, b) => b.relevance - a.relevance);

      const headline = analyzedNews.find(n => n.image && !n.image.includes("unsplash")) || analyzedNews[0];
      analyzedNews = analyzedNews.map(n => ({
        ...n,
        featured: n.id === headline.id
      }));

      setNews(analyzedNews);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Erro geral na curadoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInterest = (theme) => {
    if (interests.includes(theme)) {
      setInterests(interests.filter(i => i !== theme));
    } else {
      setInterests([...interests, theme]);
    }
  };

  const loadMoreNews = async () => {
    if (isLoadingMore || loadedSourcesCount >= GLOBAL_SOURCES.length) return;

    setIsLoadingMore(true);
    try {
      const startIndex = loadedSourcesCount;
      const endIndex = Math.min(startIndex + 2, GLOBAL_SOURCES.length); // Reduzido para 2 fontes
      const moreSources = GLOBAL_SOURCES.slice(startIndex, endIndex);

      const allResults = [];

      // Processa uma fonte por vez
      for (let i = 0; i < moreSources.length; i++) {
        const source = moreSources[i];

        try {
          const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`);
          const data = await response.json();

          if (data.status !== 'ok') {
            console.warn(`Fonte ${source.name} falhou, pulando...`);
            continue;
          }

          const items = data.items.map(item => {
            let imageUrl = item.enclosure?.link || item.thumbnail || "";
            if (!imageUrl || imageUrl.includes("feedburner")) {
              const htmlContent = (item.description || "") + (item.content || "");
              const imgMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
            }

            const generateId = (str) => {
              let hash = 0;
              for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
              }
              return Math.abs(hash).toString(36);
            };

            const articleId = generateId(item.link || item.guid || Math.random().toString());

            return {
              id: articleId,
              title: item.title,
              summary: (item.description || "").replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim().slice(0, 180) + "...",
              content: item.content || item.description || "Conteúdo não disponível.",
              category: source.name,
              author: item.author || source.name,
              source: source.name,
              time: new Date(item.pubDate || new Date()).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
              date: new Date(item.pubDate || new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '-'),
              link: item.link,
              image: imageUrl || null,
            };
          });

          allResults.push(...items);

          // Delay apenas entre fontes, não antes da primeira
          if (i < moreSources.length - 1) {
            await new Promise(r => setTimeout(r, 2000));
          }
        } catch (e) {
          console.warn(`Erro ao carregar ${source.name}:`, e);
          continue;
        }
      }

      let flatNews = allResults;

      const AD_KEYWORDS = [
        'oferta', 'promoção', 'desconto', 'cupom', 'barato', 'preço', 'comprar',
        'imperdível', 'liquidação', 'economize', 'custando', 'menor valor',
        'magalu', 'amazon', 'mercado livre', 'aliexpress', 'shopee', 'casas bahia'
      ];

      flatNews = flatNews.filter(art => {
        const contentToCheck = (art.title + " " + art.summary).toLowerCase();
        return !AD_KEYWORDS.some(keyword => contentToCheck.includes(keyword));
      });

      const existingIds = new Set(news.map(n => n.id));
      flatNews = flatNews.filter(n => !existingIds.has(n.id));

      if (flatNews.length > 0) {
        const analyzedNews = analyzeTrends(flatNews);
        setNews(prevNews => [...prevNews, ...analyzedNews]);
      }

      setLoadedSourcesCount(endIndex);
    } catch (error) {
      console.error("Erro ao carregar mais notícias:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    curateNews();
    setLoadedSourcesCount(8); // Initial load uses 8 sources
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Detecta quando está a 100px do fim da página
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (!isLoadingMore && loadedSourcesCount < GLOBAL_SOURCES.length) {
          console.log('Carregando mais notícias...', { loadedSourcesCount, total: GLOBAL_SOURCES.length });
          loadMoreNews();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, loadedSourcesCount]);

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1a1a1a] font-serif relative overflow-x-hidden selection:bg-black selection:text-white pb-20">
      <div className="paper-texture" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-[1001]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isLoading ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ originX: 0 }}
      />

      <Routes>
        <Route path="/" element={
          <NewsList
            news={news}
            isLoading={isLoading}
            lastUpdate={lastUpdate}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            curateNews={curateNews}
            interests={interests}
            toggleInterest={toggleInterest}
            isLoadingMore={isLoadingMore}
          />
        } />
        <Route path="/article/:id" element={<ArticleView news={news} lastUpdate={lastUpdate} />} />
      </Routes>

      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-[#f4f1ea] border-4 border-black p-8 md:p-12 max-w-2xl w-full relative z-[2001] shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]">
              <button onClick={() => setShowSettings(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X className="w-8 h-8" /></button>
              <div className="flex items-center gap-4 mb-4">
                <Sparkles className="w-10 h-10" />
                <h2 className="newspaper-title text-5xl">Curadoria IA</h2>
              </div>
              <p className="text-gray-600 mb-10 italic">Selecione os focos de análise para o algoritmo de consenso global.</p>
              <div className="flex flex-wrap gap-2.5 mb-12">
                {[
                  "Inteligência Artificial", "Cultura Geek", "Economia Digital",
                  "Tecnologia", "Política Global", "Saúde", "Ciência"
                ].map(theme => (
                  <button key={theme} onClick={() => toggleInterest(theme)} className={cn("px-4 py-2 text-[10px] font-black uppercase border-2 transition-all", interests.includes(theme) ? "bg-black text-white border-black" : "border-black/20 hover:border-black")}>{theme}</button>
                ))}
              </div>
              <button onClick={() => { setShowSettings(false); curateNews(); }} className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.4em] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">Sincronizar Fontes Mundiais</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
