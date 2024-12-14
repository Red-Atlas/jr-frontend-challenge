import { FC } from 'react'

const Details: FC<{ owner: { name: string; contact: string } }> = ({
  owner,
}) => {
  return (
    <div className="contentOwnerDetail">
      <p className="textOwnerDetail">Datos del dueño:</p>
      <div className="contentinfoOwner">
        <p className="ownerNameDetail">{owner.name}</p>
        <p className="ownerContactDetail">{owner.contact}</p>
      </div>
    </div>
  )
}

export default Details
