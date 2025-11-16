"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../../_helpers/fixLeafletIcon";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

export function MapSection({ location }: { location: Location }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // موقع افتراضي (وسط سوريا)
  const DEFAULT_LOCATION = {
    lat: 34.8021,
    lng: 38.9968,
    address: "Syria (Default Center)",
  };

  // التحقق من صحة البيانات
  const validLocation =
    location &&
    typeof location.lat === "number" &&
    typeof location.lng === "number" &&
    !isNaN(location.lat) &&
    !isNaN(location.lng)
      ? location
      : DEFAULT_LOCATION;

  useEffect(() => {
    if (!mapRef.current) return;

    // عند تغيير الموقع يتم إعادة إنشاء الخريطة
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView(
      [validLocation.lat, validLocation.lng],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    L.marker([validLocation.lat, validLocation.lng])
      .addTo(map)
      .bindPopup(validLocation.address)
      .openPopup();

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [validLocation.lat, validLocation.lng]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-2xl flex-1 overflow-hidden shadow-sm border border-gray-200 h-96"
      ref={mapRef}
    />
  );
}
