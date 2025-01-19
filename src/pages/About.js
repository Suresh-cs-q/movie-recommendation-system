import React from 'react';
import styled from 'styled-components';
import { FaFilm, FaHeart, FaStar, FaUsers } from 'react-icons/fa';
import { PageContainer, SectionTitle } from '../styles/PageStyles';

const AboutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xl};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  p {
    max-width: 800px;
    margin: ${({ theme }) => theme.spacing.lg} auto;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.lead.size};
    line-height: 1.6;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.h4.size};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const TeamSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  h2 {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.h3.size};
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const TeamMember = styled.div`
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    border: 3px solid ${({ theme }) => theme.colors.primary};
    padding: 3px;
    object-fit: cover;
    background-color: ${({ theme }) => theme.colors.surface};
  }

  h3 {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.h5.size};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.small.size};
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.small.size};
  }
`;

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: '/images/placeholder-avatar.png'
  },
  {
    name: 'Jane Smith',
    role: 'Lead Developer',
    image: '/images/placeholder-avatar.png'
  },
  {
    name: 'Mike Johnson',
    role: 'UX Designer',
    image: '/images/placeholder-avatar.png'
  },
  {
    name: 'Sarah Williams',
    role: 'Content Curator',
    image: '/images/placeholder-avatar.png'
  }
];

const About = () => {
  return (
    <PageContainer>
      <AboutWrapper>
        <Hero>
          <SectionTitle>About MovieMate</SectionTitle>
          <p>
            Welcome to MovieMate, your personal movie companion. We're passionate about
            connecting movie enthusiasts with their next favorite film through
            intelligent recommendations and a vibrant community of movie lovers.
          </p>
        </Hero>

        <FeaturesGrid>
          <FeatureCard>
            <FaFilm />
            <h3>Smart Recommendations</h3>
            <p>
              Our advanced algorithm analyzes your preferences to suggest movies
              you'll love, making movie discovery effortless and enjoyable.
            </p>
          </FeatureCard>
          <FeatureCard>
            <FaHeart />
            <h3>Curated Watchlists</h3>
            <p>
              Create and manage your personal watchlist, keeping track of movies
              you want to watch and organizing your favorites.
            </p>
          </FeatureCard>
          <FeatureCard>
            <FaStar />
            <h3>Rating System</h3>
            <p>
              Rate and review movies to help our system better understand your
              taste and improve future recommendations.
            </p>
          </FeatureCard>
          <FeatureCard>
            <FaUsers />
            <h3>Community Driven</h3>
            <p>
              Join a community of movie enthusiasts, share your thoughts, and
              discover new perspectives on films.
            </p>
          </FeatureCard>
        </FeaturesGrid>

        <TeamSection>
          <h2>Meet Our Team</h2>
          <TeamGrid>
            {teamMembers.map((member) => (
              <TeamMember key={member.name}>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection>

        <Stats>
          <StatItem>
            <h3>10K+</h3>
            <p>Active Users</p>
          </StatItem>
          <StatItem>
            <h3>50K+</h3>
            <p>Movies in Database</p>
          </StatItem>
          <StatItem>
            <h3>100K+</h3>
            <p>Recommendations Made</p>
          </StatItem>
          <StatItem>
            <h3>4.8</h3>
            <p>Average Rating</p>
          </StatItem>
        </Stats>
      </AboutWrapper>
    </PageContainer>
  );
};

export default About;
