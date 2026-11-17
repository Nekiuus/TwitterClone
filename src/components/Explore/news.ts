export type NewsCategory = 'Trending' | 'News' | 'Sports' | 'Entertainment'

export interface NewsItem {
  title: string
  summary: string
  source: string
  date: string
  url: string
}

const search = (terms: string) =>
  `https://news.google.com/search?q=${encodeURIComponent(terms)}&hl=es-419&gl=CO&ceid=CO%3Aes-419`

export const newsByCategory: Record<NewsCategory, NewsItem[]> = {
  Trending: [
    {
      title: 'Thunder vs. Kings entre las búsquedas en tendencia',
      summary: 'El partido de la NBA aparece entre las consultas recientes de Google Trends Colombia.',
      source: 'Google Trends Colombia',
      date: '2026-11-15',
      url: 'https://trends.google.com/trending?geo=CO',
    },
  ],
  News: [
    {
      title: 'Rescatan los cuerpos de tres mineros tras dos emergencias en Colombia',
      summary: 'AP informa del hallazgo de tres trabajadores después de dos incidentes mineros en el centro del país.',
      source: 'AP News',
      date: '2026-11-15',
      url: search('AP News tres mineros Colombia dos desastres noviembre 15 2026'),
    },
  ],
  Sports: [
    {
      title: 'Colombia logra ocho medallas en los Juegos Olímpicos de la Juventud',
      summary: 'La delegación nacional cerró con una participación histórica en Dakar 2026.',
      source: 'El País',
      date: '2026-11-15',
      url: search('Colombia ocho medallas Dakar 2026 Juegos Olímpicos Juventud'),
    },
  ],
  Entertainment: [
    {
      title: 'Shakira prepara su regreso a Venezuela después de 16 años',
      summary: 'La noticia se relaciona con una parada de su gira mundial Las Mujeres Ya No Lloran.',
      source: 'Noticias Argentinas',
      date: '2026-11-15',
      url: search('Shakira Venezuela 16 años gira noviembre 2026 Noticias Argentinas'),
    },
  ],
}
