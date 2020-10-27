import React from "react";
import Helmet from "react-helmet";

function Metadata() {
  return (
    <Helmet>
      {/*<!-- HTML Meta Tags -->*/}
      <title>Bedav - Find hospital beds for COVID Patients</title>
      <meta name="description" content="Find hospital bed availability for COVID Patients across India. Currently available for major cities in Karnataka, Maharashtra, Andhra Pradesh."/>
      {/*<!-- Google / Search Engine Tags -->*/}
      <meta itemProp="name" content="Bedav - Find hospital beds for COVID Patients"/>
      <meta itemProp="description" content="Find hospital bed availability for COVID Patients across India. Currently available for major cities in Karnataka, Maharashtra, Andhra Pradesh."/>
      <meta itemProp="image" content="https://www.1-more-thing.com/wp-content/uploads/2020/04/modified.png"/>
      {/*<!-- Facebook Meta Tags -->*/}
      <meta property="og:url" content="https://bedav.org"/>
      <meta property="og:type" content="website"/>
      <meta property="og:title" content="Bedav - Find hospital beds for COVID Patients"/>
      <meta property="og:description" content="Find hospital bed availability for COVID Patients across India. Currently available for major cities in Karnataka, Maharashtra, Andhra Pradesh."/>
      <meta property="og:image" content="https://www.1-more-thing.com/wp-content/uploads/2020/04/modified.png"/>
      {/*}<!-- Twitter Meta Tags -->*/}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="Bedav - Find hospital beds for COVID Patients"/>
      <meta name="twitter:description" content="Find hospital bed availability for COVID Patients across India. Currently available for major cities in Karnataka, Maharashtra, Andhra Pradesh."/>
      <meta name="twitter:image" content="https://www.1-more-thing.com/wp-content/uploads/2020/04/modified.png"/>
    </Helmet>
  )
}

export default Metadata