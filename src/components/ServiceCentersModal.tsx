import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ServiceCentersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceCentersModal = ({ isOpen, onClose }: ServiceCentersModalProps) => {
  if (!isOpen) return null;

  const serviceCenters = [
    {
      name: "Aerix Energy Service Center - Mumbai",
      address: "Office Number 205, Regency Plaza,Shanti Nagar, Nr Waldhuni Bridge,Ulhasnagar Mumbai 421004",
      phone: "+91 98765 43210",
      hours: "Mon-Sat: 9:00 AM - 7:00 PM"
    },
    {
      name: "Aerix Energy Service Center - Delhi",
      address: "456 Electric Avenue, Connaught Place, New Delhi - 110001",
      phone: "+91 98765 43211",
      hours: "Mon-Sat: 9:00 AM - 7:00 PM"
    },
    {
      name: "Aerix Energy Service Center - Bangalore",
      address: "789 Battery Street, Koramangala, Bangalore - 560034",
      phone: "+91 98765 43212",
      hours: "Mon-Sat: 9:00 AM - 7:00 PM"
    }
  ];
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
      <div className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">🏪 Service Centers</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-muted-foreground">
            Visit our authorized service centers for maintenance, repairs, and support for all Aerix Energy electric vehicles.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCenters.map((center, index) => (
              <div key={index} className="glass p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">{center.name}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <strong>Address:</strong><br />
                    {center.address}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Phone:</strong> {center.phone}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Hours:</strong> {center.hours}
                  </p>
                </div>
                <Button size="sm" className="w-full">
                  Get Directions
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Service available for all electric bikes and scooters. Walk-ins welcome!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCentersModal;