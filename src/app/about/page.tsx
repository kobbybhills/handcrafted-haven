// src/app/about/page.tsx
import Image from 'next/image';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Douglas Justice",
      role: "Full Stack Developer",
      description: "Passionate about creating beautiful and responsive user interfaces.",
      image: "/team/douglas.jpg",        // ← change filename if different
    },
    {
      name: "Quadri Kolawole Adisa",
      role: "Full Stack Developer",
      description: "Focused on building scalable backend systems and seamless user experiences.",
      image: "/team/quadri.jpg",
    },
    {
      name: "Chidiebere Jared Iheke Egu",
      role: "Full Stack Developer",
      description: "Expert in database design and ensuring smooth data flow across the platform.",
      image: "/team/chidiebere.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-haven-cream py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-haven-dark-green mb-6">
            About Handcrafted Haven
          </h1>
          <p className="text-xl text-haven-terracotta max-w-2xl mx-auto">
            Connecting passionate artisans with buyers who appreciate unique, handmade treasures.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow p-10 mb-16">
          <h2 className="text-3xl font-semibold text-haven-dark-green mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            Handcrafted Haven was created to empower talented makers and artisans by giving them 
            a platform to showcase their creativity and connect directly with customers who value 
            authenticity and craftsmanship.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-haven-dark-green mb-10 text-center">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
              >
                {/* Real Image */}
                <div className="relative h-64 w-full bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-8 text-center">
                  <h3 className="text-2xl font-semibold text-haven-dark-green mb-2">
                    {member.name}
                  </h3>
                  <p className="bg-white rounded-2xl text-haven-terracotta font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center">
          <p className="text-gray-600 max-w-xl mx-auto">
            Thank you for being part of our journey. Every product sold helps support real artisans 
            and keeps traditional craftsmanship alive.
          </p>
        </div>
      </div>
    </main>
  );
}