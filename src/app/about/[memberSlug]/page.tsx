import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Flag from "react-world-flags"; // Import the flag component

// Our detailed member data
const detailedProfiles = [
  {
    slug: "douglas-justice",
    fullName: "Douglas Justice",
    specialty: "Full-Stack Development & Database Design",
    bio: "Student at BYU-Idaho currently in WDD430. Passionate about crafting high-end web experiences.",
    summary: "As part of our development team, I focused on the site's overall structure and database. I spent most of my time making sure our login system was secure and that the data for our collections stayed organized and reliable.",
    email: "djustice@byupathway.edu",
    image: "/team/douglas.jpg",
    location: "Accra, Ghana",
    countryCode: "GH" // Use ISO code for the flag component
  },
  {
    slug: "quadri-kolawole-adisa",
    fullName: "Quadri Kolawole Adisa",
    specialty: "Frontend Finery & UI/UX",
    bio: "WDD430 student at BYU-Idaho. Expert in Tailwind CSS and artisan UI design.",
    summary: "I was responsible for how the site looks and feels. Using Tailwind CSS, I made sure the design was clean and easy to use on any device. My goal was to create a smooth experience that matches the high quality of the handmade items we show off.",
    email: "qadisa@byupathway.edu",
    image: "/team/quadri.jpg",
    location: "Ibadan, Nigeria",
    countryCode: "NG"
  },
  {
    slug: "chidiebere-jared-iheke-egu",
    fullName: "Chidiebere Jared Iheke Egu",
    specialty: "API Architecture & Backend Logic",
    bio: "WDD430 student at BYU-Idaho. Focused on the logic and security of the Artisan Vault.",
    summary: "I handled all the behind-the-scenes logic and built the main data connections for the site. My job was to make sure the database ran fast and that the feedback and review sections worked perfectly for every user.",
    email: "eguchidieberejared@gmail.com",
    image: "/team/jared.jpg",
    location: "Aba, Nigeria",
    countryCode: "NG"
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

  const nameParts = profile.fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 md:pt-32 pb-20 px-6 font-sans text-stone-900">
      <div className="max-w-5xl mx-auto">
        <Link href="/about" className="inline-block mb-8 md:mb-12 text-amber-600 font-black text-[10px] uppercase tracking-widest hover:-translate-x-1 transition-transform">
          ← Back to Team
        </Link>

        <section className="bg-transparent md:bg-white p-0 md:p-12 rounded-none md:rounded-[3rem] border-none md:border md:border-stone-100 shadow-none md:shadow-xl flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          
          <div className="w-full md:w-1/3 md:sticky md:top-32">
            <div className="relative h-96 md:h-96 rounded-4xl md:rounded-[2.5rem] overflow-hidden md:border-8 md:border-amber-50 md:shadow-inner">
              <Image 
                src={profile.image} 
                alt={profile.fullName} 
                width={600} 
                height={600} 
                className="w-full h-full object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#fafaf9] via-[#fafaf9]/20 to-transparent md:hidden pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 w-full">
            <header className="mb-6">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 leading-none">
                <span className="italic">{firstName}</span>{' '}
                <span className="text-amber-600 md:text-stone-900">{lastName}</span>
              </h1>
              <p className="text-stone-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px]">
                Full Stack Developer | BYU-Idaho WDD430
              </p>
            </header>

            {/* Fixed Location section using World Flags component */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex flex-col">
                <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Current Base</h3>
                <div className="flex items-center gap-3">
                  <Flag code={profile.countryCode} className="w-6 h-auto shadow-sm rounded-xs border border-stone-100" />
                  <p className="text-sm md:text-base font-bold text-stone-900">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-stone-600 leading-relaxed font-medium text-base md:text-lg mb-8 italic border-l-4 border-amber-100 pl-4">
              &quot;{profile.bio}&quot;
            </p>

            <div className="bg-white md:bg-[#fafaf9] p-6 md:p-8 rounded-4xl border border-stone-100 mb-10 shadow-sm md:shadow-none">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4">
                Professional Summary
              </h3>
              <p className="text-stone-500 leading-relaxed font-medium text-sm md:text-base">
                {profile.summary}
              </p>
            </div>
            
            <div className="border-t border-stone-200 md:border-stone-100 pt-8 pb-10">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">Secure Email Contact</h3>
              <a href={`mailto:${profile.email}`} className="text-lg md:text-xl font-bold text-stone-900 hover:text-amber-600 transition-colors break-all">
                {profile.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}