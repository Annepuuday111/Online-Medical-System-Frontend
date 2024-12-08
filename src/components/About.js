import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import './About.css';

const teamMembers = [
  {
    name: 'Suravarapu Deepthi',
    role: 'Team Leader',
    // description: 'Over 2 years of experience in project management.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQHjomuODBbp8g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693239261082?e=1738800000&v=beta&t=oS3V8mE9rg7tJZBrWU2wJkWEqcqyiYNJPqZpPkJpubg'
  },
  {
    name: 'Annepu Uday Kumar',
    role: 'Developer',
    // description: 'Expert in React and Node.js.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQFyI-RC9bJ_Lg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729528355577?e=1738800000&v=beta&t=RKauVQxDejrXsa_elAPb5LyYpqwAaiblp6roWb5X_2U'
  },
];

const whyChooseUs = [
  { title: 'Emergency Cases', description: 'We are available 24/7 to handle emergencies.' },
  { title: 'Modern Clinic', description: 'Equipped with the latest medical technology.' },
  { title: '24/7 Support', description: 'Always here to assist you with any inquiries.' },
  { title: 'Easy Online Appointment', description: 'Book appointments with just a few clicks.' },
  { title: 'Expert Doctors', description: 'Our team consists of experienced professionals.' },
  { title: '100% Secure', description: 'Your privacy and data security is our top priority.' },
];

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          About Us
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '40px' }}>
          We are a dedicated team committed to delivering quality services to our clients.
        </Typography>

        <div className="team-members">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="team-card"
            >
              <CardContent>
                <img src={member.image} alt={member.name} className="team-member-image" />
                <Typography variant="h6" sx={{ fontSize: 24, fontWeight: 'bold' }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', marginBottom: '8px' }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" sx={{ color: 'black', whiteSpace: 'pre-line' }}>
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outlined"
          sx={{ display: 'block', margin: '15px auto', marginTop: '40px' }}
          onClick={() => window.location.href = 'https://www.linkedin.com/in/annepu-uday-kumar-176583270/'}
        >
          Learn More About Us
        </Button>


        <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ marginTop: '60px' }}>
          Why Choose Us?
        </Typography>

        <div className="choose-us">
          {whyChooseUs.map((item, index) => (
            <Card
              key={index}
              className="choose-card"
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'black', marginTop: '8px' }}>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
