import { FC } from 'react'
import { formatDate } from '../../utils/formatDate'

const Details: FC<{ label: string; date: string }> = ({ label, date }) => {
  return (
    <div className="contentdateDetail">
      <p className="textDetail">{label}</p>
      <p className="dateDetail">{formatDate(date)}</p>
    </div>
  )
}

export default Details
