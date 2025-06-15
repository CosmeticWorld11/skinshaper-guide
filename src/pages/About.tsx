
import React from 'react';
import { Heart, Leaf, Users, Award, Target, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: 'Sustainability First',
      description: 'We believe in beauty that doesn\'t compromise our planet. Every recommendation prioritizes eco-friendly, cruelty-free products.'
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: 'Personalized Care',
      description: 'Your skin is unique, and so should be your routine. Our AI learns your preferences to provide truly personalized recommendations.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Community Driven',
      description: 'Built by beauty enthusiasts, for beauty enthusiasts. We listen to our community and continuously improve based on your feedback.'
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: 'Quality Assured',
      description: 'Every product in our database is carefully curated and verified for quality, safety, and effectiveness.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Users' },
    { number: '1000+', label: 'Curated Products' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'AI Support' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Dermatologist',
      bio: 'Board-certified dermatologist with 15+ years experience in sustainable skincare research.',
      image: '/placeholder.svg'
    },
    {
      name: 'Maya Patel',
      role: 'AI Beauty Specialist',
      bio: 'Former beauty editor turned tech entrepreneur, passionate about personalized beauty solutions.',
      image: '/placeholder.svg'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Sustainability Director',
      bio: 'Environmental scientist ensuring our recommendations align with eco-friendly practices.',
      image: '/placeholder.svg'
    },
    {
      name: 'Emma Thompson',
      role: 'Community Manager',
      bio: 'Beauty enthusiast who connects with our users to understand their evolving needs.',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <BackButton />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-primary">ECO Skin</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the beauty industry by combining AI-powered personalization 
            with sustainable practices to help you discover your perfect skincare routine.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 bg-gradient-to-r from-primary/5 to-green-50">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <Target className="h-12 w-12 text-primary mr-4" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
              To democratize personalized beauty by making expert skincare advice accessible to everyone, 
              while promoting sustainable practices that protect both your skin and our planet. We believe 
              that everyone deserves to feel confident in their own skin, without compromising on values 
              or environmental responsibility.
            </p>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                ECO Skin was born from a simple frustration: the overwhelming world of skincare products 
                and routines that often ignore individual needs and environmental impact. Our founder, 
                after years of trial and error with countless products, realized there had to be a better way.
              </p>
              <p className="text-lg leading-relaxed">
                In 2023, we assembled a team of dermatologists, AI specialists, and sustainability experts 
                to create a platform that would revolutionize how people discover and maintain their 
                skincare routines. We've since helped over 50,000 users find their perfect match while 
                promoting eco-conscious choices.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we continue to innovate and expand our platform, always keeping our core values 
                at the forefront: personalization, sustainability, and accessibility for all.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-green-100 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Impact */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8 md:p-12 text-center">
            <Globe className="h-16 w-16 mx-auto text-green-600 mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Global Impact</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">2.5M</div>
                <p className="text-muted-foreground">Plastic containers saved through eco-recommendations</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">15K</div>
                <p className="text-muted-foreground">Trees planted through our sustainability partnerships</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">95%</div>
                <p className="text-muted-foreground">Of recommended brands are cruelty-free certified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;
