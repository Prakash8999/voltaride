import { Button } from "@/components/ui/button";
import { X, Mail, Phone, Wrench } from "lucide-react";
import { useEffect } from "react";

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsModal = ({ isOpen, onClose }: ContactUsModalProps) => {
  if (!isOpen) return null;
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">📞 Contact Us</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-muted-foreground">
            Get in touch with our sales and service team for all your ElectroVive needs.
          </p>

          <div className="space-y-6">
            {/* Sales Contact */}
            <div className="glass p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg">Sales & Service</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Sales@electrovive.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">+91 7770000597</span>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="glass p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <Wrench className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg">Service Information</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Service for any electric bike is available here. We provide comprehensive maintenance,
                repairs, and support for all electric vehicles, not just ElectroVive models.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Battery Replacement
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Motor Repair
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Software Updates
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  General Maintenance
                </span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              We typically respond within 24 hours. For urgent service requests, please call directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsModal;