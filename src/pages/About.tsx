import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  const short = "Aerix Energy builds smart, made-in-India electric scooters with IP67 motors and advanced lithium batteries — no license required for riders.";

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <section className="max-w-3xl mx-auto space-y-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4">About Aerix Energy</h1>
              <p className="text-lg text-muted-foreground mb-4">{short}</p>

              <p className="mb-4">At Aerix Energy, we’re redefining the future of urban mobility — one electric ride at a time. Born from a vision to create a clean, smart, and connected world, Aerix Energy brings together cutting-edge EV technology, intelligent design, and sustainable performance to power the next generation of riders.</p>

              <p className="mb-4">Our scooters aren’t just electric — they’re engineered for life. With IP67 waterproof motors, Smart Wireless Controllers (IP64), and advanced lithium battery systems, every model delivers reliability, comfort, and innovation. Whether it’s the daily commute or weekend adventure, Aerix Energy ensures your journey is always smooth, powerful, and eco-conscious.</p>

              <p className="mb-4">Built with a Made-in-India spirit and global quality standards, we’re committed to empowering riders with smarter mobility choices that reduce emissions, save costs, and enhance everyday living. At Aerix Energy, electricity meets vitality — because we believe mobility should be more than movement; it should be a statement of progress.</p>

              <h3 className="font-semibold mt-6">Our Mission</h3>
              <p className="text-sm text-muted-foreground mb-3">To make sustainable mobility accessible, intelligent, and inspiring — driving India toward a cleaner and electrified future.</p>

              <h3 className="font-semibold">Our Vision</h3>
              <p className="text-sm text-muted-foreground mb-3">To be the most trusted name in electric mobility by delivering technology that empowers and designs that excite.</p>

              <h3 className="font-semibold">Our Promise</h3>
              <p className="text-sm text-muted-foreground">Innovation, quality, and sustainability in every ride — with performance you can feel and responsibility you can be proud of.</p>
            </div>
          </section>

          {/* Contact card appears last */}
          <div className="mt-10 flex justify-center">
            <div className="glass rounded-2xl p-6 max-w-md w-full">
              <h4 className="font-semibold mb-3 text-center">Contact</h4>
              <p className="text-sm text-muted-foreground mb-2 text-center">sanjeet@aerixenergy.com</p>
              <p className="text-sm text-muted-foreground mb-4 text-center">+91 7770000597</p>
              <div className="flex justify-center">
                <Button onClick={() => window.location.href = '/contact'}>Contact Us</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
