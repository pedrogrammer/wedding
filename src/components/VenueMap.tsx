const venueMapEmbedUrl = 'https://neshan.org/maps/iframe/places/57d7b7add030962d8fff9daa2206b06c#c35.7227173-51.2433085-16z-0p/35.72271729999999/51.2433085'

export function VenueMap() {
  return <div className="venue-map" aria-label="نقشهٔ باغ تالار تهران در نشان" lang="fa">
    <iframe
      className="neshan-map"
      src={venueMapEmbedUrl}
      title="موقعیت باغ تالار تهران در نقشهٔ نشان"
      width="335"
      height="335"
      loading="lazy"
      allowFullScreen
    />
  </div>
}
