import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// This is where I put our team info
const detailedProfiles = [
  {
    slug: "douglas-justice",
    fullName: "Douglas Justice",
    specialty: "Full-Stack Development & Database Design",
    bio: "Student at BYU-Idaho currently in WDD430. Passionate about crafting high-end web experiences.",
    summary: "As part of our development team, I focused on the site's overall structure and database. I spent most of my time making sure our login system was secure and that the data for our collections stayed organized and reliable.",
    email: "djustice@byupathway.edu",
    image: "/team/douglas.jpg",
  },
  {
    slug: "quadri-kolawole-adisa",
    fullName: "Quadri Kolawole Adisa",
    specialty: "Frontend Finery & UI/UX",
    bio: "WDD430 student at BYU-Idaho. Expert in Tailwind CSS and artisan UI design.",
    summary: "I was responsible for how the site looks and feels. Using Tailwind CSS, I made sure the design was clean and easy to use on any device. My goal was to create a smooth experience that matches the high quality of the handmade items we show off.",
    email: "qadisa@byupathway.edu",
    image: "/team/quadri.jpg",
  },
  {
    slug: "chidiebere-jared-iheke-egu",
    fullName: "Chidiebere Jared Iheke Egu",
    specialty: "API Architecture & Backend Logic",
    bio: "WDD430 student at BYU-Idaho. Focused on the logic and security of the Artisan Vault.",
    summary: "I handled all the behind-the-scenes logic and built the main data connections for the site. My job was to make sure the database ran fast and that the feedback and review sections worked perfectly for every user.",
    email: "eguchidieberejared@gmail.com",
    image: "/team/jared.jpg",
  }
];

interface Props {
  params: Promise<{ memberSlug: string }>;
}

export default async function CuratorProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const profile = detailedProfiles.find((p) => p.slug === resolvedParams.memberSlug);

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-32 pb-20 px-6 font-sans text-stone-900">
      <div className="max-w-5xl mx-auto">
        <Link href="/about" className="inline-block mb-12 text-amber-600 font-black text-[10px] uppercase tracking-widest hover:-translate-x-1 transition-transform">
          ← Back to Team
        </Link>

        <section className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-xl flex flex-col md:flex-row gap-12 items-start">
          {/* Photo Section */}
          <div className="w-full md:w-1/3 sticky top-32">
            <div className="h-96 rounded-[2.5rem] overflow-hidden border-10 border-amber-50 shadow-inner">
              <Image 
                src={profile.image} 
                alt={profile.fullName} 
                width={600} 
                height={600} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <header className="mb-6">
              <h1 className="text-5xl font-black tracking-tighter mb-2 italic">{profile.fullName}</h1>
              <p className="text-stone-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                Full Stack Developer | BYU-Idaho WDD430
              </p>
            </header>

            <p className="text-stone-600 leading-relaxed font-medium text-lg mb-8 italic">
              &quot;{profile.bio}&quot;
            </p>

            {/* Professional Summary Box - This fills the highlighted empty part */}
            <div className="bg-[#fafaf9] p-8 rounded-4xl border border-stone-100 mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4">
                Professional Summary
              </h3>
              <p className="text-stone-500 leading-relaxed font-medium">
                {profile.summary}
              </p>
            </div>
            
            <div className="border-t border-stone-100 pt-8">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">Secure Email Contact</h3>
              <a href={`mailto:${profile.email}`} className="text-xl font-bold text-stone-900 hover:text-amber-600 transition-colors">
                {profile.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}