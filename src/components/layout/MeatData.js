import React from 'react'
import Halmet from 'react-helmet'
function MeatData({title}) {
  return (
    <Halmet>
        <title>{title}</title>
    </Halmet>
  )
}

export default MeatData
