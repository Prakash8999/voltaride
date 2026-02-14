import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WarrantyModal: FC<WarrantyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Warranty Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">
            We provide the following warranty coverage for our scooters:
          </p>

          <div className="bg-muted/20 p-4 rounded">
            <p className="font-semibold">Battery Warranty</p>
            <p className="text-sm">3 years warranty on the lithium battery against manufacturing defects.</p>
          </div>

          <div className="bg-muted/20 p-4 rounded">
            <p className="font-semibold">Overall Product Warranty</p>
            <p className="text-sm">1 year warranty on the scooter (parts and labour) from the date of purchase.</p>
          </div>

          <p className="text-xs text-muted-foreground">
            Warranty terms and conditions apply. For full details, contact our support or visit a service center.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarrantyModal;
