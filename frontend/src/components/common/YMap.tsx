import React, { useEffect, useState } from 'react';
import { YMaps, Placemark, Map } from 'react-yandex-maps';

interface YMapProps {
  lat: number;
  lon: number;
  currentId?: string;
  name: string;
  onClick?: (point) => void;
  points?: {x: number, y:number, id: string, name: string}[];
  height?: string | number;
  width?: string | number;
}

function YMap(props: YMapProps) {
  const points = props.points || [];
  if (props.lat && props.lon) {
    points.push({
      x: props.lat, y: props.lon, id: props.currentId, name: props.name
    });
  }
  return (
    <YMaps>
      <Map style={{ height: props.height, width: props.width }} state={{ zoom: 12, center: [props.lat || 55.751999, props.lon || 37.617734] }}>
        {points.map((point, key) => {
          return (
            <Placemark
              key={key}
              options={{
                preset: props.currentId === point.id ? 'islands#redIcon' : 'islands#nightIcon'
              }}
              properties={{
                iconCaption: point.name,
              }}
              instanceRef={inst => {
                inst?.events?.add('click', () => {
                  if (props.onClick) {
                    props.onClick(point);
                  }
                });
              }}
              geometry={[point.x, point.y]}
            />
          );
        })}
      </Map>
    </YMaps>
  );
}

export default YMap;
