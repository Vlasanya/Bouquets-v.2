import React from 'react';
import ContentLoader from "react-content-loader";

function Skeleton(props) {
  return (
    <ContentLoader 
    className='bouquet-block'
    speed={2}
    width={280}
    height={457}
    viewBox="0 0 280 457"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="5" rx="3" ry="3" width="260" height="260" /> 
    <rect x="0" y="420" rx="7" ry="7" width="109" height="27" /> 
    <rect x="178" y="409" rx="21" ry="21" width="97" height="42" /> 
    <rect x="31" y="277" rx="5" ry="5" width="211" height="25" /> 
    <rect x="0" y="310" rx="6" ry="6" width="280" height="72" />
  </ContentLoader>
  )
}

export default Skeleton;