export default function MissionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Mission</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-lg">
          Our goal at Dublin Sports Mentor is simple: to introduce Dubliners and expats to integrate sports into their
          lives.
        </p>

        <p className="text-lg">
          We're delighted to work with all sections of the community, making sports accessible, inclusive, and an
          essential part of everyday life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          <div className="bg-primary/10 rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">833</h3>
            <p className="text-lg">People introduced so far</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">14,167</h3>
            <p className="text-lg">Remaining to reach 1% of Dublin</p>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-8 my-10">
          <p className="text-lg">
            We bring together top-tier coaches, experts, and teachers who are not only highly skilled but also
            passionate about spending quality time with you — helping you grow, thrive, and ultimately unleash your
            inner champion. Because it's never too late to pick up a sport.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">Our Approach</h2>
        <p className="text-lg">
          At Dublin Sports Mentor, we believe that sports should be accessible to everyone, regardless of age,
          background, or experience level. Our approach is centered around creating a supportive, inclusive environment
          where individuals can discover and develop their athletic potential.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Community Impact</h2>
        <p className="text-lg">
          Beyond individual coaching, we're committed to making a positive impact on the Dublin community as a whole. By
          introducing more people to sports, we're helping to create a healthier, more connected city where people come
          together through shared activities and experiences.
        </p>
      </div>
    </div>
  )
}

