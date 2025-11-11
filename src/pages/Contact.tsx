import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, Wrench, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success("Message sent", { description: "We'll get back to you shortly." });
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            {/* Use a hard redirect to ensure we always leave /contact and land on the home page hash */}
            <Button
              variant="ghost"
              onClick={() => {
                // Using location.assign avoids React Router interpreting a relative hash
                window.location.assign("/#products");
              }}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left Info Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl overflow-hidden">
                <div className="sticky top-0 px-6 py-5 border-b border-border bg-background/80 backdrop-blur">
                  <h2 className="text-2xl font-bold gradient-text">📞 Contact Us</h2>
                  <p className="text-sm text-muted-foreground mt-2">Get in touch with our sales and service team for all your ElectroVive needs.</p>
                </div>
                <div className="p-6 space-y-6">
                  {/* Sales & Service */}
                  <div className="glass p-5 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-lg">Sales & Service</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span>Sales@electrovive.in</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <span>+91 7770000597</span>
                      </div>
                    </div>
                  </div>
                  {/* Service Information */}
                  <div className="glass p-5 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <Wrench className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-lg">Service Information</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Service for any electric bike is available here. We provide comprehensive maintenance, repairs, and support for all electric vehicles, not just ElectroVive models.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Battery Replacement','Motor Repair','Software Updates','General Maintenance'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                  {/* Hours */}
                  <div className="glass p-5 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Mon - Sat:</span><span>9:00 AM - 7:00 PM</span></div>
                      <div className="flex justify-between"><span>Sunday:</span><span>10:00 AM - 4:00 PM</span></div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">We typically respond within 24 hours. For urgent service requests, please call directly.</p>
                </div>
              </div>
            </div>
            {/* Right Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6 glass rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-2">Send Us a Message</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Subject of your message" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required className="min-h-[160px]" />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
