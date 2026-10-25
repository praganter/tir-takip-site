# Tır Sıra Takip web sitesi

https://tirsiratakip.com, GitHub Pages ile `main` dalının kökünden yayınlanır. Derleme adımı yok, düz HTML/CSS.

- `index.html` Türkçe, `en/index.html` İngilizce: ayrı adresler SEO için (hreflang). Bir metni değiştirince ikisini de güncelle; SSS'yi değiştirirsen sayfadaki JSON-LD (FAQPage) kopyasını da.
- `privacy.html`, `terms.html` iki dilli, `lang.js` ile dil seçer (`?lang=tr|en`).
- Sayfa eklersen `sitemap.xml`'e de ekle.
