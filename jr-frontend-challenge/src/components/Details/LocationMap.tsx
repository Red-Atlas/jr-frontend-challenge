import { FC } from 'react'

const Details: FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  return (
    <div className="locationMap">
      <iframe
        src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default Details
