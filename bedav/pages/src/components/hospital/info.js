import React from 'react'
import styled from 'styled-components'
import PhoneIcon from '@material-ui/icons/Phone'
import PublicIcon from '@material-ui/icons/Public'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HospitalMap from './map'
import ContactInfo from './contactInfo'
import HospitalHeading from './hospitalHeading'

const StyledDiv = styled.div`
  //height: 90vh;
  padding: 0 5px; /*So that the box shadow of contact is visible*/
  box-sizing: border-box;
  order: 2;

  @media only screen and (max-width: 600px) {
    order: 1;
  }
`

const ContactContainer = styled.div`
  margin-top: 20px;
`

const StyledHeading = styled(HospitalHeading)`
  display: none;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`

function ContactInfoContainer(props) {
  const {hospital} = props
  const mapsURL = `https://www.google.com/maps/dir/?api=1&destination_place_id=${hospital.placeId}&destination=${hospital.latitude},${hospital.longitude}`

  const contact = []

  if(hospital.phone) {
    contact.push({
      icon: PhoneIcon,
      value: <a href={`tel:${hospital.phone}`} target="_blank">{hospital.phone}</a>
    })
  }

  if(hospital.website) {
    contact.push({
      icon: PublicIcon,
      value: <a href={hospital.website} target="_blank" style={{wordBreak: "break-all"}}>{`${hospital.name} (${hospital.website})`}</a>
    })
  }

  if(hospital.address) {
    contact.push({
      icon: LocationOnIcon,
      value: <a href={mapsURL} target="_blank">{hospital.address}</a>
    })
  }

  const contactItems = contact.map((item, index) => item.value ? <ContactInfo key={index} icon={item.icon}>{item.value}</ContactInfo> : null)

  return (
    <StyledDiv>
      <StyledHeading hospital={hospital} />
      <HospitalMap lat={hospital.latitude} lon={hospital.longitude} name={hospital.name} url={mapsURL || null}/>
      <ContactContainer>
        {contactItems}
      </ContactContainer>
    </StyledDiv>
  )
}

export default ContactInfoContainer 
