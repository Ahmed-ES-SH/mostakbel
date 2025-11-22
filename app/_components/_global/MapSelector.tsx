"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface Props {
  initialLocation: Location | null;
  setLocation: (loc: Location) => void;
  showMap: boolean;
  onClose: () => void;
  locale: "en" | "ar" | "nl";
}

// 📍 الموقع الافتراضي (دمشق - سوريا)
const defaultLocation: Location = {
  lat: 33.5138,
  lng: 36.2765,
  address: "دمشق - سوريا",
};

// 🔧 إصلاح أيقونات Leaflet
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// 🗺️ مكون يلتقط النقر على الخريطة لتحديث الموقع
function LocationMarker({
  setLocation,
  setLocalLocation,
}: {
  setLocation: (loc: Location) => void;
  setLocalLocation: (loc: Location) => void;
}) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        const newLoc: Location = {
          lat,
          lng,
          address: data.display_name || "موقع غير معروف",
        };

        setLocalLocation(newLoc);
        setLocation(newLoc);
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        const fallback = { ...defaultLocation };
        setLocalLocation(fallback);
        setLocation(fallback);
      }
    },
  });
  return null;
}

// 🧭 مكون لتركيز الخريطة على الموقع الجديد
function MapFocus({ location }: { location: Location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 13, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
}

export default function MapSelector({
  initialLocation,
  setLocation,
  showMap,
  onClose,
  locale,
}: Props) {
  // ✅ التحقق من صلاحية initialLocation
  const isValidLocation =
    initialLocation &&
    typeof initialLocation.lat === "number" &&
    typeof initialLocation.lng === "number";

  const [location, setLocalLocation] = useState<Location>(
    isValidLocation ? initialLocation! : defaultLocation
  );

  // 📍 إذا لم يكن الموقع صالحًا نحاول تحديد الموقع الجغرافي
  useEffect(() => {
    if (!isValidLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await res.json();
              const newLoc: Location = {
                lat: latitude,
                lng: longitude,
                address: data.display_name || defaultLocation.address,
              };
              setLocalLocation(newLoc);
              setLocation(newLoc);
            } catch {
              setLocalLocation(defaultLocation);
              setLocation(defaultLocation);
            }
          },
          () => {
            setLocalLocation(defaultLocation);
            setLocation(defaultLocation);
          }
        );
      } else {
        setLocalLocation(defaultLocation);
        setLocation(defaultLocation);
      }
    }
  }, [isValidLocation, setLocation]);

  return (
    <AnimatePresence>
      {showMap && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="fixed w-full h-screen px-4 z-99999 top-0 left-0 bg-black/50 backdrop-blur-md flex items-center justify-center"
        >
          <div className="bg-white w-4xl p-2 rounded-md shadow-lg border border-gray-300">
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={13}
              className="h-[500px] w-full rounded-2xl shadow-md outline-none"
            >
              <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[location.lat, location.lng]}>
                <Popup>
                  {location.address ||
                    (locale === "ar" ? "موقعك الحالي" : "Your location")}
                </Popup>
              </Marker>

              <MapFocus location={location} />

              <LocationMarker
                setLocation={setLocation}
                setLocalLocation={setLocalLocation}
              />
            </MapContainer>

            <div
              onClick={onClose}
              className="flex items-center w-fit cursor-pointer gap-1 bg-red-500 text-white px-3 py-2 rounded-md shadow mt-4 hover:bg-red-600 hover:scale-105 transition-all duration-200"
            >
              <p>{locale === "ar" ? "إغلاق" : "Close"}</p>
              <IoMdClose className="ml-1 size-5" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
