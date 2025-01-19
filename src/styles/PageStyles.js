import styled from 'styled-components';

// Page container with animated gradient background
export const PageContainer = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    #1a1b2e 50%,
    #2d1b3d 100%
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.large};
  min-height: calc(100vh - 180px);

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Enhanced card component with glass effect and hover animations
export const Card = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

    &:before {
      left: 100%;
    }
  }
`;

// Grid layout with responsive design
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

// Enhanced section title with animated underline
export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h2.size};
  font-weight: ${({ theme }) => theme.typography.h2.weight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60%;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

// Enhanced movie card with hover effects
export const MovieCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    flex-grow: 1;
    line-height: 1.6;
  }
`;

// Enhanced search bar with animated focus effect
export const SearchBar = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    padding-left: 3rem;
    background: rgba(255, 255, 255, 0.07);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.large};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;

    &:focus {
      background: rgba(255, 255, 255, 0.1);
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}20;
    }
  }

  svg {
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.3s ease;
  }

  &:focus-within svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Enhanced badge with hover effect
export const Badge = styled.span`
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.small.size};
  margin-right: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: inline-block;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}25;
    transform: translateY(-1px);
  }
`;

// Enhanced button with animated gradient
export const StyledButton = styled.button`
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  background-size: 200% auto;
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  position: relative;
  overflow: hidden;

  &:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 99, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(45deg);
    transition: 0.5s;
    opacity: 0;
  }

  &:hover:after {
    opacity: 1;
  }
`;

// Form container with glass effect
export const FormContainer = styled.form`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
  margin: 0 auto;
`;

// Input field with modern styling
export const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
`; 