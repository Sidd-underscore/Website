import { Icon } from "@/components/ui/icon";
import credits from "@/lib/hadestown-credits.json";

export function HadestownExperience() {
  return (
    <main className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden border-2 border-black bg-black p-6 text-white shadow-[8px_8px_0_#000] md:p-10">
        <div className="checker-surface absolute inset-0 opacity-20" />
        <Icon name="CircleStarFill" className="absolute top-5 right-5 size-20 invert opacity-50" />
        <Icon name="StarGlobe" className="absolute bottom-5 left-5 size-24 invert opacity-30" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="w-fit border-2 border-black bg-[#FFE121] px-3 py-1 font-mono text-xs font-black text-black shadow-[4px_4px_0_#000]">
            LHSMT / PRODUCTION ARCHIVE
          </div>
          <h1 className="chrome-text text-6xl leading-none font-black tracking-normal md:text-8xl">
            Hadestown
          </h1>
          <p className="max-w-3xl border-2 border-black bg-white p-4 text-lg font-black text-black shadow-[5px_5px_0_#000]">
            A production credit archive with chrome, neon, and backstage signal
            noise.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {credits.sections.map((section) => (
          <article className="y2k-card p-5" key={section.title}>
            <div className="mb-4 flex items-center gap-2 border-b-2 border-black pb-3">
              <Icon name="Sun" className="size-6" />
              <h2 className="text-2xl font-black uppercase tracking-normal">
                {section.title}
              </h2>
            </div>
            <ul className="flex flex-col gap-2 font-mono text-sm font-bold">
              {section.lines.map((line, index) =>
                line ? (
                  <li
                    className="border-l-4 border-[#FF80F2] bg-white/75 px-2 py-1"
                    key={`${section.title}-${line}`}
                  >
                    {line}
                  </li>
                ) : (
                  <li aria-hidden="true" className="h-2" key={`${section.title}-${index}`} />
                ),
              )}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
