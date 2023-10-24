import React from 'react'
import { developer, fb, linkedin, gith, acc, Mail} from '../assets'

import { useNavigate  } from 'react-router-dom';
const DeveloperPage = () => {
  const teamMembers = [
    {
      name: 'Asma',
      role: 'Frontend Developer',
      image: acc,
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/asma-mughal-36b341244',
        github: 'https://github.com/asma-mughal',
        mail: 'asmamughal097@gmail.com',
      },
    },
    {
      name: 'Muhammad Saif Ul Azeem',
      role: 'Project Manager/Backend Developer',
      image: developer,
      socialLinks: {
        github: 'https://github.com/saifulazeem/',
        linkedin: 'https://pk.linkedin.com/in/muhammad-saif-ul-azeem-abbasi-1b71b417a',
        mail: 'saifabbasi.400@gmail.com',
      },
    },
    // Add more team members here
  ];
  const SocialLink = ({ href, icon, name }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <div className="bg-gray-500 text-white hover:bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition duration-300">
        <img src={icon} alt={name} className="w-4" />
      </div>
    </a>
    );
  return (
    <div className="bg-gray-100 min-h-screen p-8">
    <h1 className="text-4xl font-semibold text-center mb-8">Meet Our Team</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg">
          <div className="p-4 text-center">
            <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full" />
            <h2 className="text-lg font-bold mt-4">{member.name}</h2>
            <p className="text-gray-600 text-sm uppercase">{member.role}</p>
            <div className="mt-6 flex justify-center space-x-4">
              {member.socialLinks.facebook && (
                <SocialLink href={member.socialLinks.facebook} icon={fb} name="Facebook" />
              )}
              <SocialLink href={member.socialLinks.linkedin} icon={linkedin} name="LinkedIn" />
              <SocialLink href={`mailto:${member.socialLinks.mail}`} icon={Mail} name="Email" />
              {member.socialLinks.github && (
                <SocialLink href={member.socialLinks.github} icon={gith} name="GitHub" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default DeveloperPage
