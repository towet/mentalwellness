import { motion } from 'framer-motion';
import { Users, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const skills = [
  {
    title: 'Academic Writing',
    description: 'Expert in crafting well-researched academic papers and theses',
    image: 'https://startup.info/wp-content/uploads/2023/09/Sans-titre-22.jpg',
    stats: {
      projects: '120+',
      rating: '4.9',
      clients: '85+'
    },
    path: '/skills/academic-writing'
  },
  {
    title: 'Web Development',
    description: 'Full-stack developer specializing in modern web technologies',
    image: 'https://aoasoftwaresolution.com/wp-content/uploads/2023/06/wde.jpg',
    stats: {
      projects: '150+',
      rating: '4.8',
      clients: '95+'
    },
    path: '/skills/web-development'
  },
  {
    title: 'Content Writing',
    description: 'Creating engaging content that connects with audiences',
    image: 'https://webtagsltd.com.ng/images/services/content-writing.jpg',
    stats: {
      projects: '200+',
      rating: '4.9',
      clients: '110+'
    },
    path: '/skills/content-writing'
  },
  {
    title: 'Graphic Design',
    description: 'Designing stunning visuals that tell compelling stories',
    image: 'https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2023/02/Tuts_Roundup__Top_Graphic_Design_Courses.jpeg',
    stats: {
      projects: '180+',
      rating: '4.8',
      clients: '90+'
    },
    path: '/skills/graphic-design'
  }
];

export default function Skills() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Professional Skills
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Expertise in various domains with proven track record
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {skill.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {skill.stats.projects}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Projects
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {skill.stats.rating}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Rating
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {skill.stats.clients}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Clients
                    </div>
                  </div>
                </div>

                <Link
                  to={skill.path}
                  className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}