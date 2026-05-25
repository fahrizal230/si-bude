import { Link, Route, Routes, useParams } from 'react-router'
import mapelData from './data/mapel.json'

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-sky-50 to-emerald-50 px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-amber-100 md:p-10">
          <p className="mb-3 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
            🌟 Ruang Belajar Anak
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl">
            Belajar jadi lebih ceria, ringan, dan mudah dipahami.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Pilih mata pelajaran, lalu tonton video, baca materi singkat, dan lihat ilustrasi yang membantu memahami pelajaran.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mapelData.map((mapel) => (
            <Link
              key={mapel.id}
              to={`/${mapel.slug}`}
              className="group rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-3xl transition group-hover:scale-105">
                {mapel.emoji}
              </div>

              <h2 className="text-2xl font-extrabold text-slate-800">
                {mapel.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {mapel.description}
              </p>

              <p className="mt-5 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                {mapel.pages.length} halaman belajar →
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}

function MapelIndex() {
  const { mapelSlug } = useParams()
  const mapel = mapelData.find((item) => item.slug === mapelSlug)

  if (!mapel) {
    return <NotFound />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50 px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-100 hover:text-sky-700"
        >
          ← Kembali ke semua mapel
        </Link>

        <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-sky-100 md:p-10">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-3xl">
            {mapel.emoji}
          </div>

          <h1 className="text-4xl font-extrabold text-slate-800 md:text-5xl">
            {mapel.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {mapel.description}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {mapel.pages.map((page) => (
            <Link
              key={page.id}
              to={`/${mapel.slug}/${page.id}`}
              className="group rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-extrabold text-amber-700">
                Halaman {page.id}
              </p>

              <h2 className="text-2xl font-extrabold text-slate-800">
                {page.title}
              </h2>

              <p className="mt-3 line-clamp-2 leading-7 text-slate-600">
                {page.text}
              </p>

              <p className="mt-5 font-extrabold text-sky-700 group-hover:text-sky-900">
                Mulai belajar →
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}

function MapelPage() {
  const { mapelSlug, pageId } = useParams()

  const mapel = mapelData.find((item) => item.slug === mapelSlug)
  const page = mapel?.pages.find((item) => item.id === Number(pageId))

  if (!mapel || !page) {
    return <NotFound />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-100 hover:text-sky-700"
          >
            ← Home
          </Link>

          <Link
            to={`/${mapel.slug}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-100 hover:text-sky-700"
          >
            {mapel.title}
          </Link>
        </nav>

        {/* 1. Judul */}
        <header className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-amber-100 md:p-8">
          <p className="mb-3 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-extrabold text-sky-700">
            {mapel.emoji} Halaman {page.id}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl">
            {page.title}
          </h1>
        </header>

        {/* 2. Video */}
        <section className="mb-6 overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100 md:p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-xl">
              ▶️
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                Video Pembelajaran
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                Tonton video ini sebelum membaca cerita.
              </p>
            </div>
          </div>

          <video
            controls
            poster={page.poster}
            className="aspect-video w-full rounded-[1.5rem] bg-slate-100 object-cover"
          >
            <source src={page.video} type="video/mp4" />
            Browser kamu belum mendukung video.
          </video>
        </section>

        {/* 3. Ilustrasi */}
        <section className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-xl">
              🖼️
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                Ilustrasi Cerita
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                Perhatikan gambar agar lebih mudah memahami isi bacaan.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {page.illustrations.map((image, index) => (
              <figure
                key={index}
                className="overflow-hidden rounded-[1.5rem] bg-slate-50 shadow-sm ring-1 ring-slate-100"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-video w-full object-cover"
                />

                <figcaption className="p-4 text-base font-bold leading-7 text-slate-600">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 4. Bacaan */}
        <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
              📖
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                Bacaan Cerita
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                Baca pelan-pelan dan pahami isi ceritanya.
              </p>
            </div>
          </div>

          <article className="rounded-[1.5rem] bg-amber-50 p-5 md:p-7">
            <p className="text-xl font-semibold leading-10 text-slate-700">
              {page.text}
            </p>
          </article>
        </section>

        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="mb-4 text-lg font-extrabold text-slate-800">
            Pilih halaman lainnya
          </h2>

          <div className="flex flex-wrap gap-3">
            {mapel.pages.map((item) => (
              <Link
                key={item.id}
                to={`/${mapel.slug}/${item.id}`}
                className={`rounded-full px-5 py-3 text-sm font-extrabold transition ${
                  item.id === page.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                }`}
              >
                {item.id}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-amber-50 px-5">
      <div className="max-w-md rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-amber-100">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-rose-100 text-4xl">
          🧐
        </div>

        <h1 className="text-4xl font-extrabold text-slate-800">
          Halaman tidak ditemukan
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          Sepertinya halaman ini belum tersedia.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 font-extrabold text-white hover:bg-sky-700"
        >
          Kembali ke Home
        </Link>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:mapelSlug" element={<MapelIndex />} />
      <Route path="/:mapelSlug/:pageId" element={<MapelPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}