"use client";
import { Location } from "./types";
import MapSelector from "../../_global/MapSelector";
import { Modal } from "./Modal";

interface MapModalProps {
  show: boolean;
  onClose: () => void;
  location: Location;
  setLocation: (location: Location) => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  show,
  onClose,
  location,
  setLocation,
}) => {
  return (
    <Modal show={show} onClose={onClose} title="Select Location">
      <div className="p-4">
        <MapSelector
          initialLocation={location}
          setLocation={setLocation}
          showMap={show}
          onClose={onClose}
          locale="en"
        />
      </div>
    </Modal>
  );
};
