import Head from 'next/head'
import Image from 'next/image'
import { useEffect , useState } from 'react'
import styles from '../styles/Home.module.css'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )
};

export default function Home() {
  const [ ip , setIp] = useState('')
  const [ myLoc , setMyLoc] = useState()
  useEffect( () => {
    const FetchData = async () => {
      let myIp = await fetch('https://api.my-ip.io/ip.json')
      myIp = await myIp.json()
      setIp(myIp.ip)
      let ipInfo = await fetch(`https://ipinfo.io/${myIp.ip}?token=922b9f86046bc9`)
      ipInfo = await ipInfo.json()
      const loc = ipInfo.loc.split(",");
      setMyLoc({lat : Number(loc[0]),lng : Number(loc[1])})
      
    }
    FetchData()
  },[])
  
  return (
   <>
      {
     myLoc !== undefined ? (
      <>
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={myLoc}
        defaultZoom={13}
      >
        <AnyReactComponent
          lat={myLoc.lat}
          lng={myLoc.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
    </>
     )
     : ('')
   }
   </>
  )
}