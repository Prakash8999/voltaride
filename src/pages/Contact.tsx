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
    honeypot: "",
  });

  // ---------------- VALIDATION ----------------
  const validate = () => {
    if (formData.name.trim().length < 2) {
      toast.error("Enter a valid name.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Enter a valid email.");
      return false;
    }

    if (!/^[\+]?[1-9][\d]{9,14}$/.test(formData.phone)) {
      toast.error("Enter a valid phone number.");
      return false;
    }

    if (formData.subject.trim().length < 5) {
      toast.error("Subject must be at least 5 characters.");
      return false;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return false;
    }

    return true;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        type: "contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        honeypot: formData.honeypot,
      };

      const res = await fetch(`${import.meta.env.VITE_EMAIL_API}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send message.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Message sent!", {
        description: "We'll get back to you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => window.location.assign("/#products")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* LEFT INFO PANEL */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl overflow-hidden">
                <div className="sticky top-0 px-6 py-5 border-b border-border bg-background/80 backdrop-blur">
                  <h2 className="text-2xl font-bold gradient-text">📞 Contact Us</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Get in touch with our sales and service team.
                  </p>
                </div>

                <div className="p-6 space-y-6">
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

                  <div className="glass p-5 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <Wrench className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-lg">Service Information</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maintenance, repairs & EV support for all bikes.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Battery Replacement",
                        "Motor Repair",
                        "Software Updates",
                        "General Maintenance",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass p-5 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Mon - Sat:</span>
                        <span>9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    We usually respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6 glass rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-2">Send Us a Message</h3>

                {/* Honeypot input */}
                <input
                  type="text"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  autoComplete="off"
                  tabIndex={-1}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Message subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message..."
                    className="min-h-[160px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
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
