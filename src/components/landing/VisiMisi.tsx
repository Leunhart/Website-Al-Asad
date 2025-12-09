export default function VisiMisi() {
  return (
    <section id="visi-misi" className="px-6 max-w-6xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="p-8 rounded-xl border border-foreground/15 bg-foreground/5">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-foreground/15 grid place-items-center text-2xl mb-3">
              👁️
            </div>
            <h3 className="text-2xl font-bold mb-4">Visi</h3>
          </div>
          <p className="text-base leading-relaxed opacity-90">
            Menjadi akademi panahan terdepan yang melahirkan atlet-atlet 
            berprestasi dan berkarakter, serta berkontribusi dalam 
            mengembangkan olahraga panahan di Indonesia.
          </p>
        </div>
        <div className="p-8 rounded-xl border border-foreground/15 bg-foreground/5">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-foreground/15 grid place-items-center text-2xl mb-3">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-4">Misi</h3>
          </div>
          <ul className="space-y-3 text-base leading-relaxed opacity-90">
            <li className="flex gap-2">
              <span className="text-foreground/60 font-bold">•</span>
              <span>Memberikan pembinaan berkualitas dengan metode latihan yang terstruktur</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground/60 font-bold">•</span>
              <span>Membangun karakter atlet yang disiplin, sportif, dan percaya diri</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground/60 font-bold">•</span>
              <span>Mencetak atlet berprestasi di tingkat daerah dan nasional</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground/60 font-bold">•</span>
              <span>Menciptakan lingkungan latihan yang positif dan suportif</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
