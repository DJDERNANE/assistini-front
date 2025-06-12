import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Icons, Images } from "../../constants";
import CustomButton from "../custom/CustomButton";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import icons from "../../constants/icons";

const customIcon = L.icon({
  iconUrl: icons.locationBlue,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const CardMap = ({ data, selectedLocation = [] }) => {
  const { t } = useTranslation("search");

  const ChangeMapCenter = ({ center }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  };

  return (
    <Card borderRadius={"xl"} className="h-full">
      <CardBody className="">
        <MapContainer
          center={[36.753836, 3.04760565]}
          zoom={13}
          style={{ height: "100%", borderRadius: "12px" }}
        >
          {selectedLocation && selectedLocation.length > 0 && (
            <ChangeMapCenter center={selectedLocation} />
          )}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.map((position, index) => (
            <Marker
              key={index}
              position={[position.lat, position.lng]}
              icon={customIcon}
            >
              <Popup>{position.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardBody>
    </Card>
  );
};

export default CardMap;
