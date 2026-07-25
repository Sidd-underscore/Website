import { Icon } from "@/components/ui/icon";
import credits from "@/lib/hadestown-credits.json";

export function HadestownExperience() {
  return (
    <main className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden border-2 border-black bg-black p-6 text-white shadow-[8px_8px_0_#000] md:p-10">

        <div className="relative z-10 flex flex-col gap-6">
          <div className="uppercase w-fit border-2 border-black bg-[#FFE121] px-3 py-1 font-mono text-xs font-black text-black shadow-[4px_4px_0_#000]">
            Lincoln High School Drama Department Presents
          </div>
          <h1 className="chrome-text text-6xl leading-none tracking-normal md:text-8xl">
            <span className="font-black">HADES</span><span className="font-medium">TOWN</span>
          </h1>

        </div>
      </section>

      <section className="mt-10 aspect-video border-2 border-black bg-black p-6 text-white shadow-[8px_8px_0_#000]">
        <iframe className="w-full h-full" src="https://www.youtube.com/embed/-97NznlXvY0?si=ZLSddHW8bwHkSrwd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {credits.sections.map((section) => (
          <article className="card p-5" key={section.title}>
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
